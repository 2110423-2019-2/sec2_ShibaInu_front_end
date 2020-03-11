import React from "react";
import NavBar from "./NavBar";
import "./JobOfferClient.css";
import {
  Container,
  Row,
  Col,
  Table,
  Nav,
  Form,
  FormControl,
  Button
} from "react-bootstrap";
import axios from 'axios';
import LocalStorageService from './LocalStorageService';
var utilities = require('./Utilities.json');
class JobOfferClient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: this.props.userID,
      status: {
        ALL: "all",
        OPEN: "open",
        ACCEPTED: "accepted",
        WORKING: "working",
        DONE: "done"
      },
      statusFilter: "all",
      userDatas: "",
      jobDatas: "",
      isUserDataLoad: false,
      isJobDataLoad: false
    };
  }

  statusHandler = (event, status) => {
    this.setState({ statusFilter: status });
  };

  fetchDatas = () => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + LocalStorageService.getAccessToken();
    axios
      .get(utilities['backend-url'] + "/users/" + LocalStorageService.getUserID())
      .then(res => {
        const userDatas = res.data;
        this.setState({ userDatas: userDatas, isUserDataLoad: true });
        console.log(this.state.userDatas);
      });
    axios
      .get(utilities['backend-url'] + "/jobs/user/" + LocalStorageService.getUserID())
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
    var recentJob;
    if (this.state.statusFilter === this.state.status.ALL) {
      recentJob = this.state.jobDatas.map((job, index) => (
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
    } else {
      recentJob = this.state.jobDatas
        .filter(job => job.status === this.state.statusFilter)
        .map((job, index) => (
          <tr key={index} className="text-center">
            <td className="align-middle">
              {job.name}
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
    }
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
        <Container id="homeclient-box">
          <Row>
            <Col className="bg-light shadow">
              <h2 id="recentjob-topic">Job Offering</h2>
              <Form inline className="float-right">
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
              <Nav variant="tabs" defaultActiveKey="link-1" id="joblist-table">
                <Nav.Item>
                  <Nav.Link
                    eventKey="link-1"
                    onClick={e => this.statusHandler(e, this.state.status.ALL)}
                  >
                    All
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="link-2"
                    onClick={e => this.statusHandler(e, this.state.status.OPEN)}
                  >
                    Open
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="link-3"
                    onClick={e =>
                      this.statusHandler(e, this.state.status.ACCEPTED)}
                  >
                    Accepted
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="link-4"
                    onClick={e =>
                      this.statusHandler(e, this.state.status.WORKING)
                    }
                  >
                    Working
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="link-5"
                    onClick={e =>
                      this.statusHandler(e, this.state.status.DONE)
                    }
                  >
                    Done
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <Table responsive>
                <thead className="background-blue text-light">
                  {headTable}
                </thead>
                <tbody>{recentJob}</tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default JobOfferClient;
