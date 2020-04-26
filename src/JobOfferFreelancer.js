import React from "react";
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
import LoadingSpinner from './utilities/LoadingSpinner';
import StatusBadge from './utilities/StatusBadge';

class JobOfferFreelancer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: this.props.userID,
      status: {
        ALL: "all",
        INTERESTED: "open",
        MAKEDEAL: "accepted",
        CONTRACT: "working",
        DONE: "done",
        CLOSED: "closed",
      },
      statusFilter: "all",
      userDatas: "",
      jobDatas: "",
      keyword: "",
      isUserDataLoad: false,
      isJobDataLoad: false
    };
  }

  keywordHandler = (check = false) => {
    let word = document.getElementById("searchbox").value
    console.log(word)
    if (check) {
      this.setState({ keyword: word })
    }
  }

  statusHandler = (event, status) => {
    this.setState({ statusFilter: status });
  };

  fetchDatas = async () => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + LocalStorageService.getAccessToken();
    await axios
      .get(process.env.REACT_APP_BACKEND_URL + "/users/" + LocalStorageService.getUserID())
      .then(res => {
        const userDatas = res.data;
        this.setState({ userDatas: userDatas, isUserDataLoad: true });
        console.log(this.state.userDatas);
      });
    let data = []
    await axios
      .get(process.env.REACT_APP_BACKEND_URL + "/bids/job/" + LocalStorageService.getUserID())
      .then(async res => {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].contractId === null) {
            data.push(res.data[i]);
          } else {
            console.log(res.data[i])
            if(res.data[i].freelancerId.toString() === LocalStorageService.getUserID().toString()){
              data.push(res.data[i]);
            }
          }

        }
        await this.setState({ jobDatas: data, isJobDataLoad: true });
        console.log(res.data);
      })
  };

  componentDidMount = () => {
    this.fetchDatas();
  }

  handleClickJobDetail = (e) => {
    window.location.href = '/dashboard/' + e.target.id;
  }

  render() {
    if (!this.state.isUserDataLoad) {
      return <LoadingSpinner />;
    }
    var recentJob;
    if (!this.state.isJobDataLoad) {
      recentJob = <td colSpan="4" className="text-center"><LoadingSpinner customClass="false" /></td>;
    } else if (this.state.statusFilter === this.state.status.ALL) {
      recentJob = this.state.jobDatas
        .filter(job => job.name.toLowerCase().includes(this.state.keyword.toLowerCase()))
        .map((job, index) => (
          <tr key={index} className="text-center">
            <td className="align-middle">
              {job.name}
            </td>
            <td className="align-middle">{job.catergory}</td>
            <td className="align-middle"><StatusBadge jobStatus={job.status} /></td>
            <td className="align-middle">
              <button type="button" className="btn btn-secondary btn-block" id={job.jobId} onClick={this.handleClickJobDetail.bind(this)}>
                Detail
            </button>
            </td>
          </tr>
        ));
    } else {
      recentJob = this.state.jobDatas
        .filter(job => {
          if (job.status === this.state.statusFilter) {
            return true;
          } else {
            if (this.state.statusFilter === this.state.status.CONTRACT) {
              switch (job.status) {
                case this.state.status.INTERESTED:
                  return false;
                case this.state.status.MAKEDEAL:
                  return false;
                case this.state.status.DONE:
                  return false;
                case this.state.status.CLOSED:
                  return false;
                default:
                  return true;
              }
            }
            else {
              return false;
            }
          }
        })
        .filter(job => job.name.toLowerCase().includes(this.state.keyword.toLowerCase()))
        .map((job, index) => (
          <tr key={index} className="text-center">
            <td className="align-middle">
              {job.name}
            </td>
            <td className="align-middle">{job.catergory}</td>
            <td className="align-middle"><StatusBadge jobStatus={job.status} /></td>
            <td className="align-middle">
              <button type="button" className="btn btn-secondary btn-block" id={job.jobId} onClick={this.handleClickJobDetail.bind(this)}>
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
          <h5>Category</h5>
        </td>
        <td className="align-middle">
          <h5>Status</h5>
        </td>
        <td className="align-middle"></td>
      </tr>
    );

    return (
      <div className="main-background">
        <Container id="homeclient-box">
          <Row>
            <Col className="bg-light">
              <h2 id="recentjob-topic">Job Offering</h2>
            </Col>
          </Row>
          <Row className="bg-light shadow">
            <Col lg={6} md={6.5}>
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
                <Nav.Item>
                  <Nav.Link
                    eventKey="link-6"
                    onClick={e =>
                      this.statusHandler(e, this.state.status.CLOSED)
                    }
                  >
                    Closed
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col>
              <Form inline className="joboffer-search">
                <FormControl
                  type="text"
                  id="searchbox"
                  placeholder="Search"
                  className="mr-sm-2 joboffer-search-box"
                />
                <Button variant="outline-success" className="w-auto" onClick={(e) => this.keywordHandler(true)}>Search</Button>
              </Form>
            </Col>
          </Row>
          <Row className="bg-light shadow">
            <Table responsive>
              <thead className="background-blue text-light">
                {headTable}
              </thead>
              <tbody>{recentJob}</tbody>
            </Table>
          </Row>
        </Container>
      </div>
    );
  }
}

export default JobOfferFreelancer;
