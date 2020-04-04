import React from "react";
import NavBar from "./NavBar";
import "./HomeClient.css";
import "./HomeFreelancer.css";
import { Container, Row, Col, Table } from "react-bootstrap";
import axios from "axios";
import LocalStorageService from './LocalStorageService';
import { FaBullhorn, FaInfoCircle } from "react-icons/fa";
var utilities = require('./Utilities.json');
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDatas: "",
      jobDatas: "",
      isUserDataLoad: false,
      isJobDataLoad: false,
      mode: "client",
      announce: "",
      userID: LocalStorageService.getUserID(),
      isAnnounceLoad: false,
    };
  }

  fetchDatas = () => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + LocalStorageService.getAccessToken();
    axios
      .get(utilities['backend-url'] + "/users/" + this.state.userID)
      .then(res => {
        const userDatas = res.data;
        this.setState({ userDatas: userDatas, isUserDataLoad: true });
        console.log(this.state.userDatas);
      });
    axios
      .get(utilities['backend-url'] + "/jobs/recent/" + this.state.userID)
      .then(res => {
        const jobDatas = res.data;
        this.setState({ jobDatas: jobDatas, isJobDataLoad: true });
        console.log(this.state.jobDatas);
      });
    axios
      .get(utilities['backend-url'] + "/announcement")
      .then(res => {
        const announce = res.data;
        this.setState({ announce: announce, isAnnounceLoad:true });
        console.log(this.state.announce);
      });
  };

  componentDidMount = () => {
    this.fetchDatas();
  };

  handleClickJobDetail(e) {
    window.location.href = '/dashboard/' + e.target.id;
  }

  render() {
    if (!this.state.isUserDataLoad || !this.state.isJobDataLoad) {
      return null;
    }
    var recentJob = this.state.jobDatas.map((job, index) => (
      <tr key={index} className="text-center">
        <td className="align-middle">
          {job.name}
        </td>
        <td className="align-middle">-</td>
        <td className="align-middle">{job.status}</td>
        <td className="align-middle">
          <button type="button" className="btn btn-secondary btn-block" id={job.jobId} onClick={this.handleClickJobDetail.bind(this)}>
            Detail
          </button>
        </td>
      </tr>
    ));
    var headTable = (
      <tr className="text-center">
        <td>
          <h5>Name</h5>
        </td>
        <td>
          <h5>Freelancer</h5>
        </td>
        <td>
          <h5>Status</h5>
        </td>
        <td></td>
      </tr>
    );
    
    var announce;
    if(this.state.isAnnounceLoad){
      announce = this.state.announce.map((announce)=>(
        <Row>
          <Col className="bg-light shadow pt-2">
            <h5 className="announce-title"><FaBullhorn /> {announce.title}</h5>
            <p className="announce-content"><FaInfoCircle /> {announce.content}</p>
          </Col>
        </Row>
      ));
    }

    return (
      <div className="main-background">
        <NavBar />
        <Container id="homeclient-box">
          <Row>
            <Col className="background-blue text-light pt-2 pb-2">
              <h3><FaBullhorn /> Announcement</h3>
            </Col>
          </Row>
          {announce}
          <Row className="mt-3">
            <Col className="bg-light shadow" xl={8} offset={1}>
              <h2 id="recentjob-topic">Recent Job Offering</h2>
              <Table responsive>
                <thead className="background-blue text-light">
                  {headTable}
                </thead>
                <tbody>{recentJob}</tbody>
              </Table>
            </Col>
            <Col className="shadow background-blue">
              <div id="balance-topic" className="text-light">
                <h5 className="mb-0">Welcome Back!</h5>
                <h2 className="mb-0">
                  {this.state.userDatas.firstName}{" "}
                  {this.state.userDatas.lastName}
                </h2>
              </div>
              <div className="rounded shadow bg-light">
                <Container fluid={true}>
                  <Row>
                    <Col xs={8}>
                      <h5>Account</h5>
                      <br />
                      <h5>Balance</h5>
                    </Col>
                    <Col>
                      <h5>{this.state.userDatas.money} USD</h5>
                    </Col>
                  </Row>
                </Container>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
