import React,{ useRef } from "react";
import NavBar from "./NavBar";
import "./ChatSystem.css";
import {
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
  Badge
} from "react-bootstrap";
import LocalStorageService from "./LocalStorageService";
import firebase from "./firebase";

class ChatSystem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRoom: LocalStorageService.getChatroom(),
      chatwith: LocalStorageService.getChatName(),
      msg: "",
      userID: LocalStorageService.getUserID(),
      chatrooms: [],
      chatmsgs: [],
      firstLoadMsg: true,
      ref: React.createRef()
    };
  }

  componentDidMount = () => {
    this.loadChatRoom();
    if (this.state.selectedRoom !== "") {
      this.loadMsg();
    }
  };

  scrollToBottom = () => {
    this.state.ref.current.scrollIntoView({ behavior: 'smooth' });
  }

  /*updateTimeChatRoom = () => {
    firebase.firestore().collection('message').doc('chatroom').collection(this.state.userID).doc("2-3").update({
      lasttime: firebase.firestore.FieldValue.serverTimestamp(),
    });
  }*/

  loadChatRoom = () => {
    var query = firebase
      .firestore()
      .collection("message")
      .doc("chatroom")
      .collection(this.state.userID)
      .orderBy("lasttime", "desc");
    // Start listening to the query.
    query.onSnapshot(snapshot => {
      var chatrooms = [];
      snapshot.docChanges().forEach(change => {
        var room = change.doc.data();
        chatrooms.push({
          id: change.doc.id,
          chatwith: room.name,
          lasttime: room.lasttime
        });
      });
      this.setState({ chatrooms: chatrooms });
    });
  };

  sendMsg = () => {
    firebase
      .firestore()
      .collection("message")
      .doc("message")
      .collection(this.state.selectedRoom)
      .add({
        msg: this.state.msg,
        sender: this.state.userID,
        timesent: firebase.firestore.FieldValue.serverTimestamp()
      })
      .catch(function(error) {
        console.error("Error writing new message to database", error);
      });
      this.setState({msg: ""});
  };

  loadMsg = () => {
    // Create the query to load the last 12 messages and listen for new ones.
    var query = firebase
      .firestore()
      .collection("message")
      .doc("message")
      .collection(this.state.selectedRoom)
      .orderBy("timesent", "asc");

    // Start listening to the query.
    query.onSnapshot(snapshot => {
      var chatmsgs = this.state.chatmsgs;
      if(this.state.firstLoadMsg){
        chatmsgs = [];
      }
      snapshot.docChanges().forEach(change => {
        var message = change.doc.data();
        var pos = "text-left w-100";
        if (message.sender == this.state.userID) {
          var pos = "text-right w-100";
        }
        if(message.timesent !== null){
          chatmsgs.push({
            sender: message.sender,
            msg: message.msg,
            pos: pos,
          });
        }
      });
      this.setState({ chatmsgs: chatmsgs, firstLoadMsg: false},()=>{
        console.log(this.state.chatmsgs);
        this.scrollToBottom();
      });
    });
  };

  chatRoom = () => {
    return this.state.chatrooms.map(chatroom => (
      <Row key={chatroom.id}>
        <Button
          variant="link"
          className="w-100 text-left"
          id="chatroom"
          onClick={() => {
            LocalStorageService.setChatroom(chatroom.id);
            LocalStorageService.setChatName(chatroom.chatwith);
            this.setState(
              {
                selectedRoom: chatroom.id,
                chatwith: chatroom.chatwith,
                firstLoadMsg: true
              },
              () => {
                this.loadMsg();
              }
            );
            console.log(this.state.selectedRoom);
          }}
        >
          <h4>{chatroom.chatwith}</h4>
        </Button>
      </Row>
    ));
  };

  chatMsg = () => {
    return this.state.chatmsgs.map(chatmsg => (
      <div key={chatmsg.id} className="ml-3 mt-3 mr-4 ">
        <div className={chatmsg.pos}>
          <Badge pill variant="info" className="pl-3 pr-3 pt-1 pb-1">
            <h5>{chatmsg.msg}</h5>
          </Badge>
        </div>
      </div>
    ));
  };

  sendMsgDisp = () => {
    return (
      <div>
        <div id="msgarea">{this.chatMsg()}<div ref={this.state.ref} /></div>
        <div id="sendmsg">
          <InputGroup className="mb-3 mt-3 ml-1">
            <FormControl
              placeholder="Text Here"
              aria-label="Text Here"
              aria-describedby="basic-addon2"
              onChange={e => {
                this.setState({ msg: e.target.value });
              }}
              value={this.state.msg}
            />
            <InputGroup.Append>
              <Button variant="dark" onClick={() => this.sendMsg()}>
                Send
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </div>
      </div>
    );
  };

  chatWith = () => {
    return <h2>{"Chat with " + this.state.chatwith}</h2>;
  };
  /*
  makeData = () => {
    /*const time = firebase.firestore.FieldValue.serverTimestamp();
    firebase.firestore().collection('message').doc('chatroom').collection('2').doc('2-3').set({
      name: 'inuyama',
      lasttime: time
    });
    firebase.firestore().collection('message').doc('chatroom').collection('3').doc('2-3').set({
      name: 'ITTHITHEES',
      lasttime: time
    });
    firebase
      .firestore()
      .collection("message")
      .doc("message")
      .collection("2-3")
      .add({
        msg: "Hello, My name is Inuyama",
        sender: "3",
        timesent: firebase.firestore.FieldValue.serverTimestamp()
      })
      .catch(function(error) {
        console.error("Error writing new message to database", error);
      });
  };*/

  render() {
    return (
      <div className="main-background h-100">
        <NavBar />
        <Container id="chatsystem-box">
          <Row className="h-100">
            <Col xs={4} className="bg-white shadow">
              <Row className="background-blue text-light pl-3 pt-3">
                <h2>#Chat Room</h2>
              </Row>
              {this.chatRoom()}
            </Col>
            <Col xs={7} className="bg-white shadow ml-3 text-center">
              <Row className="background-blue text-light pt-3 pl-3">
                {this.chatWith()}
              </Row>
              {this.sendMsgDisp()}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ChatSystem;
