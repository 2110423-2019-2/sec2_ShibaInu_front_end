import React from "react";
import "./JobSearchPage.css";
import NavBar from "./NavBar";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaCode, FaBtc, FaClock } from "react-icons/fa";

class JobFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div class="job-filter">
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
            <Col lg={{ offset: "3" }}>
              <Button variant="secondary" type="reset">
                Clear
              </Button>
            </Col>
            <Col>
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

class JobResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div class="job-result">
        <header>
          <Form id="no-padding">
            <Form.Row>
              <Col>
                <Form.Group id="no-margin" controlId="searchKeyword">
                  <Form.Control placeholder="Search for Job Offering" />
                </Form.Group>
              </Col>
              <Col>
                <Button variant="primary" type="submit">
                  Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </header>
        <div>
          <JobResultRow
            jobName="3d face 360 view create from any picture software"
            jobDes="We want software which can extract 3d face from any picture. The process will be automatically completed.. I need you to develop this for me. I would like this software to be developed for Windows."
          />
          <JobResultRow
            jobName="MSN SHOP 12"
            jobDes="A project that will help many people earn more profits."
          />
          <JobResultRow
            jobName="Extract data from Memory block of NFC Card and provide the code -- 2"
            jobDes="Hi we need someone with good NFC App (KOTLIN) development knowledge. We are using card with IC code SLIX(SK2S2002). We want to read the content present in the memory location of the NFC tag.

            Type of card:
            
            Nfcv Card
            NDEF formatable
            
            We tried developing an app where are filtering the intent with 3 Actions when a Card is scanned:
            1. ACTION_NDEF_DISCOVERED
            2. ACTION_TAG_DISCOVERED
            3. ACTION_TECH_DISCOVERED
            
            If the intent action is 1st one, then we are following the github link ( https://github.com/andijakl/NfcDemo),
            
            If the intent action is the 2nd one, we are checking the techList (in which we found the given carf is using NfcV & NdefFormatable), for reading that kind of tags , we are running an AsyncTask for using transreceive funcion on the tag, but we don't know the parameters/command that is required to call transreceive function, i googled it but every where the command is different and the command may be provided in card datasheet
            
            We need someone who can write the code to read the data present in the memory block of the card and give us as an output string (UTF-8).We need thr code in Kotlin and need a basic test sample app for test the code's functioning. We need the code on the urgent basis. ( removed by admins )
            
            Secrenshots of the card readed data by TAGINFO app are attached for your reference."
          />
          <JobResultRow
            jobName="required gynaecologist"
            jobDes="We require gynaecologist at our 25 beded hospital if anyone please suggest us 9782300558
            Good pkg +accommodation
            Minimum 6 month experienced candidate also can apply
            Send ur resume on whatsapp or mail..
            dheerendrakumar1991@ymail.com"
          />
        </div>
      </div>
    );
  }
}

class JobResultRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div class="job-result-row">
        <Container id="low-margin">
          <Row>
            <Col lg="0.5">
              <FaCode color="Blue" />
            </Col>
            <Col lg="9">
              <div id="job-name-and-des">
                <div>
                  <b>{this.props.jobName}</b>
                </div>
                <div id="job-des">{this.props.jobDes}</div>
              </div>
              <div>
                <div>
                  <b>Require :</b>
                </div>
                <div>
                  <b>Optional :</b>
                </div>
              </div>
            </Col>
            <Col>
              <div>
                <FaBtc /> 10000 THB
              </div>
              <div>
                <FaClock /> 10 Days
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
    this.state = {};
  }

  render() {
    return (
      <div>
        <NavBar mode=" " userDatas={" "} />
        <div class="job-search-page">
          <Container>
            <Row>
              <Col>
                <JobFilter />
              </Col>
              <Col lg="9">
                <JobResult />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default JobSearchPage;
