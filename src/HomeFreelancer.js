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

class HomeFreelancer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "NeRaMit",
      balance: "0.0",
      jobList: [
        {
          id: "00001",
          name: "Make Android App",
          type: "Android App",
          freelancerID: "123456789",
          freelancerName: "-",
          status: "Open",
          wage: "300,000 baht",
          time: "3 month"
        },
        {
          id: "00002",
          name: "Make Website",
          type: "Frontend Backend",
          freelancerID: "55555555",
          freelancerName: "Shiba",
          status: "In progress",
          wage: "150,000 baht",
          time: "2 month"
        }
      ],
      interest: ["react", "react native", "express", "mysql", "nest.js"]
    };
  }

  render() {
    var recentJob = this.state.jobList.map((job, index) => (
      <tr key={index} className="text-center">
        <td className="align-middle">
          {job.name}
          <br />
          <br />
          {job.type}
        </td>
        <td className="align-middle">
          <FaMoneyBill className="job-icon" />
          {job.wage}
        </td>
        <td className="align-middle">
          <FaClock className="job-icon" />
          {job.time}
        </td>
        <td className="align-middle">
          <button type="button" className="btn btn-secondary btn-block">
            Detail
          </button>
        </td>
      </tr>
    ));
    var interest = this.state.interest.map((type, index) => (
      <Card className="w-25 p-3 text-center shadow">
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
        <NavBar mode="freelancer" />
        <Container id="homefreelancer-box">
          <Row>
            <Col className="bg-light shadow" xl={8}>
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
                <h2 className="mb-0">{this.state.username}</h2>
              </div>
              <div className="bg-light">
                <Container>
                  <Row className="rounded shadow">
                    <Col xs={7}>
                      <h5 className="mb-0 p-3">Account Balance</h5>
                    </Col>
                    <Col>
                      <p className="mb-0 p-3">{this.state.balance} USD</p>
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
