import React from "react";
import "./JobSearchPage.css";
import NavBar from "./NavBar";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div class="filter">
        <header>Filter</header>
        <Form>
          <Form.Label>Skill</Form.Label>
          <Form.Group controlId="java">
            <Form.Check type="checkbox" label="Java" />
          </Form.Group>
          <Form.Group controlId="python">
            <Form.Check type="checkbox" label="Python" />
          </Form.Group>
          <Form.Group controlId="C++">
            <Form.Check type="checkbox" label="C++" />
          </Form.Group>
          <Form.Label>Wage</Form.Label>
          <Form.Row>
            <Form.Group as={Col} controlId="minWage">
              <Form.Control placeholder="Min" />
            </Form.Group>
            <Col lg="1">-</Col>
            <Form.Group as={Col} controlId="maxWage">
              <Form.Control placeholder="Max" />
            </Form.Group>
          </Form.Row>
          <Form.Label>Duration</Form.Label>
          <Form.Row>
            <Form.Group as={Col} controlId="minWage">
              <Form.Control placeholder="Min" />
            </Form.Group>
            <Col lg="1">-</Col>
            <Form.Group as={Col} controlId="maxWage">
              <Form.Control placeholder="Max" />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Col lg={{ offset: "5" }}>
              <Button variant="secondary" type="reset">
                Clear
              </Button>
            </Col>
            <Col >
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Col>
          </Form.Row>
        </Form>
      </div>
    );
  }
}

class JobSearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <NavBar />
        <div class="job-search-page">
          <Container>
            <Row>
              <Col>
                <Filter />
              </Col>
              <Col lg="8">
                <header>
                  <Form>
                    <Row>
                      <Col>
                        <Form.Group controlId="searchKeyword">
                          <Form.Control placeholder="Search for Job Offering" />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Button variant="primary" type="submit">
                          Submit
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </header>
                <div class="search-result">Result</div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default JobSearchPage;
