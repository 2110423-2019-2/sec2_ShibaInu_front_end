import React from "react";
import NavBar from "./NavBar";
import "./DashboardClient.css";
import profileimage from "./material/profileimg2.png";
import { Table, Container, Row, Col, Breadcrumb, Card, Badge } from "react-bootstrap";
import axios from 'axios';
import LocalStorageService from "./LocalStorageService";
import firebase from './firebase';
import { FaMaxcdn } from "react-icons/fa";
let utilities = require('./Utilities.json');
// import { DashboardBox, DashboardStatus, DashboardResponsible, DashboardContract, DashboardTimeline } from "./DashboardComponent";
//import { ReactComponent } from '*.svg';
// import logo from './material/Logo.png';

class DashboardClient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobID: this.props.params.jobId || 1,
      freelancerList: [],
      loadFreelancer: false,
      mode: "client",
      jobname: "Default job name",
      loadJob: false,
      jobStatus: null,
      timelineDetail: {
        openTime: null,
        acceptedTime: null,
        workingTime: null,
        doneTime: null
      }
    };

  }

  loadAllData() {
    return this.state.loadFreelancer && this.state.loadJob;
  }

  componentWillMount() {
    this.getInterestedFreelancer();
    this.getjobDetail();
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

  async getjobDetail() {

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + LocalStorageService.getAccessToken();
    await axios
      .get(utilities["backend-url"] + "/jobs/" + this.state.jobID)
      .then(res => {
        this.setState({
          jobname: res.data.name,
          jobStatus: res.data.status,
        })

        let timelineDetail = {
          openTime: res.data.createdTime,
          acceptedTime: res.data.acceptedTime,
          workingTime: res.data.startWorkingTime,
          doneTime: res.data.doneTime
        };

        this.setState({
          timelineDetail: timelineDetail
        });

        this.setState({
          loadJob: true
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
    return this.loadAllData() ? (
      <div>
        <NavBar mode={this.state.mode} userDatas={""} />
        <Container>
          <h1 className="job-header">{this.state.jobname}</h1>
          <hr />
          <Row>
            <Col sm={4} >
              <div className="left-col">
                <Row><DashboardStatus status={this.state.jobStatus} /></Row>
                <Row><DashboardResponsible /></Row>
                <Row><DashboardContract /></Row>
              </div>
            </Col>
            <Col sm={8}>
              <Row><FreelancerBox freelancerList={this.state.freelancerList} /></Row>
              <Row><DashboardTimeline timelineDetail={this.state.timelineDetail} status={this.state.jobStatus} /></Row>
            </Col>

          </Row>
        </Container>
      </div>
    ) : '';
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

  checkChatRoom = (friendId,friendName) => {
    const userId = LocalStorageService.getUserID();
    var ids = [friendId,userId].sort();
    var chatroom = ids[0]+"-"+ids[1];
    var docRef = firebase.firestore().collection("message").doc("chatroom").collection(userId).doc(chatroom);
    docRef.get().then(function(doc) {
      if (doc.exists) {
        LocalStorageService.setChatroom(chatroom);
        window.location.href = '/chat';
      } else {
        // doc.data() will be undefined in this case
        this.addChatRoom(userId,friendId,chatroom,friendName);
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });
  }

  addChatRoom = (userId,friendId,chatroom,friendName) => {
    const time = firebase.firestore.FieldValue.serverTimestamp();
    firebase.firestore().collection('message').doc('chatroom').collection(userId).doc(chatroom).set({
      name: friendName,
      lasttime: time,
    });
    var name;
    axios
      .get(utilities["backend-url"] + "/users/" + userId)
      .then(res => {
        name = res.data.firstName;
        firebase.firestore().collection('message').doc('chatroom').collection(friendId).doc(chatroom).set({
          name: name,
          lasttime: time,
        });
    });
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
          <button type="button" className="btn btn-primary" onClick={()=>this.checkChatRoom(item.userId,item.fname)}>
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
      status: this.props.status || null,
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
      case 'open': return 'success';
      case 'accepted': return 'primary';
      case 'working': return 'warning';
      case 'done': return 'Danger';
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
        { status: 'open', datetime: this.setDateFormat(this.props.timelineDetail.openTime) },
        { status: 'accepted', datetime: this.setDateFormat(this.props.timelineDetail.acceptedTime) },
        { status: 'working', datetime: this.setDateFormat(this.props.timelineDetail.workingTime) },
        { status: 'done', datetime: this.setDateFormat(this.props.timelineDetail.doneTime) },
      ],
      currentStatus: this.props.status || 'default'
    };
  }

  setDateFormat(date) {
    return date ? (new Date(date)).toLocaleString() : '';
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