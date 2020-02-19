import React from "react";
import NavBar from "./NavBar";
import "./HomeClient.css";
import { Container, Row, Col, Table } from "react-bootstrap";
import axios from "axios";
import LocalStorageService from './LocalStorageService';

class HomeClient extends React.Component {
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
      isDataLoad: false,
      isJobDataLoad: false
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
    if (!this.state.isDataLoad && !this.state.isJobDataLoad) {
      return null;
    }
    var recentJob = this.state.jobDatas.map((job, index) => (
      <tr key={index} className="text-center">
        <td className="align-middle">
          {job.name}
          <br />
          <br />
          {job.category}
        </td>
        <td className="align-middle">-</td>
        <td className="align-middle">{job.status}</td>
        <td className="align-middle">
          <button type="button" className="btn btn-secondary btn-block">
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
    return (
      <div className="main-background">
        <NavBar mode="client" userDatas={this.state.userDatas} />
        <Container id="homeclient-box">
          <Row>
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

export default HomeClient;
