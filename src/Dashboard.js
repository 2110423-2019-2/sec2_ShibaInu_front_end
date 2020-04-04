import React from "react";
import NavBar from "./NavBar";
import "./Dashboard.css";
import profileimage from "./material/profileimg2.png";
import {
  Table,
  Container,
  Row,
  Col,
  Breadcrumb,
  Card,
  Badge
} from "react-bootstrap";
import axios from "axios";
import LocalStorageService from "./LocalStorageService";
import firebase from "./firebase";
import { FaMaxcdn } from "react-icons/fa";
let utilities = require("./Utilities.json");
// import { DashboardBox, DashboardStatus, DashboardResponsible, DashboardContract, DashboardTimeline } from "./DashboardComponent";
//import { ReactComponent } from '*.svg';
// import logo from './material/Logo.png';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobID: this.props.params.jobId || 1,
      freelancerList: [],
      loadFreelancer: false,
      mode: LocalStorageService.getUserMode(),
      jobname: "Default job name",
      loadJob: false,
      jobStatus: null,
      timelineDetail: {
        openTime: null,
        acceptedTime: null,
        workingTime: null,
        doneTime: null
      },
      contract: null,
      loadContract: false
    };
  }

  loadAllData() {
    if (this.state.mode === "client") {
      return (
        this.state.loadFreelancer &&
        this.state.loadJob &&
        this.state.loadContract
      );
    }
    if (this.state.mode === "freelancer") {
      return this.state.loadJob && this.state.loadContract;
    }
  }

  componentWillMount() {
    if (this.state.mode === "client") {
      this.getInterestedFreelancer();
      this.getjobDetail();
      this.checkContract();
    }
    if (this.state.mode === "freelancer") {
      this.getjobDetail();
      this.checkContract();
    }
  }

  formatJPGtopath(res) {
    return btoa(
      new Uint8Array(res.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    );
  }

  to(promise) {
    return promise
      .then(data => {
        return {
          error: null,
          result: data
        };
      })
      .catch(err => {
        return {
          error: err
        };
      });
  }
  async getUserImage(userId) {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + LocalStorageService.getAccessToken();

    let { result, error } = await this.to(
      axios.get(utilities["backend-url"] + "/users/profilePicture/" + userId, {
        responseType: "arraybuffer"
      })
    );
    if (error !== null) {
      return { error: error, data: null };
    }
    return {
      error: null,
      data: "data:;base64," + this.formatJPGtopath(result)
    };
  }

  async checkContract() {
    await axios
      .get(utilities["backend-url"] + "/contracts/jobId/" + this.state.jobID)
      .then(res => {
        console.log(res.data);
        this.setState({
          contract: res.data,
          loadContract: true
        });
      })
      .catch(err => {
        console.log(err);
        if (err.response.status === 400) {
          this.setState({
            loadContract: true
          });
        }
      });
  }

  async getInterestedFreelancer() {
    let freelancerList = new Array();

    axios.defaults.headers.common["Authorization"] =
      "Bearer " + LocalStorageService.getAccessToken();
    await axios
      .get(utilities["backend-url"] + "/jobs/freelancers/" + this.state.jobID)
      .then(async res => {
        console.log(res);
        for (let i = 0; i < res.data.length; i++) {
          let item = res.data[i];
          let d = {
            userId: item.userId,
            fname: item.firstName,
            lname: item.lastName,
            score: item.sumReviewedScore,
            bid: 0,
            img: profileimage
          };
          let img = await this.getUserImage(item.userId);
          if (img.error === null) {
            d.img = img.data;
          }
          freelancerList.push(d);
        }
        console.log(freelancerList);
        return freelancerList;
      })
      .then(freelancerList => {
        this.setState({
          freelancerList: freelancerList,
          loadFreelancer: true
        });
      })
      .catch(error => {
        if (error.response.status === 401) {
          console.log("Unauthorization");
          alert("Please login first!");
          window.location.href = "/signin";
        } else {
          console.error(error);
        }
      });
  }

  async getjobDetail() {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + LocalStorageService.getAccessToken();
    await axios
      .get(utilities["backend-url"] + "/jobs/" + this.state.jobID)
      .then(res => {
        this.setState({
          jobname: res.data.name,
          jobStatus: res.data.status
        });

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
          console.log("Unauthorization");
          alert("Please login first!");
          window.location.href = "/signin";
        } else {
          console.error(error);
        }
      });
  }
  renderClient() {
    return (
      <div>
        <NavBar mode={this.state.mode} userDatas={""} />
        <Container>
          <h1 className="job-header">{this.state.jobname}</h1>
          <hr />
          <Row>
            <Col sm={4}>
              <div className="left-col">
                <Row>
                  <DashboardStatus status={this.state.jobStatus} />
                </Row>
                <Row>
                  <DashboardResponsible
                    topic={"Responsible"}
                    contract={this.state.contract}
                    jobId={this.state.jobID}
                  />
                </Row>
                <Row>
                  <DashboardContract
                    jobId={this.state.jobID}
                    contract={this.state.contract}
                  />
                </Row>
              </div>
            </Col>
            <Col sm={8}>
              <Row>
                <FreelancerBox
                  freelancerList={this.state.freelancerList}
                  jobId={this.state.jobID}
                  contract={this.state.contract}
                />
              </Row>
              <Row>
                <DashboardTimeline
                  timelineDetail={this.state.timelineDetail}
                  status={this.state.jobStatus}
                />
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
  renderFreelancer() {
    return (
      <div>
        <NavBar mode={this.state.mode} userDatas={""} />
        <Container>
          <h1 className="job-header">{this.state.jobname}</h1>
          <hr />
          <Row>
            <Col sm={4}>
              <div className="left-col">
                <Row>
                  <DashboardStatus status={this.state.jobStatus} />
                </Row>
                <Row>
                  <DashboardResponsible
                    topic={"Client"}
                    contract={this.state.contract}
                    jobId={this.state.jobID}
                  />
                </Row>
                <Row>
                  <DashboardContract
                    jobId={this.state.jobID}
                    contract={this.state.contract}
                  />
                </Row>
              </div>
            </Col>
            <Col sm={8}>
              <Row>
                <DashboardFeed contract={this.state.contract} />
              </Row>
              <Row>
                <DashboardTimeline
                  timelineDetail={this.state.timelineDetail}
                  status={this.state.jobStatus}
                />
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
  render() {
    if (this.loadAllData()) {
      if (this.state.mode === "client") {
        return this.renderClient();
      } else if (this.state.mode === "freelancer") {
        return this.renderFreelancer();
      } else {
        return "";
      }
    } else {
      return "";
    }
  }
}

class FreelancerBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      freelancerList: this.props.freelancerList,
      contract: this.props.contract,
      load: false
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

  checkChatRoom = (friendId, friendName) => {
    const userId = LocalStorageService.getUserID();
    var ids = [parseInt(friendId),parseInt(userId)].sort((a, b)=>{return a-b});
    var chatroom = ids[0]+"-"+ids[1];
    var docRef = firebase.firestore().collection("message").doc("chatroom").collection(userId.toString()).doc(chatroom);
    docRef.get().then( doc => {
      LocalStorageService.setChatroom(chatroom);
      LocalStorageService.setChatName(friendName);
      if (!doc.exists) {
        this.addChatRoom(userId,friendId,chatroom,friendName);
      } else {
        window.location.href = '/chat';
      }
    }).catch(error => {
      console.log("Error getting document:", error);
    });
  }

  addChatRoom = (userId, friendId, chatroom, friendName) => {
    const time = firebase.firestore.FieldValue.serverTimestamp();
    firebase.firestore().collection('message').doc('chatroom').collection(userId.toString()).doc(chatroom).set({
      name: friendName,
      lasttime: time,
    }).catch(error => {
      alert("Error adding chatroom 1:", error);
    });
    var name;
    axios
      .get(utilities["backend-url"] + "/users/" + userId)
      .then(res => {
        name = res.data.firstName;
        firebase.firestore().collection('message').doc('chatroom').collection(friendId.toString()).doc(chatroom).set({
          name: name,
          lasttime: time,
        }).then(()=>{
          window.location.href = '/chat';
        }).catch(error => {
          alert("Error adding chatroom 2:", error);
        });
    });
  };

  handleSelect = e => {
    window.location.href =
      "/contract/" + this.props.jobId + "/" + e.target.name;
    console.log(window.location.href);
  };
  async handleCancel() {
    axios
      .delete(
        utilities["backend-url"] +
          "/contracts/deleteByJobId/" +
          this.props.jobId
      )
      .then(res => {
        console.log(res.data);
        this.setState({
          selected: null,
          load: false
        });
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
        if (err.response.status === 400) {
          this.setState({
            load: true
          });
        }
      });
  }
  showInterestedList() {
    return this.state.freelancerList.map(item => (
      <tr key={item.userId}>
        <td>
          <div
            className="profile-img"
            onClick={() => this.checkChatRoom(item.userId, item.fname)}
          >
            <img src={item.img} alt="youngstar logo" />
          </div>
        </td>
        <td>{item.fname + " " + item.lname}</td>
        <td>{item.score}</td>
        <td>{item.bid}</td>
        <td>
          {this.state.contract !== null &&
          this.state.contract.freelancerId == item.userId ? (
            <button
              type="button"
              className="btn btn-danger"
              disabled={
                this.state.contract !== null &&
                this.state.contract.freelancerId != item.userId
              }
              name={item.userId}
              onClick={this.handleCancel.bind(this)}
            >
              cancel
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              disabled={
                this.state.contract !== null &&
                this.state.contract.freelancerId != item.userId
              }
              name={item.userId}
              onClick={this.handleSelect.bind(this)}
            >
              select
            </button>
          )}
        </td>
      </tr>
    ));
  }

  render() {
    return (
      <DashboardBox
        hidden={
          this.state.contract !== null &&
          this.state.contract.status === "accepted"
        }
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
                      <th>Bid</th>
                      <th>select</th>
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
      message: "Due in 3 months"
    };
  }

  getStatusComponent() {
    return (
      <div className="component-status">
        <h2>
          <Badge pill variant={this.getBadgeStyle()}>
            {this.state.status}
          </Badge>
        </h2>
        {this.state.message}
      </div>
    );
  }

  getBadgeStyle() {
    switch (this.state.status) {
      case "open":
        return "success";
      case "accepted":
        return "primary";
      case "working":
        return "warning";
      case "done":
        return "Danger";
      default:
        return "primary";
    }
  }

  render() {
    return (
      <DashboardBox
        topic="Status"
        size="small-box"
        component={this.getStatusComponent()}
      />
    );
  }
}

class DashboardResponsible extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // user: null,
      contract: this.props.contract,
      userId: null,
      fname: "",
      lname: "",
      img: profileimage,
      mode: LocalStorageService.getUserMode(),
      load: false,
      loadImg: false,
      jobId: this.props.jobId
    };
  }

  async componentDidMount() {
    if (this.state.mode === "client" && this.props.contract !== null) {
      await this.setState({
        contract: this.props.contract,
        userId: this.props.contract.freelancerId
      });
      await this.getUserDetail();
    }
    if (this.state.mode === "freelancer") {
      this.setState({ jobId: this.props.jobId });
      await this.getUserFromJob();
    }
    await this.getUserImage();
  }

  formatJPGtopath = (res) => {
    return btoa(
      new Uint8Array(res.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    );
  }

  to(promise) {
    return promise
      .then(data => {
        return {
          error: null,
          result: data
        };
      })
      .catch(err => {
        return {
          error: err
        };
      });
  }
  async getUserImage() {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + LocalStorageService.getAccessToken();
    await axios
      .get(
        utilities["backend-url"] + "/users/profilePicture/" + this.state.userId,
        { responseType: "arraybuffer" }
      )
      .then(res => {
        let data = "data:;base64," + this.formatJPGtopath(res);
        this.setState({
          img: data,
          loadImg: true
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          loadImg: true
        });
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props.contract !== prevProps.contract) {
      this.setState({ contract: this.props.contract });
    }
  }

  checkChatRoom = (friendId,friendName) => {
    const userId = LocalStorageService.getUserID();
    var ids = [parseInt(friendId),parseInt(userId)].sort((a, b)=>{return a-b});
    var chatroom = ids[0]+"-"+ids[1];
    var docRef = firebase.firestore().collection("message").doc("chatroom").collection(userId.toString()).doc(chatroom);
    docRef.get().then( doc => {
      LocalStorageService.setChatroom(chatroom);
      LocalStorageService.setChatName(friendName);
      if (!doc.exists) {
        this.addChatRoom(userId,friendId,chatroom,friendName);
      } else {
        window.location.href = '/chat';
      }
    }).catch(error => {
      console.log("Error getting document:", error);
    });
  }

  addChatRoom = (userId, friendId, chatroom, friendName) => {
    const time = firebase.firestore.FieldValue.serverTimestamp();
    firebase.firestore().collection('message').doc('chatroom').collection(userId.toString()).doc(chatroom).set({
      name: friendName,
      lasttime: time,
    }).catch(error => {
      alert("Error adding chatroom 1:", error);
    });
    var name;
    axios
      .get(utilities["backend-url"] + "/users/" + userId)
      .then(res => {
        name = res.data.firstName;
        firebase.firestore().collection('message').doc('chatroom').collection(friendId.toString()).doc(chatroom).set({
          name: name,
          lasttime: time,
        }).then(()=>{
          window.location.href = '/chat';
        }).catch(error => {
          alert("Error adding chatroom 2:", error);
        });
    });
  };
  async getUserFromJob() {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + LocalStorageService.getAccessToken();
    await axios
      .get(utilities["backend-url"] + "/jobs/" + this.state.jobId)
      .then(res => {
        this.setState({
          userId: res.data.client.userId,
          fname: res.data.client.firstName,
          lname: res.data.client.lastName,
          load: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  async getUserFromJob(){
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + LocalStorageService.getAccessToken();
        await axios
        .get(utilities["backend-url"] + "/jobs/" + this.state.jobId)
        .then(res=>{
            this.setState({
              userId: res.data.client.userId,
              fname : res.data.client.firstName,
              lname: res.data.client.lastName,
              load:true
            })
        })
        .catch(err=>{
            console.log(err)
        })
  }
  async getUserDetail(){
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + LocalStorageService.getAccessToken();
        await axios
        .get(utilities["backend-url"] + "/users/" + this.state.userId)
        .then(res=>{
            console.log(res.data)
            this.setState({
              fname : res.data.firstName,
              lname: res.data.lastName,
              load:true
            })
        })
        .catch(err=>{
          
            console.log(err)
        })
  }

  getResponsibleComponent() {
    return (
      <Table className="component-responsible" responsive="sm" hover>
        <tbody>
          <tr key={this.state.userId}>
            <td>
              <div className="profile-img">
                <img src={this.state.img} alt="user-img" />
              </div>
            </td>
            <td>{this.state.fname + " " + this.state.lname}</td>
            <td>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  this.checkChatRoom(this.state.userId, this.state.fname);
                }}
              >
                Chat
              </button>
            </td>
          </tr>
        </tbody>
      </Table>
    );
  }
  hide() {
    if (this.state.mode === "client" && this.state.contract === null) {
      return true;
    } else if (
      this.state.mode === "client" &&
      this.state.contract !== null &&
      this.state.contract.status !== "accepted"
    ) {
      return true;
    } else {
      return false;
    }
  }
  render() {
    if (!this.state.load || !this.state.loadImg) {
      return "";
    }
    return (
      <DashboardBox
        topic={this.props.topic || "responsible"}
        size="small-box"
        component={this.getResponsibleComponent()}
        hidden={this.hide()}
      />
    );
  }
}

class DashboardContract extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contract: this.props.contract
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.contract !== prevProps.contract) {
      this.setState({ contract: this.props.contract });
    }
  }
  gotoContract() {
    window.location.href =
      "/contract/" +
      this.state.contract.jobId +
      "/" +
      this.state.contract.freelancerId;
  }
  getContractComponent() {
    return (
      <button
        type="button"
        className="btn btn-warning"
        onClick={this.gotoContract.bind(this)}
      >
        SHOW CONTRACT
      </button>
    );
  }
  render() {
    return (
      <DashboardBox
        topic="Contract"
        size="small-box"
        component={this.getContractComponent()}
        hidden={this.state.contract === null}
      />
    );
  }
}

class DashboardTimeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          status: "open",
          datetime: this.setDateFormat(this.props.timelineDetail.openTime)
        },
        {
          status: "accepted",
          datetime: this.setDateFormat(this.props.timelineDetail.acceptedTime)
        },
        {
          status: "working",
          datetime: this.setDateFormat(this.props.timelineDetail.workingTime)
        },
        {
          status: "done",
          datetime: this.setDateFormat(this.props.timelineDetail.doneTime)
        }
      ],
      currentStatus: this.props.status || "default"
    };
  }

  setDateFormat(date) {
    return date ? new Date(date).toLocaleString() : "";
  }

  getBadgeStyle(status, datetime) {
    if (status === this.state.currentStatus) {
      return "success";
    } else if (datetime !== "") {
      return "success";
    } else {
      return "secondary";
    }
  }

  getTimelineBody() {
    return this.state.data.map(item => (
      <tr key={"timeline-" + item.status}>
        <td>
          <h2>
            <Badge
              pill
              variant={this.getBadgeStyle(item.status, item.datetime)}
            >
              {item.status}
            </Badge>
          </h2>
        </td>
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
        <tbody>{this.getTimelineBody()}</tbody>
      </Table>
    );
  }

  render() {
    return (
      <DashboardBox
        topic="Timeline"
        size="large-box"
        component={this.getTimelineComponent()}
      />
    );
  }
}

class DashboardFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contract: this.props.contract
    };
  }
  gotoContract() {
    window.location.href =
      "/contract/" +
      this.state.contract.jobId +
      "/" +
      this.state.contract.freelancerId;
  }
  componentDidMount() {
    this.setState({ contract: this.props.contract });
  }
  getDisplayComponent() {
    if (this.state.contract !== null) {
      return (
        <div>
          <h3>Comming soon</h3>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.gotoContract.bind(this)}
          >
            Contract
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <h3>waiting for offerings</h3>
        </div>
      );
    }
  }
  render() {
    return <DashboardBox topic="Feed" component={this.getDisplayComponent()} />;
  }
}

// DEFAULT COMPONENT -----------------------------------------------------------------------------

class DashboardBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: this.props.topic || "NO TOPIC",
      component: this.props.component || "NO DATA",
      size: this.props.size || "small-box"
    };
  }

  render() {
    return (
      <Card
        className={"dashboard-box " + this.state.size}
        hidden={this.props.hidden}
      >
        <Card.Header as="h5" className="box-topic">
          {this.state.topic}
        </Card.Header>
        <Card.Body className="box-body">{this.state.component}</Card.Body>
      </Card>
    );
  }
}

export default Dashboard;
