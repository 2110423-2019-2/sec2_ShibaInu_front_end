import React from "react";
import "./AdminBan.css";
import { Container, Row, Col, Table, Modal, Spinner } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";
import LocalStorageService from "./LocalStorageService";
var utilities = require("./Utilities.json");
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
    };
  }

  fetchDatas = () => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + LocalStorageService.getAccessToken();
    axios.get(utilities["backend-url"] + "/users").then((res) => {
      const userDatas = res.data;
      this.setState({ userDatas: userDatas, isUserDataLoad: true });
      console.log(this.state.userDatas);
    });
  };

  componentDidMount = () => {
    this.fetchDatas();
  };

  banHandler = (id, isBanned) => {
    var title = "Are you sure to " + (isBanned ? "Unban" : "Ban") + "?";
    swal({
      title: title,
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
      if (val!=="") {
        console.log(val);
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + LocalStorageService.getAccessToken();
        axios
          .patch(utilities["backend-url"] + "/users/ban", {
            user: id,
            isBanned: (isBanned === false),
            banReason: val,
          })
          .then((response) => {
            switch (response.status) {
              // Created
              case 200:
                console.log("already push");
                var { userDatas } = this.state;
                for (let i = 0; i < userDatas.length; i++) {
                  if (userDatas[i].userId === id) {
                    userDatas[i].isBanned = (isBanned === false);
                    break;
                  }
                }
                this.setState({ userDatas: userDatas });

                break;

              // Other case
              default:
                console.log("Status code is " + response.status);
            }
          });
        swal("Success!", {
          icon: "success",
        });
      } else {
        swal("UnSuccess!", {
            icon: "error",
          });
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

  detailTable = () => {
    return this.state.userDatas
      .filter((user) => user.isVerified === false)
      .map((user, index) => (
        <tr key={index} className="text-center">
          <td className="align-middle">
            {user.firstName} {user.lastName}
          </td>
          <td className="align-middle w-25">
            <button
              type="button"
              className="btn btn-danger btn-block"
              onClick={() => this.banHandler(user.userId, user.isBanned)}
            >
              {user.isBanned === true ? "Unban" : "Ban"}
            </button>
          </td>
        </tr>
      ));
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
          <Row className="bg-white shadow">
            <Col>
              <Table responsive>
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
