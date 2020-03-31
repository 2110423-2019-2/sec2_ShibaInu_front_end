import React from "react";
import NavBar from "./NavBar";
import './ChatSystem.css';
import { Container, Row, Col, Button } from "react-bootstrap";
import LocalStorageService from "./LocalStorageService";
import firebase from './firebase';
import axios from 'axios';

class ChatSystem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRoom: LocalStorageService.getChatroom(),
      msg: "Hello",
      userID: LocalStorageService.getUserID(),
      chatrooms: [],
      chatmsgs: [],
    };
  }

  componentDidMount = () => {
    this.loadChatRoom();
    if(this.state.selectedRoom !== ""){
      this.loadMsg();
    }
  }

  /*updateTimeChatRoom = () => {
    firebase.firestore().collection('message').doc('chatroom').collection(this.state.userID).doc("2-3").update({
      lasttime: firebase.firestore.FieldValue.serverTimestamp(),
    });
  }*/
  
  loadChatRoom = () => {
    var query = firebase.firestore()
                  .collection('message')
                  .doc('chatroom')
                  .collection(this.state.userID)
                  .orderBy('lasttime', 'desc')
  // Start listening to the query.
    query.onSnapshot((snapshot) => {
      var chatrooms = []
      snapshot.docChanges().forEach((change) => {
        var room = change.doc.data();
        chatrooms.push({id: change.doc.id, chatwith: room.name, lasttime: room.lasttime});
      });
      this.setState({chatrooms: chatrooms});
    });
  }

  sendMsg = () => {
    firebase.firestore().collection('message').doc('message').collection(this.state.selectedRoom).add({
      msg: this.state.msg,
      sender: this.state.userID,
      timesent: firebase.firestore.FieldValue.serverTimestamp()
    }).catch(function(error) {
      console.error('Error writing new message to database', error);
    });
  }

  loadMsg = () => {
    // Create the query to load the last 12 messages and listen for new ones.
    var query = firebase.firestore()
                  .collection('message')
                  .doc('message')
                  .collection(this.state.selectedRoom)
                  .orderBy('timesent', 'desc')
  
  // Start listening to the query.
  query.onSnapshot((snapshot) => {
    var chatmsgs = [];
    snapshot.docChanges().forEach((change) => {
      var message = change.doc.data();
      chatmsgs.push({sender: message.sender,msg: message.msg,timesent: message.timesent});
    });
  });
  } 

  chatRoom = () => {
    return this.state.chatrooms.map((chatroom)=>(
      <Row key={chatroom.id} onClick={(chatroom)=>{
        LocalStorageService.setChatroom(chatroom.id);
        this.setState({selectedRoom: chatroom.id});
        this.loadMsg();
      }}>
        <h2>{chatroom.chatwith}</h2>
      </Row>
    ));
  }

  chatMsg = () => {
    return this.state.chatmsgs.map((chatmsg)=>(
      <Row key={chatmsg.id}>
        <h5>{chatmsg.sender}</h5>
        <h5>{chatmsg.msg}</h5>
        <h5>{chatmsg.timesent}</h5>
      </Row>
    ));
  }

  render() {
    return (
      <div className="main-background">
        <NavBar />
        <Container id="chatsystem-box">
          <Row className="h-100">
            <Col xs={3} className="bg-white shadow">
              <Row className="background-blue text-light pl-3 pt-3">
                <h2>#Chat Room</h2>
              </Row>
              {this.chatRoom()}
            </Col>
            <Col xs={8} className="bg-white shadow ml-3 text-center">
              <h2>Chat message</h2>
              {this.chatMsg()}
              <Button variant="dark" onClick={()=>this.sendMsg()}>Send Message</Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ChatSystem;
