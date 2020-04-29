import React from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { FaClock, FaMoneyBill, FaBullhorn, FaInfoCircle } from "react-icons/fa";
import axios from "axios";
import swal from 'sweetalert';

import "./HomeFreelancer.css";
import LocalStorageService from "./LocalStorageService";
import LoadingSpinner from './utilities/LoadingSpinner';

class HomeFreelancer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDatas: "",
      jobDatas: [],
      sumMoney: 0,
      isUserDataLoad: false,
      isJobDataLoad: false,
      announce: [],
      isAnnounceLoad: false,
      interest: ["react", "react native", "express", "mysql", "nest.js"],
      showUnverifiedWarning: false,
    };
  }

  fetchDatas = async () => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + LocalStorageService.getAccessToken();
    await axios
      .get(process.env.REACT_APP_BACKEND_URL + "/payment/sum")
      .then(res => {
        this.setState({ sumMoney: -1 * Number(res.data.sum) });
      }).catch((error) => {
        if (error.response && error.response.status === 400) {
          this.setState({ sumMoney: 0 });
        }
      });
    await axios
      .get(
        process.env.REACT_APP_BACKEND_URL + "/users/" + LocalStorageService.getUserID()
      )
      .then((res) => {
        const userDatas = res.data;
        this.setState({ userDatas: userDatas });
        //console.log(this.state.userDatas);
      }).catch((error) => {
        console.error(error);
      }).finally(() => {
        this.setState({ isUserDataLoad: true });
      });
    await axios
      .get(
        process.env.REACT_APP_BACKEND_URL +
        "/jobs/recommend/" +
        LocalStorageService.getUserID()
      )
      .then((res) => {
        const jobDatas = res.data;
        this.setState({ jobDatas: jobDatas });
        //console.log(this.state.jobDatas);
      }).catch((error) => {
        console.error(error);
      }).finally(() => {
        this.setState({ isJobDataLoad: true });
      });
    await axios
      .get(process.env.REACT_APP_BACKEND_URL + "/announcement").then((res) => {
        const announce = res.data;
        this.setState({ announce: announce });
        //console.log(this.state.announce);
      }).catch((error) => {
        console.error(error);
      }).finally(() => {
        this.setState({ isAnnounceLoad: true });
      });
  };

  handleClickJobDetail(e) {
    window.location.href = "/job/" + e.target.id;
  }

  componentDidMount = () => {
    this.fetchDatas();
  };

  render() {
    if (!this.state.isUserDataLoad || !this.state.isJobDataLoad) {
      return <LoadingSpinner />;
    }
    if (!this.state.userDatas.isVerified && !this.state.showUnverifiedWarning) {
      this.setState({ showUnverifiedWarning: true });
      swal({
        title: "You haven't verify!",
        text: "Your account is not verified.\n If you wish to verify now, click 'Verify'.",
        icon: "warning",
        buttons: [true, "Verify"],
        closeOnClickOutside: false,
        closeOnEsc: false,
        dangerMode: false
      }).then((verify) => {
        if (verify) {
          window.location.href = "/profile";
        }
      });
    }

    var recentJob = this.state.jobDatas.map((job, index) => (
      <tr key={index} className="text-center">
        <td className="align-middle">{job.name}</td>
        <td className="align-middle">
          <FaMoneyBill className="job-icon" />
          {job.estimatedWage}
        </td>
        <td className="align-middle">
          <FaClock className="job-icon" />
          {job.estimatedDuration}
        </td>
        <td className="align-middle">
          <button
            type="button"
            className="btn btn-secondary btn-block"
            id={job.jobId}
            onClick={this.handleClickJobDetail.bind(this)}
          >
            Detail
          </button>
        </td>
      </tr>
    ));
    var announce;
    if (this.state.isAnnounceLoad) {
      announce = this.state.announce.reverse().map((announce) => (
        <Row>
          <Col className="bg-light shadow pt-2">
            <h5 className="announce-title">
              <FaBullhorn /> {announce.title}
            </h5>
            <p className="announce-content">
              <FaInfoCircle /> {announce.content}
            </p>
          </Col>
        </Row>
      ));
    }
    var headTable = (
      <tr className="text-center">
        <td className="align-middle">
          <h5>Name</h5>
        </td>
        <td className="align-middle">
          <h5>Wage</h5>
        </td>
        <td className="align-middle">
          <h5>Duration</h5>
        </td>
        <td className="align-middle"></td>
      </tr>
    );

    return (
      <div className="main-background">
        <Container id="homefreelancer-box">
          <Row>
            <Col className="background-blue text-light pt-2 pb-2">
              <h3>
                <FaBullhorn /> Announcement
              </h3>
            </Col>
          </Row>
          <Row id="announce-area" className="shadow">
            <Container >
              {announce}
            </Container>
          </Row>
          <Row className="mt-3">
            <Col className="bg-light shadow" xl={8} offset={1}>
              <h2 id="recommend-topic">Recommended Job</h2>
              <Table responsive>
                <thead className="background-blue text-light">
                  {headTable}
                </thead>
                <tbody>{recentJob}</tbody>
              </Table>
            </Col>
            <Col className="shadow balance-box background-blue">
              <div id="balance-topic" className="text-light">
                <p className="mb-0">Welcome Back!</p>
                <h2 className="mb-0">
                  {this.state.userDatas.firstName}{" "}
                  {this.state.userDatas.lastName}
                </h2>
              </div>
              <div className="bg-light rounded shadow">
                <Container fluid={true}>
                  <Row>
                    <Col>
                      <h3>Total {this.state.sumMoney}฿</h3>
                    </Col>
                  </Row>
                </Container>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default HomeFreelancer;
