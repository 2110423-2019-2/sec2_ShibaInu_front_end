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
  Table,
  Card
} from "react-bootstrap";
import LocalStorageService from "./LocalStorageService";
var utilities = require("./Utilities.json");

class JobDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {
        requiredSkills: [],
        optionalSkills: [],
        client: { firstName: "", lastName: "" }
      }
    };
  }

  componentDidMount() {
    axios
      .get(utilities["backend-url"] + "/jobs/" + this.props.jobid.jobid)
      .then(res => {
        const details = res.data;
        this.setState({ details });
      });
  }

  skilltostring(i) {
    let out = [];
    if (i.length == 0) {
      return "-";
    }
    i.map(s => out.push(" " + s["skill"]));
    return out.toString();
  }

  render() {
    console.log(this.state.details);
    return (
      <Card id="job-detail">
        <Card.Header>{this.state.details.name}</Card.Header>
        <Card.Body>
          <div class="inside-body">{this.state.details.description}</div>
          <div class="inside-body">
            <div>
              <b>Require Skill</b>
              <div>{this.skilltostring(this.state.details.requiredSkills)}</div>
            </div>
          </div>
          <div class="inside-body">
            <div>
              <b>Optional Skill</b>
              <div>{this.skilltostring(this.state.details.optionalSkills)}</div>
            </div>
          </div>
          <div class="inside-body">
            <div>
              <b>Client</b>
              <div>
                {this.state.details.client.firstName}{" "}
                {this.state.details.client.lastName}
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  }
}

class JobBid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postData: {
        jobId: this.props.jobid.jobid,
        userId: LocalStorageService.getUserID(),
        biddedWage: "",
        biddedDuration: ""
      }
    };
    this.handleChange.bind(this);
    this.handleSubmit.bind(this);
  }

  handleChange = e => {
    let tempData = this.state.postData;
    tempData[e.target.name] = parseInt(e.target.value);

    this.setState({
      postData: tempData
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    axios
      .post(utilities["backend-url"] + "/bids", this.state.postData)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        if (error.response.status === 400) {
          console.log("Error 400");
          this.setState({ errorMessage: error.response.data.message });
        } else {
          console.error(error);
        }
      });

    this.setState({
      postData: {
        biddedWage: "",
        biddedDuration: ""
      }
    });
    this.props.parentCallback(1);
  };

  render() {
    return (
      <Card id="job-bid">
        <Card.Header>Bid</Card.Header>
        <Card.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="bidAmount">
              <InputGroup>
                <Form.Control
                  type="number"
                  placeholder="0"
                  name="biddedWage"
                  onChange={this.handleChange}
                  value={this.state.postData.biddedWage}
                  required
                />
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
                  name="biddedDuration"
                  onChange={this.handleChange}
                  value={this.state.postData.biddedDuration}
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
        </Card.Body>
      </Card>
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
    axios
      .get(utilities["backend-url"] + "/bids/bidId/" + this.props.jobid.jobid)
      .then(res => {
        const bids = res.data;
        this.setState({ bids });
      });
  }

  componentDidUpdate() {
    if (this.props.refresh == 1) {
      axios
        .get(utilities["backend-url"] + "/bids/bidId/" + this.props.jobid.jobid)
        .then(res => {
          const bids = res.data;
          this.setState({ bids });
        });
      this.props.parentCallback(0);
    }
  }

  render() {
    return (
      <Card id="interrested-freelancer">
        <Card.Header>Interrested Freelancer</Card.Header>
        <Card.Body>
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
                  key={bid.bidId}
                  userId={bid.userId}
                  amount={bid.biddedWage}
                  duration={bid.biddedDuration}
                  timestamp={bid.createdTime}
                />
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
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
      .get(utilities["backend-url"] + "/users/" + this.props.userId)
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
    this.state = { refresh: 0 };
  }
  callbackFunction = childData => {
    this.setState({ refresh: childData });
  };

  render() {
    let jobid = this.props.jobid;
    return (
      <div>
        <NavBar />
        <div class="job-page">
          <Container>
            <Row>
              <Col lg="9">
                <JobDetail jobid={jobid} />
                <InterrestedFreelancer
                  jobid={jobid}
                  parentCallback={this.callbackFunction}
                  refresh={this.state.refresh}
                />
              </Col>
              <Col>
                <JobBid
                  jobid={jobid}
                  parentCallback={this.callbackFunction}
                  refresh={this.state.refresh}
                />
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
