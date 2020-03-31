import React from "react";
import NavBar from "./NavBar";
import './ChatSystem.css';
import { Container, Row, Col, Table } from "react-bootstrap";
import axios from "axios";
import LocalStorageService from "./LocalStorageService";
var utilities = require('./Utilities.json');
class ChatSystem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
      <div className="main-background">
        <NavBar />
        <Container>
          <Row>
            <Col>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ChatSystem;
