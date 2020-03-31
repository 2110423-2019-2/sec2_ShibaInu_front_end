import React from "react";
import NavBar from "./NavBar";
import './ChatSystem.css';
import { Container, Row, Col, Button } from "react-bootstrap";
import LocalStorageService from "./LocalStorageService";
import firebase from './firebase';

class ChatSystem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRoom: "2-3",
      msg: "test from 3 to 2",
      userID: "3",
    };
  }

  componentDidMount = () => {
    this.loadMsg();
  }

  sendMsg = () => {
    firebase.firestore().collection('message').doc(this.state.selectedRoom).collection(this.state.selectedRoom).add({
      msg: this.state.msg,
      sender: this.state.userID,
      timesent: firebase.firestore.FieldValue.serverTimestamp()
    }).catch(function(error) {
      console.error('Error writing new message to database', error);
    });
  }
  /*
  initChatRoom = () => {
    firebase.firestore().collection('message').doc(this.state.selectedRoom).set("Hello");
  }*/

  loadMsg = () => {
    // Create the query to load the last 12 messages and listen for new ones.
    var query = firebase.firestore()
                  .collection('message')
                  .doc(this.state.selectedRoom)
                  .collection(this.state.selectedRoom)
                  .orderBy('timesent', 'desc')
  
  // Start listening to the query.
  query.onSnapshot(function(snapshot) {
    snapshot.docChanges().forEach(function(change) {
      var message = change.doc.data();
      console.log(message.sender, message.msg);
    });
  });
  } 

  chatRoom = () => {
    return (
      <Row className="pl-3 pt-3">
        <h4>Room1</h4>
      </Row>
    );
  }

  render() {
    return (
      <div className="main-background">
        <NavBar />
        <Container id="chatsystem-box">
          <Row>
            <Col xs={3} className="bg-white shadow">
              <Row className="background-blue text-light pl-3 pt-3">
                <h2>#Chat Room</h2>
              </Row>
              {this.chatRoom()}
            </Col>
            <Col xs={8} className="bg-white shadow ml-3 text-center">
              <h2>Chat message</h2>
              <Button variant="dark" onClick={()=>this.sendMsg()}>Send Message</Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ChatSystem;
