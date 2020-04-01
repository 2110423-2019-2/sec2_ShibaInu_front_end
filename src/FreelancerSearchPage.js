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
          v = 2;
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
    var ApiUrl = utilities["backend-url"] + "/users" + "?" + tmp1.join("&");
    console.log(ApiUrl);
    this.props.parentCallback(ApiUrl);
  };

  handleReset = e => {
    this.setState({});
    console.log(this.state);
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
                name="s1"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Interested Catergory</Form.Label>
              <Form.Control as="select" name="cat" onChange={this.handleChange}>
                <option>All</option>
                <option>Website</option>
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
                <option>Rating (High to Low)</option>
                <option>Rating (Low to High)</option>
                <option>Newest Users</option>
                <option>Oldest Users</option>
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
    this.state = { freelancerList: [] };
  }

  componentDidMount() {
    axios.get(this.props.ApiUrl).then(res => {
      this.setState({ freelancerList: res.data });
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.ApiUrl !== this.props.ApiUrl) {
      axios
        .get(this.props.ApiUrl)
        .then(res => {
          this.setState({ freelancerList: res.data });
        })
        .catch(error => {
          this.setState({ freelancerList: [] });
          console.log(error);
        });
    }
  }

  render() {
    var emptyMessage = "";
    if (this.state.freelancerList.length == 0) emptyMessage = "Not Found";
    else emptyMessage = "";
    return (
      <Card class="result">
        <Card.Header>Result</Card.Header>
        <Card.Body>
          {emptyMessage}
          {this.state.freelancerList.map(u => {
            var tmp = [];
            var tmp2 = [];
            u.skills.map(s => tmp.push(s.skill));
            u.interestedCategories.map(c => tmp2.push(c.interestedCategory));
            if (tmp.length == 0) tmp.push("-");
            return (
              <ResultRow
                key={u.userId}
                userId={u.userId}
                firstName={u.firstName}
                lastName={u.lastName}
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
                <a href={"/profile/" + this.props.userId}>
                  <b>{this.props.firstName + " " + this.props.lastName}</b>
                </a>
              </div>
              <div>
                <b>Skill : </b>
                {this.props.skill}
              </div>
              <div>
                <b>Interested Catergory :</b>
                {this.props.intCat}
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
    this.state = { ApiUrl: utilities["backend-url"] + "/users?sort=2" };
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
