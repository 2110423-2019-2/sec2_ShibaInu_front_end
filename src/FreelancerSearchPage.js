import React from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Card, Dropdown, DropdownButton } from "react-bootstrap";
import { FaUserCircle, FaStar } from "react-icons/fa";
import swal from "sweetalert";

import "./SearchPage.css";
import LocalStorageService from "./LocalStorageService";
import firebase from "./firebase";

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", s1: "", cat: "", sort: 2 };
    this.handleChange.bind(this);
    this.handleSubmit.bind(this);
    this.handleReset.bind(this);
  }
  handleChange = (e) => {
    var k = e.target.name;
    var v = e.target.value;
    if (k === "sort") {
      switch (v) {
        case "Newest Users":
          v = 0;
          break;
        case "Oldest Users":
          v = 1;
          break;
        case "Rating (High to Low)":
          v = 2;
          break;
        case "Rating (Low to High)":
          v = 3;
          break;
        default:
          v = 2;
          break;
      }
    }
    var obj = {};
    obj[k] = v;
    this.setState(obj);
  };
  handleSubmit = (e) => {
    e.preventDefault();
    var tmp1 = [];
    Object.entries(this.state).map((a) => {
      tmp1.push(a.join("="));
    });
    var ApiUrl = process.env.REACT_APP_BACKEND_URL + "/users" + "?" + tmp1.join("&");
    this.props.parentCallback(ApiUrl);
  };

  handleReset = (e) => {
    this.setState({ name: "", s1: "", cat: "", sort: 2 });
    var tmp1 = [];
    Object.entries(this.state).map((a) => {
      tmp1.push(a.join("="));
    });
    var ApiUrl = process.env.REACT_APP_BACKEND_URL + "/users" + "?" + tmp1.join("&");
    this.props.parentCallback(ApiUrl);
  };

  render() {
    return (
      <Card className="filter">
        <Card.Header>Filter</Card.Header>
        <Card.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Require Skill</Form.Label>
              <Form.Control
                type="text"
                placeholder="Require Skill"
                name="s1"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Sort by</Form.Label>
              <Form.Control as="select" name="sort" onChange={this.handleChange}>
                <option>Rating (High to Low)</option>
                <option>Rating (Low to High)</option>
                <option>Newest Users</option>
                <option>Oldest Users</option>
              </Form.Control>
            </Form.Group>
            <Form.Row>
              <Col>
                <Button variant="secondary" type="reset" onClick={this.handleReset}>
                  Clear
                </Button>
              </Col>
              <Col>
                <Button variant="primary" type="submit">
                  Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = { freelancerList: [] };
  }

  componentDidMount() {
    axios.get(this.props.ApiUrl).then((res) => {
      this.setState({ freelancerList: res.data });
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.ApiUrl !== this.props.ApiUrl) {
      axios
        .get(this.props.ApiUrl)
        .then((res) => {
          this.setState({ freelancerList: res.data });
        })
        .catch((error) => {
          this.setState({ freelancerList: [] });
          //console.log(error);
        });
    }
  }

  render() {
    var emptyMessage = "";
    if (this.state.freelancerList.length === 0) emptyMessage = "Not Found";
    else emptyMessage = "";
    return (
      <Card className="result">
        <Card.Header>Search Freelancer</Card.Header>
        <Card.Body>
          {emptyMessage}
          {this.state.freelancerList.map((u) => {
            if (parseInt(u.userId) === parseInt(LocalStorageService.getUserID())) return "";
            var tmp = [];
            var tmp2 = [];
            u.skills.map((s) => tmp.push(s.skill));
            u.interestedCategories.map((c) => tmp2.push(c.interestedCategory));
            if (tmp.length === 0) tmp.push("-");
            if (tmp2.length === 0) tmp2.push("-");
            return (
              <ResultRow
                key={u.userId}
                userId={u.userId}
                firstName={u.firstName}
                lastName={u.lastName}
                rating={u.reviewedNumber ? u.sumReviewedScore / u.reviewedNumber : 0}
                skill={tmp.join(", ")}
                intCat={tmp2.join(",")}
              />
            );
          })}
        </Card.Body>
      </Card>
    );
  }
}

class ResultRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { jobList: [] };
  }

  componentDidMount() {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/jobs/user/" + LocalStorageService.getUserID())
      .then((res) => {
        this.setState({ jobList: res.data });
      });
  }

  render() {
    return (
      <div className="result-row">
        <Container id="low-margin">
          <Row>
            <Col lg="0.5">
              <FaUserCircle color="Blue" />
            </Col>
            <Col lg={3} md={5} sm={6} xs={5}>
              <div id="name-and-des">
                <a href={"/profile/" + this.props.userId}>
                  <b>{this.props.firstName + " " + this.props.lastName}</b>
                </a>
              </div>
              <div>
                <b>Skill : </b>
                {this.props.skill}
              </div>
            </Col>
            <Col lg={5} style={{ color: "#FFC70F" }}>
              <div>
                <FaStar color="#FFC70F" />
                {" " + this.props.rating <= 5 ? 5 : this.props.rating.toFixed(2)}
              </div>
            </Col>
            {LocalStorageService.getUserMode() === "client" ? (
              <Col>
                <DropdownButton title="Invite to job...">
                  {this.state.jobList
                    .filter((job) => {
                      return job.status === "open";
                    })
                    .map((j) => (
                      <DropDownItem
                        key={j.jobId}
                        jobId={j.jobId}
                        jobName={j.name}
                        userId={this.props.userId}
                      />
                    ))}
                </DropdownButton>
              </Col>
            ) : (
              ""
            )}
          </Row>
        </Container>
      </div>
    );
  }
}

class DropDownItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    let buttonStyle = {
      cancel: {
        text: "Cancel",
        value: null,
        visible: true,
        className: "btn btn-secondary",
        closeModal: true,
      },
      confirm: {
        text: "OK",
        value: true,
        visible: true,
        className: "btn btn-success",
        closeModal: true,
      },
    };
    swal({
      title: "Confirm Invitation ?",
      text: "Once submit, you will not be able to change this! ",
      icon: "warning",
      buttons: buttonStyle,
    }).then(async (confirm) => {
      if (confirm) {
        firebase
          .firestore()
          .collection("notification")
          .doc("notification")
          .collection(String(this.props.userId))
          .add({
            topic: "Job Invitation",
            detail: "You have been invited to " + this.props.jobName,
            link: "/job/" + this.props.jobId,
            mode: "freelancer",
            createtime: firebase.firestore.FieldValue.serverTimestamp(),
            read: false,
          })
          .then(() => {
            swal("Invited", {
              icon: "success",
            });
          })
          .catch((error) => {
            //console.error(error);
            swal("Error occured!", {
              icon: "error",
            });
          });
      }
    });
  }

  render() {
    return <Dropdown.Item onClick={this.handleClick}>{this.props.jobName}</Dropdown.Item>;
  }
}

class FreelancerSearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ApiUrl: process.env.REACT_APP_BACKEND_URL + "/users?sort=2" };
  }

  callbackFunction = (childData) => {
    this.setState({ ApiUrl: childData });
  };

  render() {
    return (
      <div>
        <div className="search-page">
          <Container>
            <Row>
              <Col lg={3} md={4}>
                <Filter parentCallback={this.callbackFunction} />
              </Col>
              <Col lg={9} md={8}>
                <Result ApiUrl={this.state.ApiUrl} />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default FreelancerSearchPage;
