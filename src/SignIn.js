import React from "react";
import axios from "axios";
import { Button, Form, Spinner, Container, Row, Col } from "react-bootstrap";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import swal from 'sweetalert';

import logo from "./material/Logo.png";
import "./SignInSignUp.css";
import LocalStorageService from "./LocalStorageService";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      loginData: { username: "", password: "" },
      validated: false,
      unauthorized: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    let tempData = this.state.loginData;
    tempData[e.target.name] = e.target.value;
    this.setState({
      loginData: tempData,
    });
    this.setState({ unauthorized: false });
  };

  handleSubmit = (e) => {
    this.setState({ validated: true });
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      return;
    }

    this.setState({
      isLoading: true,
    });

    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/auth/login", this.state.loginData)
      .then((response) => {
        switch (response.status) {
          // Created
          case 201:
            LocalStorageService.setToken(response.data.access_token || "");
            LocalStorageService.setUserID(response.data.userId || "");
            response.data.isAdmin
              ? LocalStorageService.setUserMode("admin")
              : LocalStorageService.setUserMode("client");
            //console.log("Logged in. Redirecting...");
            response.data.isAdmin
              ? (window.location.href = "/admin/home")
              : (window.location.href = "/client/home");
            break;

          // Other case
          default:
            //console.log("Status code is " + response.status);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          //console.log("Unauthorization");
          this.setState({ unauthorized: true });
        } else if (error.response && error.response.status === 403) {
          //console.log("Banned user");
          swal("You are banned!", error.response.data.message, "error");
        } else {
          //console.error(error);
        }

        this.setState({
          isLoading: false,
        });
      });
  };

  responseFacebook = (fb_response) => {
    //console.log("FB LOGIN");
    //console.log(fb_response);

    axios.defaults.headers.common["Authorization"] =
      "Bearer " + fb_response.accessToken;
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/auth/login-fb", fb_response)
      .then((response) => {
        switch (response.status) {
          // Created
          case 201:
            LocalStorageService.setToken(response.data.access_token || "");
            LocalStorageService.setUserID(response.data.userId || "");
            response.data.isAdmin
              ? LocalStorageService.setUserMode("admin")
              : LocalStorageService.setUserMode("client");
            //console.log("Logged in. Redirecting...");
            response.data.isAdmin
              ? (window.location.href = "/admin/home")
              : (window.location.href = "/client/home");
            break;

          // Other case
          default:
            //console.log("Status code is " + response.status);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          //console.log("Unauthorization");
          this.setState({ unauthorized: true });
        } else if (error.response && error.response.status === 403) {
          //console.log("Banned user");
          swal("You are banned!", error.response.data.message, "error");
        } else {
          //console.error(error);
        }
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  };

  render() {
    return (
      <div>
        <Container>
          <Row className="signIn-box">
            <Col xl={6} className="text-center mt-3" id="logo-img-box">
              <img src={logo} alt="youngstar logo" id="logo-img-sign" />
            </Col>
            <Col xl={6}>
              <div className="form-name">Sign In</div>
              <div className="form-container">
                <Form
                  noValidate={true}
                  validated={this.state.validated}
                  onSubmit={this.handleSubmit}
                >
                  <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="username"
                      placeholder="Username"
                      name="username"
                      value={this.state.loginData.username}
                      onChange={this.handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={this.state.loginData.password}
                      onChange={this.handleChange}
                      required
                    />
                  </Form.Group>
                  <p
                    className="unauthorized-message"
                    hidden={!this.state.unauthorized}
                  >
                    Wrong username or password.
                    </p>
                  <Button
                    variant="success"
                    type="submit"
                    disabled={this.state.isLoading}
                  >
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      hidden={!this.state.isLoading}
                    />{" "}
                      Sign In
                    </Button>

                  <div className="social-seperator-container">
                    <span className="social-seperator">or</span>
                  </div>

                  <Form.Group className="socialmedia-login-container">
                    <FacebookLogin
                      appId="3019159754810357"
                      autoLoad={false}
                      fields="first_name,last_name,email,picture"
                      callback={this.responseFacebook}
                      render={(renderProps) => (
                        <Button
                          variant="primary"
                          onClick={renderProps.onClick}
                          disabled={this.state.isLoading}
                        >
                          {!this.state.isLoading ? (
                            ""
                          ) : (
                              <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                              />
                            )}{" "}
                            Login with Facebook
                        </Button>
                      )}
                    />
                  </Form.Group>
                  <p>
                    Don't have an account?{" "}
                    <a href="/signup">Create account</a>
                  </p>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default SignIn;
