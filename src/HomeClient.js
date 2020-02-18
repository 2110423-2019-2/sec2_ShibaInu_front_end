import React from "react";
import NavBar from "./NavBar";
import "./HomeClient.css";
import { Container, Row, Col, Table } from "react-bootstrap";
import axios from "axios";

class HomeClient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: "1",
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
      isDataLoad: false,
    };
  }

  fetchDatas = () => {
    axios
      .get("http://35.198.228.244:10000/users/" + this.state.userID)
      .then(res => {
        const userDatas = res.data;
        this.setState({ userDatas: userDatas , isDataLoad: true});
        console.log(this.state.userDatas);
      });
  };

  componentDidMount = () => {
    this.fetchDatas();
  };

  render() {
    if(!this.state.isDataLoad){
      return null;
    }
    var recentJob = this.state.jobList.map((job, index) => (
      <tr key={index} className="text-center">
        <td className="align-middle">
          {job.name}
          <br />
          <br />
          {job.type}
        </td>
        <td className="align-middle">{job.freelancerName}</td>
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
        <NavBar mode="client" userDatas={this.state.userDatas}/>
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
            <Col className="shadow balance-box background-blue">
              <div id="balance-topic" className="text-light">
                <h5 className="mb-0">Welcome Back!</h5>
                <h2 className="mb-0">
                  {this.state.userDatas.firstName}{" "}
                  {this.state.userDatas.lastName}
                </h2>
              </div>
              <div className="bg-light">
                <Container>
                  <Row className="rounded shadow">
                    <Col xs={6} className="align-left">
                      <h5 className="p-3">Account</h5>
                      <br />
                      <h5 className="p-3">Balance</h5>
                    </Col>
                    <Col>
                      <h5 className="p-3">{this.state.userDatas.money} USD</h5>
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
