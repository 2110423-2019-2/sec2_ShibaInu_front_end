import React from "react";
import axios from "axios";
import "./JobCreatePage.css";
import { Form, Row, Col, InputGroup, Button } from "react-bootstrap";
import NavBar from "./NavBar";
var utilities = require("./Utilities.json");

class JobCreatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postData: {
        name: "",
        description: "",
        estimatedDuration: 0,
        estimatedWage: 0,
        catergory: "Web",
        // "web" / "software" / "mobile" / "game" / "other"
        client: 1,
        requiredSkills: [],
        optianalSkills: []
      }
    };
    this.handleChange.bind(this);
    this.handleSubmit.bind(this);
  }

  handleChange = e => {
    let tempData = this.state.postData;
    if (
      e.target.name === "estimatedDuration" ||
      e.target.name === "estimatedWage"
    ) {
      tempData[e.target.name] = parseInt(e.target.value);
    } else {
      tempData[e.target.name] = e.target.value;
    }
    this.setState({
      postData: tempData
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    axios
      .post(utilities["backend-url"] + "/jobs", this.state.postData)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      .catch(error => {
        if (error.response.status === 400) {
          console.log("Error 400");
          this.setState({ errorMessage: error.response.data.message });
        } else {
          console.error(error);
        }
      });
  };

  render() {
    return (
      <div>
        <NavBar mode=" " userDatas={" "} />
        <div class="job-create-page">
          <header>Create New Job Offering</header>
          <div>
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
                  {" "}
                  <Form.Group controlId="bidAmount">
                    <Form.Label>Essimate Wage</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="number"
                        placeholder="0"
                        name="estimatedWage"
                        onChange={this.handleChange}
                        required
                      />
                      <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroupPrepend">
                          THB
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col>
                  {" "}
                  <Form.Group controlId="bidDuration">
                    <Form.Label>Essimate Duration</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="number"
                        placeholder="0"
                        name="estimatedDuration"
                        onChange={this.handleChange}
                        required
                      />
                      <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroupPrepend">
                          Day
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group controlId="catergory">
                <Form.Label>Catergory</Form.Label>
                <Form.Control
                  as="select"
                  name="catergory"
                  onChange={this.handleChange}
                >
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
                  name="optianalSkills"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Button variant="success" type="submit">
                Create
              </Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default JobCreatePage;
