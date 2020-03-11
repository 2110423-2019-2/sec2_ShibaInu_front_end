import React from "react";
import NavBar from "./NavBar";
import "./JobOfferFreelancer.css";
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
class JobOfferFreelancer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: this.props.userID,
      status: {
        ALL: "all",
        INTERESTED: "interested",
        MAKEDEAL: "make deal",
        CONTRACT: "contract"
      },
      statusFilter: "all",
      jobList: [
        {
          id: "00001",
          name: "Make Android App",
          type: "Android App",
          freelancerID: "123456789",
          freelancerName: "-",
          status: "interested"
        },
        {
          id: "00002",
          name: "Make Website",
          type: "Frontend Backend",
          freelancerID: "55555555",
          freelancerName: "Shiba",
          status: "contract"
        }
      ],
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
      recentJob = this.state.jobList.map((job, index) => (
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
    } else {
      recentJob = this.state.jobList
        .filter(job => job.status === this.state.statusFilter)
        .map((job, index) => (
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
                    onClick={e =>
                      this.statusHandler(e, this.state.status.INTERESTED)
                    }
                  >
                    Interested
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="link-3"
                    onClick={e =>
                      this.statusHandler(e, this.state.status.MAKEDEAL)
                    }
                  >
                    Make Deal
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="link-4"
                    onClick={e =>
                      this.statusHandler(e, this.state.status.CONTRACT)
                    }
                  >
                    Contract
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

export default JobOfferFreelancer;
