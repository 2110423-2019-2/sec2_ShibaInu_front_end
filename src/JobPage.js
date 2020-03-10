import React from "react";
import "./JobPage.css";
import axios from "axios";
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
    this.state = { details: {} };
  }

  componentDidMount() {
    axios.get("http://35.198.228.244:10000/jobs/1").then(res => {
      const details = res.data;
      this.setState({ details });
    });
  }

  render() {
    return (
      <div class="job-detail">
        <header>{this.state.details.name}</header>
        <div class="non-header">
          <div class="inside-box">{this.state.details.description}</div>
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
              <div>Shiba Shiba</div>
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

// class JobSuggest extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   render() {
//     return (
//       <div class="job-suggest">
//         <header>Relate Job</header>
//         <div>1234</div>
//       </div>
//     );
//   }
// }

class InterrestedFreelancer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bids: [] };
  }

  componentDidMount() {
    axios.get("http://35.198.228.244:10000/bids/bidId/1").then(res => {
      const bids = res.data;
      this.setState({ bids });
    });
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
            {this.state.bids.map(bid => (
              <InterFreeRow
                userId={bid.userId}
                amount={bid.biddedWage}
                duration={bid.biddedDuration}
                timestamp={bid.createdTime}
              />
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

class InterFreeRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: "" };
  }

  componentDidMount() {
    axios
      .get("http://35.198.228.244:10000/users/" + this.props.userId)
      .then(res => {
        const user = res.data;
        this.setState({ user });
      });
  }

  render() {
    return (
      <tr>
        <td>{this.state.user.firstName + " " + this.state.user.lastName}</td>
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
