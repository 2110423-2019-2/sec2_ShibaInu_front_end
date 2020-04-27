import React from "react";
import "./SearchPage.css";
import axios from "axios";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { FaCode, FaBtc, FaClock } from "react-icons/fa";

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      r1: "",
      w1: "",
      w2: "",
      t1: "",
      t2: "",
      cat: "",
      sort: 0,
    };
    this.handleChange.bind(this);
    this.handleSubmit.bind(this);
    this.handleReset.bind(this);
  }
  handleChange = (e) => {
    var k = e.target.name;
    var v = e.target.value;
    if (k === "w1" || k === "w2" || k === "t1" || k === "t2") {
      v = parseInt(v);
    } else if (k === "sort") {
      switch (v) {
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
        default:
          v = 1;
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
    var ApiUrl = process.env.REACT_APP_BACKEND_URL + "/jobs" + "?" + tmp1.join("&");
    //console.log(ApiUrl);
    this.props.parentCallback(ApiUrl);
  };

  handleReset = (e) => {
    this.setState({
      name: "",
      r1: "",
      w1: "",
      w2: "",
      t1: "",
      t2: "",
      cat: "",
      sort: 0,
    });
    var tmp1 = [];
    Object.entries(this.state).map((a) => {
      tmp1.push(a.join("="));
    });
    var ApiUrl = process.env.REACT_APP_BACKEND_URL + "/jobs?status=open&" + tmp1.join("&");
    //console.log(ApiUrl);
    this.props.parentCallback(ApiUrl);
  };

  render() {
    return (
      <Card class="filter">
        <Card.Header>Filter</Card.Header>
        <Card.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Keyword</Form.Label>
              <Form.Control
                type="text"
                placeholder="Keyword"
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
            <Form.Label>Wage</Form.Label>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Control placeholder="Min" name="w1" onChange={this.handleChange} />
              </Form.Group>
              <Col lg="1">-</Col>
              <Form.Group as={Col}>
                <Form.Control placeholder="Max" name="w2" onChange={this.handleChange} />
              </Form.Group>
            </Form.Row>
            <Form.Label>Duration</Form.Label>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Control placeholder="Min" name="t1" onChange={this.handleChange} />
              </Form.Group>
              <Col lg="1">-</Col>
              <Form.Group as={Col}>
                <Form.Control placeholder="Max" name="t2" onChange={this.handleChange} />
              </Form.Group>
            </Form.Row>
            <Form.Group>
              <Form.Label>Catergory</Form.Label>
              <Form.Control as="select" name="cat" onChange={this.handleChange}>
                <option>---</option>
                <option>Web</option>
                <option>Software</option>
                <option>Mobile</option>
                <option>Game</option>
                <option>Other</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Sort by</Form.Label>
              <Form.Control as="select" name="sort" onChange={this.handleChange}>
                <option>Newest</option>
                <option>Oldest</option>
                <option>Max wage first</option>
                <option>Min wage first</option>
                <option>Longer duration first</option>
                <option>Shorter duration first</option>
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
    this.state = { jobList: [] };
  }

  componentDidMount() {
    axios.get(this.props.ApiUrl).then((res) => {
      this.setState({ jobList: res.data });
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.ApiUrl !== this.props.ApiUrl) {
      axios.get(this.props.ApiUrl).then((res) => {
        this.setState({ jobList: res.data });
      });
    }
  }

  render() {
    return (
      <Card class="result">
        <Card.Header>Search Job</Card.Header>
        <Card.Body>
          {this.state.jobList
            .filter((job) => {
              //console.log(job);
              return job.status === 'open';
            })
            .map((j) => {
              var tmp = [];
              j.requiredSkills.map((s) => tmp.push(s.skill));
              if (tmp.length === 0) tmp.push("-");
              return (
                <ResultRow
                  key={j.jobId}
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
            <Col lg="9" md={6} sm={8} xs={7}>
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
              <div id="wage">
                <FaBtc /> {parseInt(this.props.wage)} THB
              </div>
              <div>
                <FaClock /> {this.props.duration} Days
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

class JobSearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ApiUrl: process.env.REACT_APP_BACKEND_URL + "/jobs?sort=0" };
  }

  callbackFunction = (childData) => {
    this.setState({ ApiUrl: childData });
  };

  render() {
    return (
      <div>
        <div class="search-page">
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

export default JobSearchPage;
