import React from "react";
import { Container, Row, Col, Table, Modal, Spinner } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";

import LocalStorageService from "./LocalStorageService";
import "./AdminHome.css";
import firebase from './firebase';

class AdminVerify extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDataLoad: false,
      userDatas: {},
      isUserDataLoad: false,
      showModal: false,
      modalData: { userId: "", mode: "" },
    };
  }

  fetchDatas = () => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + LocalStorageService.getAccessToken();
    axios.get(process.env.REACT_APP_BACKEND_URL + "/users").then((res) => {
      const userDatas = res.data;
      this.setState({ userDatas: userDatas, isUserDataLoad: true });
      //console.log(this.state.userDatas);
    });
  };

  componentDidMount = () => {
    this.fetchDatas();
  };

  addNoti = (userId, topic, detail, link) => {
    firebase
      .firestore()
      .collection("notification")
      .doc("notification")
      .collection(String(userId))
      .add({
        topic: topic,
        detail: detail,
        link: link,
        createtime: firebase.firestore.FieldValue.serverTimestamp(),
        read: false,
        mode: "",
      })
      .catch((error) => {
        console.error("Error adding noti:", error);
      });
  }

  disapproveHandler = (id) => {
    swal({
      title: "Are you sure to approve?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willApprove) => {
      if (willApprove) {
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + LocalStorageService.getAccessToken();
        axios
          .patch(process.env.REACT_APP_BACKEND_URL + "/users/verify/verify", {
            user: id,
            approve: false,
          })
          .then((response) => {
            switch (response.status) {
              // Created
              case 201:
                //console.log("already push");
                this.addNoti(id, "Verification", "Your user verification is rejected.", "/profile");
                break;

              // Other case
              default:
              //console.log("Status code is " + response.status);
            }
          });
        swal("Approved success!", {
          icon: "success",
        });
      }
    });
  };

  approveHandler = (id) => {
    swal({
      title: "Are you sure to approve?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willApprove) => {
      if (willApprove) {
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + LocalStorageService.getAccessToken();
        axios
          .patch(process.env.REACT_APP_BACKEND_URL + "/users/verify/verify", {
            user: id,
            approve: true,
          })
          .then((response) => {
            switch (response.status) {
              // Created
              case 201:
                //console.log("already push");
                this.addNoti(id, "Verification", "Your user verification is approved.", "/profile");
                break;

              // Other case
              default:
              //console.log("Status code is " + response.status);
            }
          });
        swal("Approved success!", {
          icon: "success",
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
        <td>
          <h5>National ID</h5>
        </td>
        <td>
          <h5>Selfie</h5>
        </td>
        <td>National ID Card</td>
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

  detailTable = () => {
    return this.state.userDatas
      .filter((user) => user.isVerified === false)
      .map((user, index) => (
        <tr key={index} className="text-center">
          <td className="align-middle">
            {user.firstName} {user.lastName}
          </td>
          <td className="align-middle">{user.identificationNumber}</td>
          <td className="align-middle">
            {user.identificationCardWithFacePic !== null ? (
              <h5
                id="modal-view-link"
                onClick={() => this.setShowModalData(user.userId, "selfie")}
              >
                view
              </h5>
            ) : null}
          </td>
          <td className="align-middle">
            {user.identificationCardPic !== null ? (
              <h5
                id="modal-view-link"
                onClick={() => this.setShowModalData(user.userId, "idcard")}
              >
                view
              </h5>
            ) : null}
          </td>
          <td className="align-middle">
            <button
              type="button"
              className="btn btn-secondary btn-block"
              onClick={() => this.disapproveHandler(user.userId)}
            >
              Disapprove
            </button>
          </td>
          <td className="align-middle">
            <button
              type="button"
              className="btn btn-success btn-block"
              onClick={() => this.approveHandler(user.userId)}
            >
              Approve
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
        <Container id="adminHome-box">
          <Row className="bg-white shadow">
            <Col>
              <h2 id="recentjob-topic">User Verificaion</h2>
            </Col>
          </Row>
          <Row className="bg-white shadow">
            <Col>
              <Table responsive hover striped>
                <thead>{this.headTable()}</thead>
                <tbody>{this.detailTable()}</tbody>
              </Table>
              <ImageModal
                open={this.state.showModal}
                modalData={this.state.modalData}
                callback={this.showHideModal}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

class ImageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      modalData: { userId: "", mode: "" },
      image: "",
      isFetching: true,
      modalTitle: "",
    };
  }
  fetchIDCard = () => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + LocalStorageService.getAccessToken();
    axios
      .get(
        process.env.REACT_APP_BACKEND_URL +
        "/users/IDCard/" +
        this.state.modalData.userId,
        { responseType: "blob" }
      )
      .then((res) => {
        let blob = URL.createObjectURL(res.data);
        //console.log(blob, "1");
        this.setState({
          image: blob,
        });
      })
      .catch((err) => {
        //console.error(err);
      })
      .finally(() => {
        this.setState({
          isFetching: false,
        });
      });
  };
  fetchSelfieImage = () => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + LocalStorageService.getAccessToken();
    axios
      .get(
        process.env.REACT_APP_BACKEND_URL +
        "/users/IDCardWithFace/" +
        this.state.modalData.userId,
        { responseType: "blob" }
      )
      .then((res) => {
        let blob = URL.createObjectURL(res.data);
        this.setState({
          image: blob,
        });
      })
      .catch((err) => {
        //console.error(err);
      })
      .finally(() => {
        this.setState({
          isFetching: false,
        });
      });
  };
  handleClose = () => {
    this.state.closeFunction();
    URL.revokeObjectURL(this.state.image);
  };
  onEnter = () => {
    this.setState({ image: "", isFetching: true });
  };
  componentDidUpdate = async (prevProps) => {
    if (prevProps !== this.props) {
      await this.setState({
        show: this.props.open,
        modalData: this.props.modalData,
        closeFunction: this.props.callback,
      });
      if (
        this.state.modalData.mode === "idcard" &&
        this.state.show &&
        this.state.image === ""
      ) {
        this.setState({ modalTitle: "National ID Card Image" });
        await this.fetchIDCard();
      } else if (
        this.state.modalData.mode === "selfie" &&
        this.state.show &&
        this.state.image === ""
      ) {
        this.setState({ modalTitle: "Selfie Image" });
        await this.fetchSelfieImage();
      }
    }
  };
  renderLoading() {
    return (
      <Spinner animation="border" role="status" className="loading">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }
  render() {
    if (this.state.userId === "") {
      return null;
    }
    return (
      <>
        <Modal
          dialogClassName="image-modal"
          show={this.props.open}
          onHide={this.handleClose}
          onEnter={this.onEnter}
        >
          <Modal.Header className="modalHead" closeButton>
            <Modal.Title>{this.state.modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              {this.state.isFetching ? (
                this.renderLoading()
              ) : (
                  <a href={this.state.image}>
                    <img
                      src={this.state.image}
                      alt={"image-" + this.state.mode}
                    />
                  </a>
                )}
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="btn btn-success btn-block"
              onClick={this.handleClose}
            >
              close
            </button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
export default AdminVerify;
