import React from "react";
import NavBar from "./NavBar";
import "./DashboardClient.css";
import profileimage from "./material/profileimg2.png";
import { Table, Container, Row, Col, Breadcrumb, Card, Badge } from "react-bootstrap";
import axios from 'axios';
import LocalStorageService from "./LocalStorageService";
let utilities = require('./Utilities.json');
// import { DashboardBox, DashboardStatus, DashboardResponsible, DashboardContract, DashboardTimeline } from "./DashboardComponent";
//import { ReactComponent } from '*.svg';
// import logo from './material/Logo.png';

class DashboardClient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobID: 1,
      freelancerList: [],
      loadFreelancer: false,
      mode: "client",
      jobname: "Build a mobile application"
    };

  }

  componentWillMount() {
    this.getInterestedFreelancer();
  }

  async getInterestedFreelancer() {
    let freelancerList = new Array();

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + LocalStorageService.getAccessToken();
    await axios
      .get(utilities["backend-url"] + "/jobs/freelancers/" + this.state.jobID)
      .then(res => {
        for (let i = 0; i < res.data.length; i++) {
          let item = res.data[i];
          freelancerList.push({ userId: item.userId, fname: item.firstName, lname: item.lastName, score: 0, img: profileimage });
        }

        this.setState({
          freelancerList: freelancerList,
          loadFreelancer: true
        });
      })
      .catch(error => {
        if (error.response.status === 401) {
          console.log('Unauthorization');
          alert('Please login first!')
          window.location.href = '/signin';

        } else {
          console.error(error);
        }
      });
  }

  render() {
    return (
      <div>
        <NavBar mode={this.state.mode} userDatas={""} />
        <Container>
          <Breadcrumb>
            <Breadcrumb.Item href={"/" + this.state.mode + "/job"}>My job</Breadcrumb.Item>
            <Breadcrumb.Item active>{this.state.jobname}</Breadcrumb.Item>
          </Breadcrumb>
          <h1 className="job-header">{this.state.jobname}</h1>
          <hr />
          <Row>
            <Col sm={4} >
              <div className="left-col">
                <Row><DashboardStatus /></Row>
                <Row><DashboardResponsible /></Row>
                <Row><DashboardContract /></Row>
              </div>
            </Col>
            <Col sm={8}>
              <Row>{this.state.loadFreelancer ? <FreelancerBox freelancerList={this.state.freelancerList} /> : ''}</Row>
              <Row><DashboardTimeline /></Row>
            </Col>

          </Row>
        </Container>
      </div>
    );
  }
}

class FreelancerBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      freelancerList:
        this.props.freelancerList,
      // oldFreelancerList:
      //   [
      //     { userId: "1", fname: "Irma", lname: "Williamson", score: 10, img: profileimage },
      //     { userId: "2", fname: "Irma", lname: "Williamson", score: 10, img: profileimage },
      //     { userId: "3", fname: "Irma", lname: "Williamson", score: 10, img: profileimage },
      //     { userId: "4", fname: "Irma", lname: "Williamson", score: 10, img: profileimage },
      //     { userId: "5", fname: "Irma", lname: "Williamson", score: 10, img: profileimage },
      //     { userId: "6", fname: "Irma", lname: "Williamson", score: 10, img: profileimage },
      //     { userId: "7", fname: "Irma", lname: "Williamson", score: 10, img: profileimage },
      //   ],
    };
    this.showInterestedList = this.showInterestedList.bind(this);
  }

  showInterestedList() {
    return this.state.freelancerList.map(item => (
      <tr key={item.userId}>
        <td>
          <div className="profile-img"><img src={item.img} alt="youngstar logo" /></div>
        </td>
        <td>{item.fname + " " + item.lname}</td>
        <td>{item.score}</td>
        <td>
          <button type="button" className="btn btn-primary" onClick={""}>
            Chat
          </button>
        </td>
      </tr>
    ));
  }

  render() {
    return (
      <DashboardBox
        hidden={this.props.hidden}
        topic="Interested Freelancer"
        size="large-box"
        component={
          this.state.freelancerList.length === 0 ? (
            "No one interested yet"
          ) : (
              <>
                <div className="table-container-f">
                  <Table className="table-freelancer" responsive="sm" hover>
                    <thead>
                      <tr>
                        <th></th>
                        <th>Name</th>
                        <th>score</th>
                        <th>chat</th>
                      </tr>
                    </thead>
                    <tbody>{this.showInterestedList()}</tbody>
                  </Table>
                </div>
                <div className="footer">
                  <button type="button" className="btn btn-success" onClick={""}>
                    invite
              </button>
                </div>
              </>
            )
        }
      />
    );
  }
}

