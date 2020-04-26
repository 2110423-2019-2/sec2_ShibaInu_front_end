import React from "react";
import "./ChatSystem.css";
import {
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
  Badge,
  Spinner,
} from "react-bootstrap";
import LocalStorageService from "./LocalStorageService";
import firebase from "./firebase";
import { FaCircle } from "react-icons/fa";

class ChatSystem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRoom: LocalStorageService.getChatroom(),
      chatwith: LocalStorageService.getChatWithName(),
      chatwithId: LocalStorageService.getChatWithId(),
      msg: "",
      userID: LocalStorageService.getUserID(),
      chatrooms: [],
      chatmsgs: [],
      firstLoadMsg: true,
      firstLoadChatroom: true,
      ref: React.createRef(),
      loadChatroomFinished: false,
      loadChatmsgFinished: false,
    };
  }

  componentDidMount = () => {
    this.loadChatRoom();
    if (this.state.selectedRoom !== "") {
      this.loadMsg();
    }
  };

  scrollToBottom = () => {
    this.state.ref.current.scrollIntoView({ behavior: "smooth" });
  };

  loadChatRoom = () => {
    var query = firebase
      .firestore()
      .collection("message")
      .doc("chatroom")
      .collection(this.state.userID)
      .orderBy("lasttime", "desc");
    // Start listening to the query.
    query.onSnapshot((snapshot) => {
      var chatrooms;

      if (this.state.firstLoadChatroom) {
        chatrooms = [];
      } else {
        chatrooms = this.state.chatrooms;
      }
      snapshot.docChanges().forEach((change) => {
        var room = change.doc.data();
        if (this.state.firstLoadChatroom) {
          chatrooms.push({
            id: change.doc.id,
            chatwith: room.name,
            chatwithId: room.id,
            lasttime: room.lasttime,
            read: room.read,
          });
        } else {
          var isNewRoom = true;
          for (let i = 0; i < chatrooms.length; i++) {
            if (chatrooms[i].id === change.doc.id) {
              chatrooms[i].read = true;
              isNewRoom = false;
            }
          }
          if (isNewRoom) {
            chatrooms.push({
              id: change.doc.id,
              chatwith: room.name,
              chatwithId: room.id,
              lasttime: room.lasttime,
              read: room.read,
            });
          }
        }
      });
      this.setState({
        chatrooms: chatrooms,
        loadChatroomFinished: true,
        firstLoadChatroom: false,
      });
      //console.log(this.state.chatrooms);
    });
  };

  sendMsg = () => {if (this.state.msg) {
    firebase
      .firestore()
      .collection("message")
      .doc("message")
      .collection(this.state.selectedRoom)
      .add({
        msg: this.state.msg,
        sender: this.state.userID,
        timesent: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .catch(function (error) {
        //console.error("Error writing new message to database", error);
      });
    this.setState({ msg: "" });

    //update status unread to another user
    firebase
      .firestore()
      .collection("message")
      .doc("chatroom")
      .collection(this.state.chatwithId)
      .doc(this.state.selectedRoom)
      .update({
        read: false,
      })
      .catch(function (error) {
        //console.error("Error updating status unread", error);
      });}
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
    query.onSnapshot((snapshot) => {
      var chatmsgs = this.state.chatmsgs;
      if (this.state.firstLoadMsg) {
        chatmsgs = [];
      }
      snapshot.docChanges().forEach((change) => {
        var message = change.doc.data();
        var pos = "text-left w-100";
        if (String(message.sender) === String(this.state.userID)) {
          pos = "text-right w-100";
        }
        if (message.timesent !== null) {
          chatmsgs.push({
            sender: message.sender,
            msg: message.msg,
            pos: pos,
          });
        }
      });
      this.setState(
        { chatmsgs: chatmsgs, firstLoadMsg: false, loadChatmsgFinished: true },
        () => {
          //console.log(this.state.chatmsgs);
          this.scrollToBottom();
        }
      );
    });
    //update status read
    firebase
      .firestore()
      .collection("message")
      .doc("chatroom")
      .collection(this.state.userID)
      .doc(this.state.selectedRoom)
      .update({
        read: true,
      })
      .catch(function (error) {
        //console.error("Error updating status read", error);
      });
  };

  chatRoom = () => {
    if (!this.state.loadChatroomFinished) {
      return this.loadingChat();
    }
    return this.state.chatrooms.map((chatroom) => (
      <Row key={chatroom.id}>
        <Button
          variant="link"
          className={
            this.state.selectedRoom === chatroom.id
              ? "w-100 text-left selected-room"
              : "w-100 text-left"
          }
          id="chatroom"
          onClick={() => {
            LocalStorageService.setChatroom(chatroom.id);
            LocalStorageService.setChatWithName(chatroom.chatwith);
            LocalStorageService.setChatWithId(chatroom.chatwithId);
            this.setState(
              {
                selectedRoom: chatroom.id,
                chatwith: chatroom.chatwith,
                chatwithId: chatroom.chatwithId,
                firstLoadMsg: true,
              },
              () => {
                this.loadMsg();
              }
            );
            //console.log(this.state.selectedRoom);
          }}
        >
          <h4>
            {chatroom.chatwith}
            {this.hasNewMessage(chatroom)}
          </h4>
        </Button>
      </Row>
    ));
  };

  hasNewMessage = (chatroom) => {
    if (chatroom.read === false) {
      return <FaCircle className="ml-3 text-danger" />;
    }
  };

  chatMsg = () => {
    return this.state.chatmsgs.map((chatmsg) => (
      <div key={chatmsg.id} className="ml-3 mt-3 mr-4 ">
        <div className={chatmsg.pos}>
          <Badge pill variant="info" className="pl-3 pr-3 pt-1 pb-1">
            {chatmsg.msg.length >= 80 ? (
              <h5>
                {chatmsg.msg.substring(0, 80)}
                <br />
                {chatmsg.msg.substring(80, chatmsg.msg.length)}
              </h5>
            ) : (
                <h5>{chatmsg.msg}</h5>
              )}
          </Badge>
        </div>
      </div>
    ));
  };

  msgDisp = () => {
    if (!this.state.loadChatmsgFinished) {
      return this.loadingChat();
    }
    return (
      <Row className="msg-allarea">
        <div id="msgarea">
          {this.chatMsg()}
          <div ref={this.state.ref} />
        </div>
      </Row>
    );
  };

  sendMsgDisp = () => {
    if (!this.state.loadChatmsgFinished) {
      return;
    }
    return (
      <Row className="pt-3 pb-3 shadow">
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Text Here"
            aria-label="Text Here"
            aria-describedby="basic-addon2"
            onChange={(e) => {
              if (e.target.value.length <= 50) {
                this.setState({ msg: e.target.value });
              }
            }}
            value={this.state.msg}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                this.sendMsg();
              }
            }}
          />
          <InputGroup.Append>
            <Button variant="dark" onClick={() => this.sendMsg()}>
              Send
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Row>
    );
  };

  chatWith = () => {
    return (
      <Row className="background-blue text-light pt-3 shadow">
        <Col>
          <h2>{this.state.chatwith}</h2>
        </Col>
      </Row>
    );
  };

  loadingChat = () => {
    return (
      <Spinner animation="border" role="status" className="loading-chat">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  };

  render() {
    return (
      <div className="main-background h-100">
        <Container id="chatsystem-box">
          <Row className="h-100">
            <Col lg={3} className="bg-white shadow text-center">
              <Container fluid>
                <Row className="background-blue text-light pl-3 pt-3">
                  <h2>#Chat Room</h2>
                </Row>
                {this.chatRoom()}
              </Container>
            </Col>
            <Col className="bg-white text-center">
              <Container fluid>
                {this.chatWith()}
                {this.msgDisp()}
                {this.sendMsgDisp()}
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ChatSystem;
