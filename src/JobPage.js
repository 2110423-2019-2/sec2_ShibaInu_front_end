import React from "react";
import "./JobPage.css";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";

class JobDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div class="job-detail">
        <header>Build a mobile app</header>
        <div class="job-des">
          Hi, I am Husain, an I am just started a startup company. I need an
          application to connect local electrician, plumbers, mechanics, and
          many other to the customers in order to fulfilled their need. For
          example, customer login and search for an electrician nearby. The app
          will shows result of electricians nearby with the detail provided the
          customer.
        </div>
      </div>
    );
  }
}

class JobBid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div class="job-bid">
        <header>Bid</header>
        <Form class="form-bid">
          <Form.Group controlId="fromBidAmount">
            <InputGroup>
              <Form.Control
                type="number"
                placeholder="0"
                // aria-describedby="inputGroupPrepend"
                required
              />
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">THB</InputGroup.Text>
              </InputGroup.Prepend>
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="fromBidDuration">
            <InputGroup>
              <Form.Control
                type="number"
                placeholder="0"
                // aria-describedby="inputGroupPrepend"
                required
              />
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">Day</InputGroup.Text>
              </InputGroup.Prepend>
            </InputGroup>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

class JobSuggest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div class="job-suggest">
        <header>Relate Job</header>
        <div>1234</div>
      </div>
    );
  }
}

class JobPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div class="job-page">
        <Container>
          <Row>
            <Col>
              <Row>
                <JobDetail />
              </Row>
            </Col>
            <Col>
              <Row>
                <JobBid />
              </Row>
              <Row>
                <JobSuggest />
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default JobPage;