class DashboardStatus extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      status: 'Accepted',
      message: 'Due in 3 months'
    };
  }

  getStatusComponent() {

    return (
      <div className='component-status'>
        <h2><Badge pill variant={this.getBadgeStyle()}>{this.state.status}</Badge></h2>
        {this.state.message}
      </div>
    );
  }

  getBadgeStyle() {
    switch (this.state.status) {
      case 'Open': return 'success';
      case 'Accepted': return 'primary';
      case 'Working': return 'warning';
      case 'Done': return 'Danger';
      default: return 'primary';
    }
  }

  render() {

    return (
      <DashboardBox topic='Status' size='small-box' component={this.getStatusComponent()} />
    );
  }

}

class DashboardResponsible extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // user: null,
      user: { userid: 1, fname: 'Melvin', lname: 'Macaranas', img: profileimage },
    };
  }

  getResponsibleComponent() {
    return (
      <Table className="component-responsible" responsive="sm" hover>
        <tbody>
          <tr key={this.state.user.userid}>
            <td>
              <div className='profile-img'><img src={this.state.user.img} alt='user-img' /></div>
            </td>
            <td>{this.state.user.fname + ' ' + this.state.user.lname}</td>
            <td>
              <button type="button" className="btn btn-secondary" onClick={""}>
                Chat
                      </button>
            </td>
          </tr>
        </tbody>
      </Table>
    )
  }

  render() {

    return this.state.user ? (

      <DashboardBox topic='Responsible' size='small-box' component={this.getResponsibleComponent()} />
    ) : null;
  }

}

class DashboardContract extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getContractComponent() {
    return (
      <button type="button" className="btn btn-warning" onClick={""}>
        SHOW CONTRACT
      </button>
    )
  }

  render() {

    return (
      <DashboardBox topic='Contract' size='small-box' component={this.getContractComponent()} />
    );
  }

}

class DashboardTimeline extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        { status: 'Open', datetime: '8 Jun 2019' },
        { status: 'Accepted', datetime: '' },
        { status: 'Working', datetime: '' },
        { status: 'Done', datetime: '' },
      ],
      currentStatus: 'Accepted'
    };
  }

  getBadgeStyle(status, datetime) {
    if (status === this.state.currentStatus) {
      return 'success'
    } else if (datetime !== '') {
      return 'success'
    } else {
      return 'secondary'
    }
  }

  getTimelineBody() {
    return this.state.data.map(item => (
      <tr key={'timeline-' + item.status}>
        <td><h2><Badge pill variant={this.getBadgeStyle(item.status, item.datetime)}>{item.status}</Badge></h2></td>
        <td>{item.datetime}</td>
      </tr>
    ));
  }

  getTimelineComponent() {
    return (
      <Table className="component-timeline" responsive="sm" hover>
        <thead>
          <tr>
            <th>Status</th>
            <th>Date & Time</th>
          </tr>
        </thead>
        <tbody>
          {this.getTimelineBody()}
        </tbody>
      </Table>


    );
  }

  render() {

    return (
      <DashboardBox topic='Timeline' size='large-box' component={this.getTimelineComponent()} />
    );
  }

}


// DEFAULT COMPONENT -----------------------------------------------------------------------------

class DashboardBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      topic: this.props.topic || 'NO TOPIC',
      component: this.props.component || 'NO DATA',
      size: this.props.size || 'small-box',
    };
  }

  render() {

    return (
      <Card className={'dashboard-box ' + this.state.size} hidden={this.props.hidden}>
        <Card.Header as="h5" className='box-topic'>
          {this.state.topic}
        </Card.Header>
        <Card.Body className='box-body'>
          {this.state.component}
        </Card.Body>
      </Card>
    );
  }
}


export default DashboardClient;
