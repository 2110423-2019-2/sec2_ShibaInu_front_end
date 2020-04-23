import React from "react";
import './AdminHome.css';
import { Container, Modal, Spinner, Card, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";

import LocalStorageService from "./LocalStorageService";
import LoadingSpinner from "./utilities/LoadingSpinner";
var utilities = require('./Utilities.json');

class AdminHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDataLoad: false,
      userDatas: {},
      isUserDataLoad: false,
      showModal: false,
      modalData: { userId: "", mode: "" }
    };
  }

  fetchDatas = () => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + LocalStorageService.getAccessToken();
    axios.get(utilities['backend-url'] + "/users").then(res => {
      const userDatas = res.data;
      this.setState({ userDatas: userDatas, isUserDataLoad: true });
    }).catch((error) => {
      console.error(error);
    });
  };

  componentDidMount = () => {
    this.fetchDatas();
  };

  render() {
    if (!this.state.isUserDataLoad) {
      return null;
    }
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
                <AdminCard mode="verification" />
              </Col>
              <Col>
                <AdminCard mode="report" />
              </Col>
              <Col>
                <AdminCard mode="ban" />
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
      isLoading: false,
      topicName: {
        verification: 'User Verification',
        report: 'Report',
        ban: 'Banned User'
      },
      goTo: {
        verification: 'User Verification',
        report: 'Report List',
        ban: 'Banned User'

      },
      link: {
        verification: '/admin/verify',
        report: '/admin/report',
        ban: '/'
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
        this.fetchVerification();
        break;
      case 'report':
        this.fetchReport();
        break;
      case 'ban':
        break;
      default:
        this.setState({ isLoading: false });
        break;
    }
  }

  fetchVerification = () => {

    axios.get(utilities['backend-url'] + "/users").then((res) => {

      if (res.status === 200) {
        const userDatas = res.data;
        const amount = userDatas.filter((user) => {
          return !user.isVerified;
        }).length;

        this.setState({
          amount: amount
        });
      }

    }).catch((error) => {
      console.error(error);
    }).finally(() => {
      this.setState({ isLoading: false });
    });
  }

  fetchReport = () => {
    axios.get(utilities['backend-url'] + "/reports").then((res) => {

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
      console.error(error);
    }).finally(() => {
      this.setState({ isLoading: false });
    });
  }


  render() {
    return (
      <Card
        className={"text-center dashboard-box"}
        hidden={this.props.hidden}
      >
        <Card.Header className="box-topic"><h5>{this.state.topicName[this.state.mode]}</h5></Card.Header>
        <Card.Body>
          {this.state.isLoading ? (<LoadingSpinner customClass="false" />) : (
            <>
              <h1>{this.state.amount}</h1>
              <h5>{this.state.mode === 'report' ? 'reports left' : 'users left'}</h5>
            </>
          )}
        </Card.Body>
        <Card.Footer>
          <Button variant="primary" href={this.state.link[this.state.mode]} >{this.state.goTo[this.state.mode]}</Button>
        </Card.Footer>
      </Card>
    );
  }
}

export default AdminHome;
