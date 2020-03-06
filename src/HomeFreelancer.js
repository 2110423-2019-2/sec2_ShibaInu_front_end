import React from "react";
import NavBar from "./NavBar";
import "./HomeFreelancer.css";
import { Container, Row, Col, Table, CardDeck } from "react-bootstrap";
import { FaClock, FaMoneyBill } from "react-icons/fa";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
} from "reactstrap";
import logo from "./material/Logo.png";
import axios from 'axios';
import LocalStorageService from './LocalStorageService';

class HomeFreelancer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: this.props.userID,
      jobList: [
        {
          id: "00001",
          name: "Make Android App",
          type: "Android App",
          freelancerID: "123456789",
          freelancerName: "-",
          status: "Open"
        },
        {
          id: "00002",
          name: "Make Website",
          type: "Frontend Backend",
          freelancerID: "55555555",
          freelancerName: "Shiba",
          status: "In progress"
        }
      ],
      userDatas: "",
      jobDatas: "",
      isUserDataLoad: false,
      isJobDataLoad: false,
      interest: ["react", "react native", "express", "mysql", "nest.js"]
    };
  }

  fetchDatas = () => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + LocalStorageService.getAccessToken();
    axios
      .get("http://35.198.228.244:10000/users/" + this.state.userID)
      .then(res => {
        const userDatas = res.data;
        this.setState({ userDatas: userDatas, isUserDataLoad: true });
        console.log(this.state.userDatas);
      });
    axios
      .get("http://35.198.228.244:10000/jobs/user/" + this.state.userID)
      .then(res => {
        const jobDatas = res.data;
        this.setState({ jobDatas: jobDatas, isJobDataLoad: true });
        console.log(this.state.jobDatas);
      });
  };

  componentDidMount = () => {
    this.fetchDatas();
  };

  render() {
    if (!this.state.isUserDataLoad || !this.state.isJobDataLoad) {
      return null;
    }
    var recentJob = this.state.jobDatas.map((job, index) => (
      <tr key={index} className="text-center">
        <td className="align-middle">
          {job.name}
        </td>
        <td className="align-middle">
          <FaMoneyBill className="job-icon" />
          {job.estimatedWage}
        </td>
        <td className="align-middle">
          <FaClock className="job-icon" />
          {job.estimatedDuration}
        </td>
        <td className="align-middle">
          <button type="button" className="btn btn-secondary btn-block">
            Detail
          </button>
        </td>
      </tr>
    ));
    //var limit5 = (typeof(this.state.userDatas.skills) === 'string')?(this.state.interest):(this.state.userDatas.skills).slice(0,5);
    var interest = this.state.interest.map((type, index) => (
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
    ));
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
        <NavBar mode="freelancer" userDatas={this.state.userDatas}/>
        <Container id="homefreelancer-box">
          <Row>
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
                <h2 className="mb-0">{this.state.userDatas.firstName}{" "}
                  {this.state.userDatas.lastName}</h2>
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
          <Row>
            <Col className="background-blue shadow filter-box">
              <h2 className="text-light" id="filter-topic">
                Interested
              </h2>
              <CardDeck>{interest}</CardDeck>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default HomeFreelancer;
