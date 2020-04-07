import React from "react";
import NavBar from "./NavBar";
import "./HomeFreelancer.css";
import { Container, Row, Col, Table, CardDeck } from "react-bootstrap";
import { FaClock, FaMoneyBill, FaBullhorn, FaInfoCircle } from "react-icons/fa";
import { Card, CardImg, CardBody, CardTitle } from "reactstrap";
import logo from "./material/Logo.png";
import axios from "axios";
import LocalStorageService from "./LocalStorageService";
var utilities = require("./Utilities.json");
class HomeFreelancer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDatas: "",
      jobDatas: "",
      isUserDataLoad: false,
      isJobDataLoad: false,
      announce: [],
      isAnnounceLoad: false,
      interest: ["react", "react native", "express", "mysql", "nest.js"],
    };
  }

  fetchDatas = () => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + LocalStorageService.getAccessToken();
    axios
      .get(
        utilities["backend-url"] + "/users/" + LocalStorageService.getUserID()
      )
      .then((res) => {
        const userDatas = res.data;
        this.setState({ userDatas: userDatas, isUserDataLoad: true });
        console.log(this.state.userDatas);
      });
    axios
      .get(
        utilities["backend-url"] +
          "/jobs/recommend/" +
          LocalStorageService.getUserID()
      )
      .then((res) => {
        const jobDatas = res.data;
        this.setState({ jobDatas: jobDatas, isJobDataLoad: true });
        console.log(this.state.jobDatas);
      });
    axios.get(utilities["backend-url"] + "/announcement").then((res) => {
      const announce = res.data;
      this.setState({ announce: announce, isAnnounceLoad: true });
      console.log(this.state.announce);
    });
  };

  handleClickJobDetail(e) {
    window.location.href = "/dashboard/" + e.target.id;
  }

  componentDidMount = () => {
    this.fetchDatas();
  };

  render() {
    if (!this.state.isUserDataLoad || !this.state.isJobDataLoad) {
      return null;
    }
    var recentJob = this.state.jobDatas.map((job, index) => (
      <tr key={index} className="text-center">
        <td className="align-middle">{job.name}</td>
        <td className="align-middle">
          <FaMoneyBill className="job-icon" />
          {job.estimatedWage}
        </td>
        <td className="align-middle">
          <FaClock className="job-icon" />
          {job.estimatedDuration}
        </td>
        <td className="align-middle">
          <button
            type="button"
            className="btn btn-secondary btn-block"
            id={job.jobId}
            onClick={this.handleClickJobDetail.bind(this)}
          >
            Detail
          </button>
        </td>
      </tr>
    ));
    var announce;
    if (this.state.isAnnounceLoad) {
      announce = this.state.announce.map((announce) => (
        <Row>
          <Col className="bg-light shadow pt-2">
            <h5 className="announce-title">
              <FaBullhorn /> {announce.title}
            </h5>
            <p className="announce-content">
              <FaInfoCircle /> {announce.content}
            </p>
          </Col>
        </Row>
      ));
    }
    //var limit5 = (typeof(this.state.userDatas.skills) === 'string')?(this.state.interest):(this.state.userDatas.skills).slice(0,5);
    /*var interest = this.state.interest.map((type, index) => (
      <Card className="w-25 p-3 text-center shadow" key={index}>
        <a className="text-decoration-none text-dark" href="/freelancer/home">
          <CardImg className="bg-dark shadow" src={logo} alt="Card image cap" />
          <CardBody>
            <CardTitle>
              <h5>{type}</h5>
            </CardTitle>
          </CardBody>
        </a>
      </Card>
    ));*/
    var headTable = (
      <tr className="text-center">
        <td className="align-middle">
          <h5>Name</h5>
        </td>
        <td className="align-middle">
          <h5>Freelancer</h5>
        </td>
        <td className="align-middle">
          <h5>Status</h5>
        </td>
        <td className="align-middle"></td>
      </tr>
    );

    return (
      <div className="main-background">
        <NavBar />
        <Container id="homefreelancer-box">
          <Row>
            <Col className="background-blue text-light pt-2 pb-2">
              <h3>
                <FaBullhorn /> Announcement
              </h3>
            </Col>
          </Row>
          <Row id="announce-area">
            <Container >
              {announce}
            </Container>
          </Row>
          <Row className="mt-3">
            <Col className="bg-light shadow" xl={8} offset={1}>
              <h2 id="recommend-topic">Recommend</h2>
              <Table responsive>
                <thead className="background-blue text-light">
                  {headTable}
                </thead>
                <tbody>{recentJob}</tbody>
              </Table>
            </Col>
            <Col className="shadow balance-box background-blue">
              <div id="balance-topic" className="text-light">
                <p className="mb-0">Welcome Back!</p>
                <h2 className="mb-0">
                  {this.state.userDatas.firstName}{" "}
                  {this.state.userDatas.lastName}
                </h2>
              </div>
              <div className="bg-light rounded shadow">
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

export default HomeFreelancer;
