import React from "react";
import "./SearchPage.css";
import NavBar from "./NavBar";
import axios from "axios";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { FaCode, FaBtc, FaClock } from "react-icons/fa";
var utilities = require("./Utilities.json");

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: 0
    };
    this.handleChange.bind(this);
    this.handleSubmit.bind(this);
    this.handleReset.bind(this);
  }
  handleChange = e => {
    var k = e.target.name;
    var v = e.target.value;
    if (k === "sort") {
      switch (v) {
        default:
          v = 1;
        case "Newest":
          v = 0;
          break;
        case "Oldest":
          v = 1;
          break;
        case "Max wage first":
          v = 2;
          break;
        case "Min wage first":
          v = 3;
          break;
        case "Longer duration first":
          v = 4;
          break;
        case "Shorter duration first":
          v = 5;
          break;
      }
    }
    var obj = {};
    obj[k] = v;
    this.setState(obj);
  };
  handleSubmit = e => {
    e.preventDefault();
    var tmp1 = [];
    Object.entries(this.state).map(a => {
      tmp1.push(a.join("="));
    });
    var ApiUrl = utilities["backend-url"] + "/jobs" + "?" + tmp1.join("&");
    console.log(ApiUrl);
    this.props.parentCallback(ApiUrl);
  };

  handleReset = e => {
    this.setState();
  };

  render() {
    return (
      <Card class="filter">
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
                name="r1"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Interested Catergory</Form.Label>
              <Form.Control as="select" name="cat" onChange={this.handleChange}>
                <option>All</option>
                <option>Web</option>
                <option>Software</option>
                <option>Mobile</option>
                <option>Game</option>
                <option>Other</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Sort by</Form.Label>
              <Form.Control
                as="select"
                name="sort"
                onChange={this.handleChange}
              >
                <option>Newest</option>
                <option>Oldest</option>
                <option>Max wage first</option>
                <option>Min wage first</option>
                <option>Longer duration first</option>
                <option>Shorter duration first</option>
              </Form.Control>
            </Form.Group>
            <Form.Row>
              <Col lg={{ offset: "3" }}>
                <Button
                  variant="secondary"
                  type="reset"
                  onClick={this.handleReset}
                >
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
    this.state = { jobList: [] };
  }

  componentDidMount() {
    axios.get(this.props.ApiUrl).then(res => {
      this.setState({ jobList: res.data });
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.ApiUrl !== this.props.ApiUrl) {
      axios.get(this.props.ApiUrl).then(res => {
        this.setState({ jobList: res.data });
      });
    }
  }

  render() {
    return (
      <Card class="result">
        <Card.Header>Result</Card.Header>
        <Card.Body>
          {this.state.jobList.map(j => {
            var tmp = [];
            j.requiredSkills.map(s => tmp.push(s.skill));
            if (tmp.length == 0) tmp.push("-");
            return (
              <ResultRow
                jobId={j.jobId}
                jobName={j.name}
                jobDes={j.description}
                requireSkill={tmp.join(", ")}
                wage={j.estimatedWage}
                duration={j.estimatedDuration}
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
    this.state = {};
  }

  render() {
    return (
      <div class="result-row">
        <Container id="low-margin">
          <Row>
            <Col lg="0.5">
              <FaCode color="Blue" />
            </Col>
            <Col lg="9">
              <div id="name-and-des">
                <div>
                  <a href={"/job/" + this.props.jobId}>
                    <b>{this.props.jobName}</b>
                  </a>
                </div>
                <div id="des">{this.props.jobDes}</div>
              </div>
              <div>
                <div>
                  <b>Require : </b>
                  {this.props.requireSkill}
                </div>
              </div>
            </Col>
            <Col>
              <Button variant="primary">Invite to...</Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

class FreelancerSearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ApiUrl: utilities["backend-url"] + "/jobs?sort=0" };
  }

  callbackFunction = childData => {
    this.setState({ ApiUrl: childData });
  };

  render() {
    return (
      <div>
        <NavBar />
        <div class="search-page">
          <Container>
            <Row>
              <Col>
                <Filter parentCallback={this.callbackFunction} />
              </Col>
              <Col lg="9">
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
