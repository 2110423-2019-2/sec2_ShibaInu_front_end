import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import swal from "sweetalert";
import axios from "axios";

import LocalStorageService from "./LocalStorageService";

class SettingPage extends React.Component {
  state = {
    changePassword: {
      currentPass: "",
      newPass: "",
    },
  };

  handleChangePassword = (e) => {
    let passwordData = this.state.changePassword;
    passwordData[e.target.name] = e.target.value;
    this.setState({
      changePassword: passwordData,
    });
  };

  handleSaveChangePassword = () => {
    if (
      this.state.changePassword.currentPass.length < 4 ||
      this.state.changePassword.newPass.length < 4
    ) {
      swal("Error!", "Password must be at least 4 digits.", "error");
      return;
    }

    swal({
      title: "Warning!",
      text: "Are you sure you want to change your password?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((confirm) => {
      if (!confirm) return;

      axios.defaults.headers.common["Authorization"] =
        "Bearer " + LocalStorageService.getAccessToken();

      axios
        .patch(process.env.REACT_APP_BACKEND_URL + "/users/change-password", {
          oldpassword: this.state.changePassword.currentPass,
          newpassword: this.state.changePassword.newPass,
        })
        .then((res) => {
          if (res.status === 200) {
            swal("Success!", "Your password has changed.", "success").then(
              () => {
                window.location.reload();
              }
            );
          }
        })
        .catch((err) => {
          //console.error(err);
          if (err.response && err.response.status === 400) {
            swal("Error!", "Your current password is incorrect.", "error");
          } else if (err.response && err.response.status === 403) {
            swal("Error!", "You logged in with facebook so you do not have password.", "error");
          } else {
            console.error(err);
          }
        });
    });
  };

  render() {
    return (
      <Container id="homeclient-box">
        <Container className="bg-light shadow">
          <Row>
            <Col>
              <h2 id="recentjob-topic">Setting</h2>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>
              <h4 id="recentjob-topic">Change Password</h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form>
                <Row>
                  <Col>
                    <Form.Group controlId="formBasicCurrentPassword">
                      <Form.Label>Current Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter your current password"
                        name="currentPass"
                        onChange={this.handleChangePassword}
                        value={this.state.changePassword.currentPass}
                        maxLength={16}
                        onEnter
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formBasicNewPassword">
                      <Form.Label>New Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter your new password"
                        name="newPass"
                        onChange={this.handleChangePassword}
                        value={this.state.changePassword.newPass}
                        maxLength={16}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col style={{ "margin-bottom": "10px" }}>
              <Button
                onClick={this.handleSaveChangePassword}
                disabled={
                  !this.state.changePassword.currentPass ||
                  !this.state.changePassword.newPass
                }
              >
                Save
              </Button>
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}

export default SettingPage;
