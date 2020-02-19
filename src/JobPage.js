import React from "react";
import "./JobPage.css";
import NavBar from "./NavBar";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  Table
} from "react-bootstrap";

class JobDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div class="job-detail">
        <header>Build a mobile app</header>
        <div class="non-header">
          <div class="inside-box">
            Hi, I am Husain, an I am just started a startup company. I need an
            application to connect local electrician, plumbers, mechanics, and
            many other to the customers in order to fulfilled their need. For
            example, customer login and search for an electrician nearby. The
            app will shows result of electricians nearby with the detail
            provided the customer.
          </div>
          <div class="inside-box">
            <div>
              <b>Require Skill</b>
              <div>Java, Mobile App Development, Android</div>
            </div>
          </div>
          <div class="inside-box">
            <div>
              <b>Optional Skill</b>
              <div> Software Architecture, Software Testing</div>
            </div>
          </div>
          <div class="inside-box">
            <div>
              <b>Client</b>
            </div>
          </div>
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
          <Form.Group controlId="bidAmount">
            <InputGroup>
              <Form.Control type="number" placeholder="0" required />
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">THB</InputGroup.Text>
              </InputGroup.Prepend>
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="bidDuration">
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

class InterrestedFreelancer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div class="interrested-freelancer">
        <header>Interrested Freelancer</header>
        <Table reponsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount(THB)</th>
              <th>Duration(Days)</th>
              <th>Time Stamp</th>
            </tr>
          </thead>
          <tbody>
            <InterFreeRow
              name="Mark Otto"
              amount="20000"
              duration="70"
              timestamp="19/2/2020 20:20"
            />
            <InterFreeRow
              name="Jacob Thornton"
              amount="10000"
              duration="30"
              timestamp="18/2/2020 10:10"
            />
            <InterFreeRow
              name="Larry the Bird"
              amount="30000"
              duration="40"
              timestamp="19/2/2020 19.55"
            />
          </tbody>
        </Table>
      </div>
    );
  }
}

class InterFreeRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.amount}</td>
        <td>{this.props.duration}</td>
        <td>{this.props.timestamp}</td>
      </tr>
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
      <div>
        <NavBar mode=" " userDatas={" "} />
        <div class="job-page">
          <Container>
            <Row>
              <Col lg="9">
                <JobDetail />
                <InterrestedFreelancer />
              </Col>
              <Col>
                <JobBid />
                {/* <JobSuggest /> */}
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default JobPage;
