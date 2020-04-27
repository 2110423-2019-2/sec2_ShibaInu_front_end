import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import "./AdminAnnouncement.css";
import { FaBullhorn } from "react-icons/fa";
import LocalStorageService from "./LocalStorageService";
import swal from "sweetalert";
import { Redirect } from "react-router-dom";
class AdminAnnouncement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDataLoad: false,
      userDatas: {},
      isUserDataLoad: false,
      title: "",
      content: "",
      directToHome: false,
      userID: LocalStorageService.getUserID()
    };
  }

  pushAnnounce = () => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + LocalStorageService.getAccessToken();
    axios
      .post(process.env.REACT_APP_BACKEND_URL+ "/announcement", {
        title: this.state.title,
        content: this.state.content,
        user: this.state.userID
      })
      .then(response => {
        switch (response.status) {
          // Created
          case 201:
            //console.log("already push");
            break;

          // Other case
          default:
            //console.log("Status code is " + response.status);
        }
      });
  };

  setAnnounce = () => {
    swal({
      title: "Are you sure to announce?",
      text: "Everybody will see this message!",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willAnnounce => {
      if (willAnnounce) {
        swal("Announce!", {
          icon: "success"
        });
        this.pushAnnounce();
        this.setState({ directToHome: true });
      }
    });
  };

  cancelAnnounce = () => {
    swal({
      title: "Are you sure to delete draft?",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        swal("Deleted draft!", {
          icon: "success"
        });
        this.setState({ title: "", content: "" });
      }
    });
  };

  render() {
    if (this.state.directToHome) {
      return <Redirect to="/admin/home" />;
    }
    return (
      <div className="main-background">
        <Container id="admin-announce-box">
          <Row>
            <Col className="background-blue text-light">
              <h3 className="mt-3 mb-3">Announcement</h3>
            </Col>
          </Row>
          <Row className="bg-light shadow pt-5 pb-5">
            <Col xs={2} className="text-center">
              <h5>title</h5>
            </Col>
            <Col xs={4}>
              <Form.Group controlId="titleArea">
                <Form.Control
                  as="textarea"
                  onChange={e => {
                    this.setState({ title: e.target.value });
                  }}
                  value={this.state.title}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="bg-light shadow pt-5 pb-5">
            <Col xs={2} className="text-center">
              <h5>content</h5>
            </Col>
            <Col xs={6}>
              <Form.Group controlId="contentArea">
                <Form.Control
                  as="textarea"
                  rows="5"
                  onChange={e => {
                    this.setState({ content: e.target.value });
                  }}
                  value={this.state.content}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="text-right pt-5">
              <Button
                className="shadow mr-5"
                variant="danger"
                onClick={() => this.cancelAnnounce()}
              >
                <h5>Cancel</h5>
              </Button>
              <Button
                className="shadow"
                variant="success"
                onClick={() => this.setAnnounce()}
              >
                <h5>
                  <FaBullhorn /> Announce
                </h5>
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default AdminAnnouncement;
