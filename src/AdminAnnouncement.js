import React from "react";
import NavBar from "./NavBar";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import "./AdminAnnouncement.css";
import { FaBullhorn } from "react-icons/fa";
import LocalStorageService from "./LocalStorageService";

class AdminAnnouncement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDataLoad: false,
      userDatas: {},
      isUserDataLoad: false,
      header:"",
      detail:""
    };
  }

  fetchDatas = () => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + LocalStorageService.getAccessToken();
    axios.get("http://35.198.228.244:10000/users").then(res => {
      const userDatas = res.data;
      this.setState({ userDatas: userDatas, isUserDataLoad: true });
      console.log(this.state.userDatas);
    });
  };

  componentDidMount = () => {
    this.fetchDatas();
  };

  setAnnounce = () => {
    alert(this.state.header + " " + this.state.detail);
  }

  cancelAnnounce = () => {
    this.setState({header: "", detail: ""});
  }

  render() {
    return (
      <div className="main-background">
        <NavBar mode="admin" userDatas={this.state.userDatas} />
        <Container id="admin-announce-box">
          <Row>
            <Col className="background-blue text-light">
              <h2 className="mt-3 mb-3">Announcement</h2>
            </Col>
          </Row>
          <Row className="bg-light shadow pt-5 pb-5">
            <Col xs={2} className="text-center">
              <h3>Header</h3>
            </Col>
            <Col xs={4}>
              <Form.Group controlId="headerArea">
                <Form.Control as="textarea" onChange={(e)=>{this.setState({header: e.target.value})}} />
              </Form.Group>
            </Col>
          </Row>
          <Row className="bg-light shadow pt-5 pb-5">
            <Col xs={2} className="text-center">
              <h3>Detail</h3>
            </Col>
            <Col xs={6}>
              <Form.Group controlId="detailArea">
                <Form.Control as="textarea" rows="5" onChange={(e)=>{this.setState({detail: e.target.value})}} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="text-right pt-5">
              <Button className="shadow mr-5" variant="danger" onClick={()=>this.cancelAnnounce()}><h5>Cancel</h5></Button>
              <Button className="shadow" variant="success" onClick={()=>this.setAnnounce()}><h5><FaBullhorn /> Announce</h5></Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default AdminAnnouncement;
