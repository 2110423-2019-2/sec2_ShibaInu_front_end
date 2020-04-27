import React from "react";
import "./AdminBan.css";
import { Container, Row, Col, Table, Nav } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";
import LocalStorageService from "./LocalStorageService";
class AdminBan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDataLoad: false,
      userDatas: {},
      isUserDataLoad: false,
      showModal: false,
      modalData: { userId: "", mode: "" },
      banReason: "",
      status: {
        ALL: "all",
        Normal: false,
        Banned: true,
      },
      statusFilter: "all",
    };
  }

  fetchDatas = () => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + LocalStorageService.getAccessToken();
    axios.get(process.env.REACT_APP_BACKEND_URL + "/users").then((res) => {
      const resUserDatas = res.data;
      var userDatas = [];
      for (let i = 0; i < resUserDatas.length; i++) {
        if (resUserDatas[i].isAdmin === false) {
          userDatas.push(resUserDatas[i]);
        }
      }
      this.setState({ userDatas: userDatas, isUserDataLoad: true });
      //console.log(this.state.userDatas);
    });
  };

  componentDidMount = () => {
    this.fetchDatas();
  };

  banHandler = (id, isBanned) => {
    var title = "Are you sure to " + (isBanned ? "Unban" : "Ban") + "?";
    swal({
      title: title,
      text: "why?",
      icon: "warning",
      content: {
        element: "input",
        attributes: {
          placeholder: "Type reason",
        },
      },
      buttons: true,
      dangerMode: true,
    }).then((val) => {
      if (val) {
        if (val === "") {
          swal("You need to write the reason!", {
            icon: "error",
          })
        }
        else {
          //console.log(val);
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + LocalStorageService.getAccessToken();
          axios
            .patch(process.env.REACT_APP_BACKEND_URL + "/users/ban", {
              user: id,
              isBanned: isBanned === false,
              banReason: val,
            })
            .then((response) => {
              switch (response.status) {
                // Created
                case 200:
                  //console.log("already push");
                  var { userDatas } = this.state;
                  for (let i = 0; i < userDatas.length; i++) {
                    if (userDatas[i].userId === id) {
                      userDatas[i].isBanned = isBanned === false;
                      break;
                    }
                  }
                  this.setState({ userDatas: userDatas });

                  break;

                // Other case
                default:
                  //console.log("Status code is " + response.status);
              }
            });
          swal("Success!", {
            icon: "success",
          });
        }
      }
    });
  };

  headTable = () => {
    return (
      <tr className="text-center background-blue text-light">
        <td>
          <h5>Name</h5>
        </td>
        <td></td>
        <td></td>
      </tr>
    );
  };

  setShowModalData = async (userId, mode) => {
    await this.setState({
      modalData: { userId: userId, mode: mode },
    });
    this.showHideModal(true);
  };
  showHideModal = (show = false) => {
    this.setState({
      showModal: show,
    });
    return show;
  };

  viewProfile = (userId) => {
    window.location.href = "/profile/" + userId;
  };

  detailTable = () => {
    if (this.state.statusFilter === this.state.status.ALL) {
      return this.state.userDatas.map((user, index) => (
        <tr key={index} className="text-center">
          <td className="align-middle">
            {user.firstName} {user.lastName}
          </td>
          <td className="align-middle admin-viewbtn">
            <button
              type="button"
              className="btn btn-secondary btn-block"
              onClick={() => this.viewProfile(user.userId)}
            >
              View Profile
            </button>
          </td>
          <td className="align-middle admin-banbtn">
            <button
              type="button"
              className={user.isBanned === true ? "btn btn-warning btn-block" : "btn btn-danger btn-block"}
              onClick={() => this.banHandler(user.userId, user.isBanned)}
            >
              {user.isBanned === true ? "Unban" : "Ban"}
            </button>
          </td>
        </tr>
      ));
    } else {
      return this.state.userDatas
        .filter((user) => user.isBanned === this.state.statusFilter)
        .map((user, index) => (
          <tr key={index} className="text-center">
            <td className="align-middle">
              {user.firstName} {user.lastName}
            </td>
            <td className="align-middle admin-viewbtn">
              <button
                type="button"
                className="btn btn-secondary btn-block"
                onClick={() => this.viewProfile(user.userId)}
              >
                View Profile
              </button>
            </td>
            <td className="align-middle admin-banbtn">
              <button
                type="button"
                className={user.isBanned === true ? "btn btn-warning btn-block" : "btn btn-danger btn-block"}
                onClick={() => this.banHandler(user.userId, user.isBanned)}
              >
                {user.isBanned === true ? "Unban" : "Ban"}
              </button>
            </td>
          </tr>
        ));
    }
  };

  statusHandler = (event, status) => {
    this.setState({ statusFilter: status });
  };

  render() {
    if (!this.state.isUserDataLoad) {
      return null;
    }
    return (
      <div className="main-background">
        <Container id="adminBan-box">
          <Row className="bg-white shadow">
            <Col>
              <h2 id="recentjob-topic">Ban User</h2>
            </Col>
          </Row>
          <Row className="bg-light shadow">
            <Col lg={6} md={6.5}>
              <Nav variant="tabs" defaultActiveKey="link-1" id="joblist-table">
                <Nav.Item>
                  <Nav.Link
                    eventKey="link-1"
                    onClick={(e) =>
                      this.statusHandler(e, this.state.status.ALL)
                    }
                  >
                    All
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="link-2"
                    onClick={(e) =>
                      this.statusHandler(e, this.state.status.Normal)
                    }
                  >
                    Normal
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="link-3"
                    onClick={(e) =>
                      this.statusHandler(e, this.state.status.Banned)
                    }
                  >
                    Banned
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
          </Row>
          <Row className="bg-white shadow">
            <Col>
              <Table responsive hover striped>
                <thead>{this.headTable()}</thead>
                <tbody>{this.detailTable()}</tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default AdminBan;
