import React from "react";
import "./JobCreatePage.css";
import { Form, Row, Col, InputGroup, Button } from "react-bootstrap";
import NavBar from "./NavBar";

class JobCreatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <NavBar />
        <div class="job-create-page">
          <header>Create New Job Offering</header>
          <div>
            <Form>
              <Form.Group controlId="jobname">
                <Form.Label>Job Offering Name</Form.Label>
                <Form.Control placeholder="Job Offering Name" />
              </Form.Group>
              <Form.Group controlId="jobDes">
                <Form.Label>Job Description</Form.Label>
                <Form.Control as="textarea" rows="5" />
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
                        // aria-describedby="inputGroupPrepend"
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
                        // aria-describedby="inputGroupPrepend"
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
              <Form.Group controlId="reqSkill">
                <Form.Label>Require Skill</Form.Label>
                <Form.Control placeholder="Ex : React.js,JavaScript,HTML,CSS" />
              </Form.Group>
              <Form.Group controlId="optSkill">
                <Form.Label>Optional Skill</Form.Label>
                <Form.Control placeholder="Ex : English,Photoshop,Illustrator" />
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
