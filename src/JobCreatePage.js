import React from "react";
import axios from "axios";
import "./JobCreatePage.css";
import { Form, Row, Col, InputGroup, Button, Card } from "react-bootstrap";
import LocalStorageService from "./LocalStorageService";

class JobCreatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postData: {
        name: "",
        description: "",
        estimatedDuration: 0,
        estimatedWage: 0,
        catergory: "web",
        // "web" / "software" / "mobile" / "game" / "other"
        client: LocalStorageService.getUserID(),
        requiredSkills: [],
        optionalSkills: [],
      },
      cantCreateMsg: "",
    };
    this.handleChange.bind(this);
    this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/users/" + LocalStorageService.getUserID())
      .then((res) => {
        if (!res.data.isVerified) this.setState({ cantCreateMsg: "Please verified to create job" });
      });
    if (LocalStorageService.getUserMode() === "freelancer")
      this.setState({ cantCreateMsg: "Please switch to client to create job" });
  }

  handleChange = (e) => {
    let tempData = this.state.postData;
    if (e.target.name === "estimatedDuration" || e.target.name === "estimatedWage") {
      tempData[e.target.name] = parseInt(e.target.value);
    } else if (e.target.name === "catergory") {
      tempData[e.target.name] = e.target.value.toLowerCase();
    } else if (e.target.name === "requiredSkills" || e.target.name === "optionalSkills") {
      tempData[e.target.name] = e.target.value.split(",").map((s) => {
        let t = {};
        t["skill"] = s;
        return t;
      });
    } else {
      tempData[e.target.name] = e.target.value;
    }
    this.setState({
      postData: tempData,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + LocalStorageService.getAccessToken();
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/jobs", this.state.postData)
      .then((res) => {
        switch (res.status) {
          case 201:
            //console.log("Created,Logged in. Redirecting to /client/job ...");
            window.location.href = "/client/job";
            break;
          default:
            //console.log("Status code is " + res.status);
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          //console.log("Error 400");
          this.setState({ errorMessage: error.response.data.message });
        } else {
          //console.error(error);
        }
      });
  };

  render() {
    return (
      <div>
        <Card id="job-create-page">
          <Card.Header>Create New Job Offering</Card.Header>
          <Card.Body>
            {this.state.cantCreateMsg ? (
              <div>{this.state.cantCreateMsg}</div>
            ) : (
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="jobname">
                  <Form.Label>Job Offering Name</Form.Label>
                  <Form.Control
                    placeholder="Job Offering Name"
                    name="name"
                    onChange={this.handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="jobDes">
                  <Form.Label>Job Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="5"
                    name="description"
                    onChange={this.handleChange}
                    required
                  />
                </Form.Group>
                <Row>
                  <Col>
                    <Form.Group controlId="bidAmount">
                      <Form.Label>Estimate Wage</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="number"
                          placeholder="0"
                          name="estimatedWage"
                          onChange={this.handleChange}
                          required
                        />
                        <InputGroup.Prepend>
                          <InputGroup.Text id="inputGroupPrepend">THB</InputGroup.Text>
                        </InputGroup.Prepend>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="bidDuration">
                      <Form.Label>Estimate Duration</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="number"
                          placeholder="0"
                          name="estimatedDuration"
                          onChange={this.handleChange}
                          required
                        />
                        <InputGroup.Prepend>
                          <InputGroup.Text id="inputGroupPrepend">Day</InputGroup.Text>
                        </InputGroup.Prepend>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group controlId="catergory">
                  <Form.Label>Catergory</Form.Label>
                  <Form.Control as="select" name="catergory" onChange={this.handleChange}>
                    <option>Web</option>
                    <option>Software</option>
                    <option>Mobile</option>
                    <option>Game</option>
                    <option>Other</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="reqSkill">
                  <Form.Label>Require Skill</Form.Label>
                  <Form.Control
                    placeholder="Ex : React.js,JavaScript,HTML,CSS"
                    name="requiredSkills"
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="optSkill">
                  <Form.Label>Optional Skill</Form.Label>
                  <Form.Control
                    placeholder="Ex : English,Photoshop,Illustrator"
                    name="optionalSkills"
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Button variant="success" type="submit">
                  Create
                </Button>
              </Form>
            )}
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default JobCreatePage;
