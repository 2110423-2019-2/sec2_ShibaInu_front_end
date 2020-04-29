import React from "react";
import axios from "axios";
import { Form, Button, Col, Spinner, Container, Row } from "react-bootstrap";
import logo from "./material/Logo.png";
import "./SignInSignUp.css";
import LocalStorageService from "./LocalStorageService";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      registerData: { firstName: "", lastName: "", username: "", password: "" },
      validated: false,
      errorMessage: "",
    };
    this.handleChange.bind(this);
    this.handleSubmit.bind(this);
    this.checkPassword.bind(this);
  }

  submitLogin() {
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/auth/login", this.state.registerData)
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
        } else {
          //console.error(error);
        }
        window.location.href = "/login";
      });
  }

  checkPassword = (e) => {
    if (e.target.value === this.state.registerData.password) {
      e.target.setCustomValidity("");
    } else {
      e.target.setCustomValidity("Password not match");
    }
  };

  handleChange = (e) => {
    let tempData = this.state.registerData;
    tempData[e.target.name] = e.target.value;
    this.setState({
      registerData: tempData,
    });
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
      .post(process.env.REACT_APP_BACKEND_URL + "/users", this.state.registerData)
      .then((response) => {
        switch (response.status) {
          // Created
          case 201:
            this.submitLogin();
            break;

          // Other case
          default:
            //console.log("Status code is " + response.status);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          //console.log("Error 400");
          this.setState({ errorMessage: error.response.data.message });
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

  responseFacebook = (response) => {
    //console.log("FB LOGIN");
    //console.log(response);

    const fbData = {
      firstName: response.first_name,
      lastName: response.last_name,
      username: response.userID,
      token: response.accessToken,
    };

    this.setState({
      isLoading: true,
    });

    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/users", fbData)
      .then((response) => {
        switch (response.status) {
          // Created
          case 201:
            this.submitLogin();
            break;

          // Other case
          default:
            //console.log("Status code is " + response.status);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          //console.log("Error 400");
          this.setState({ errorMessage: error.response.data.message });
        } else {
          //console.error(error);
        }

        this.setState({
          isLoading: false,
        });
      });
  };

  clickFB() {
    this.setState({ isLoading: true });
  }

  render() {
    return (
      <div>
          <Container>
            <Row className="signIn-box">
              <Col xl={6} className="text-center mt-3" id="logo-img-box">
                <img src={logo} alt="youngstar logo" id="logo-img-sign" />
              </Col>

              <Col xl={6}>
                  <div className="form-name">Create an account</div>
                  <div className="form-container">
                    <Form
                      noValidate={true}
                      validated={this.state.validated}
                      onSubmit={this.handleSubmit}
                    >
                      <Form.Row>
                        <Form.Group as={Col} controlId="formBasicFirstname">
                          <Form.Label>First name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="First name"
                            name="firstName"
                            onChange={this.handleChange}
                            required
                          />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formBasicLastname">
                          <Form.Label>Last name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Last name"
                            name="lastName"
                            onChange={this.handleChange}
                            required
                          />
                        </Form.Group>
                      </Form.Row>

                      <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                          type="username"
                          placeholder="Username"
                          name="username"
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
                          onChange={this.handleChange}
                          maxLength={16}
                          required
                        />
                      </Form.Group>

                      <Form.Group controlId="formBasicConfirmPassword">
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Confirm password"
                          onChange={this.checkPassword}
                          maxLength={16}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide a match password.
                        </Form.Control.Feedback>
                      </Form.Group>
                      <p
                        className="unauthorized-message"
                        hidden={this.state.errorMessage === ""}
                      >
                        {this.state.errorMessage}
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
                        Sign Up
                      </Button>

                      <p>
                        Already have an account? <a href="/signin">Sign in</a>
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

export default SignUp;
