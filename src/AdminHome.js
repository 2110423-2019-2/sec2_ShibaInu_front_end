import React from "react";
import './AdminHome.css';
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";

import LocalStorageService from "./LocalStorageService";
import LoadingSpinner from "./utilities/LoadingSpinner";

class AdminHome extends React.Component {

  render() {

    return (
      <div className="main-background">
        <Container id="adminHome-box">
          <Container className="bg-white shadow">
            <Row>
              <Col >
                <h2 id="recentjob-topic">Admin Home</h2>
              </Col >
            </Row>
            <Row>
              <Col>
                <AdminCard mode='total-user' />
              </Col>
              <Col>
                <AdminCard mode='total-admin' />
              </Col>
            </Row>
            <Row>
              <Col>
                <AdminCard mode="verification" />
              </Col>
              <Col>
                <AdminCard mode="report" cb={this.callbackBox} />
              </Col>
              <Col>
                <AdminCard mode="ban" />
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col md={8}>
                <AdminCard mode='job' />
              </Col>
            </Row>
          </Container>
        </Container>
      </div>
    );
  }
}

class AdminCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mode: this.props.mode || null,
      amount: "ERROR",
      isLoading: true,
      topicName: {
        verification: 'User Verification',
        report: 'Report',
        ban: 'Banned User',
        'total-user': 'Total user',
        'total-admin': 'Total admin',
        job: 'Jobs'
      },
      description: {
        verification: 'users waiting for verified',
        report: 'reports left',
        ban: 'users being banned',
        'total-user': 'users in the system',
        'total-admin': 'admins in the system'
      },
      goTo: {
        verification: 'User Verification',
        report: 'Report List',
        ban: 'Banned User'

      },
      link: {
        verification: '/admin/verify',
        report: '/admin/report',
        ban: '/admin/ban'
      }
    };
  }

  componentDidMount() {

    this.fetchDatas();

  }

  fetchDatas = () => {

    this.setState({ isLoading: true });

    axios.defaults.headers.common["Authorization"] = "Bearer " + LocalStorageService.getAccessToken();

    switch (this.state.mode) {
      case 'verification':
        this.fetchUser();
        break;
      case 'report':
        this.fetchReport();
        break;
      case 'ban':
        this.fetchUser();
        break;
      case 'total-user':
        this.fetchUser();
        break;
      case 'total-admin':
        this.fetchUser();
        break;
      case 'job':
        this.fetchJob();
        break;
      default:
        this.setState({ isLoading: false });
        break;
    }
  }

  fetchUser = () => {

    axios.get(process.env.REACT_APP_BACKEND_URL + "/users").then((res) => {

      if (res.status === 200) {

        let amount = "ERROR";

        switch (this.state.mode) {
          case 'verification':
            amount = res.data.filter((user) => {
              return !user.isVerified;
            }).length;
            break;
          case 'ban':
            amount = res.data.filter((user) => {
              return user.isBanned;
            }).length;
            break;
          case 'total-user':
            amount = res.data.filter((user) => {
              return !user.isAdmin;
            }).length;
            break;
          case 'total-admin':
            amount = res.data.filter((user) => {
              return user.isAdmin;
            }).length;
            break;
          default:
            amount = null;
        }

        this.setState({
          amount: amount
        });
      }

    }).catch((error) => {
      //console.error(error);
    }).finally(() => {
      this.setState({ isLoading: false });
    });
  }

  fetchReport = () => {
    axios.get(process.env.REACT_APP_BACKEND_URL + "/reports").then((res) => {

      if (res.status === 200) {
        const reportDatas = res.data;
        const amount = reportDatas.filter((report) => {
          return report.status === 'open';
        }).length;

        this.setState({
          amount: amount
        });
      }

    }).catch((error) => {
      //console.error(error);

    }).finally(() => {
      this.setState({ isLoading: false });
    });
  }

  fetchJob = () => {
    axios.get(process.env.REACT_APP_BACKEND_URL + "/jobs").then((res) => {

      if (res.status === 200) {
        const jobDatas = res.data;
        const status = ['open', 'accepted', 'working', 'done', 'closed'];
        let amount = [0, 0, 0, 0, 0];

        for (let i = 0; i < status.length; i++) {
          amount[i] = jobDatas.filter((job) => {
            return job.status === status[i];
          }).length;
        }
        this.setState({
          amount: amount
        });
      }

    }).catch((error) => {
      //console.error(error);
    }).finally(() => {
      this.setState({ isLoading: false });
    });
  }


  JobChart = (amount) => {
    return (
      <Doughnut data={{
        labels: ["Open", "Accepted", "Working", "Done", "Closed"],
        datasets: [
          {
            data: amount,
            backgroundColor: ["#46BFBD", "#FDB45C", "#949FB1", "#4D5360", "#F7464A"],
            hoverBackgroundColor: [
              "#5AD3D1",
              "#FFC870",
              "#A8B3C5",
              "#616774",
              "#FF5A5E"
            ]
          }
        ]
      }} options={{ responsive: true }} />
    );
  }

  render() {
    return (
      <Card
        className={"text-center dashboard-box shadow"} style={{ margin: "0px", "margin-bottom": "20px" }}
      >
        <Card.Header className="box-topic"><h5>{this.state.topicName[this.state.mode]}</h5></Card.Header>
        <Card.Body>
          {this.state.isLoading ? (<LoadingSpinner customClass="false" />) :
            this.state.mode === 'job' ? this.JobChart(this.state.amount) : (
              <>
                <h1>{this.state.amount}</h1>
                <h5>{this.state.description[this.state.mode]}</h5>
              </>
            )}
        </Card.Body>
        {!this.state.goTo[this.state.mode] ? '' :
          (<Card.Footer>
            <Button variant="primary" href={this.state.link[this.state.mode]} >{this.state.goTo[this.state.mode]}</Button>
          </Card.Footer>)}
      </Card>
    );
  }
}

export default AdminHome;
