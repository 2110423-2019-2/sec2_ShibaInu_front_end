import React from "react";
import logo from "./material/Logo.png";
import "./NavBar.css";
import {
  FaBell,
  FaPlusCircle,
  FaUserCircle,
  FaSearch,
  FaFacebookMessenger,
} from "react-icons/fa";
import { Nav, Navbar } from "react-bootstrap";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import axios from "axios";
import { Badge } from "@material-ui/core";
import LocalStorageService from "./LocalStorageService";
import firebase from "./firebase";

var utilities = require("./Utilities.json");
class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: {
        CLIENT: "client",
        FREELANCER: "freelancer",
        GUEST: "guest",
        ADMIN: "admin",
      },
      mode: LocalStorageService.getUserMode(),
      userID: LocalStorageService.getUserID(),
      userDatas: {},
      notiDatas: {},
      isNotiLoad: false,
      unreadRoom: 0,
      newNoti: 1,
      firstLoadUnreadChat: true,
    };
  }

  fetchDatas = () => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + LocalStorageService.getAccessToken();
    axios
      .get(utilities["backend-url"] + "/users/" + this.state.userID)
      .then((res) => {
        const userDatas = res.data;
        this.setState({ userDatas: userDatas });
        console.log(this.state.userDatas);
      });
    axios
      .get(utilities["backend-url"] + "/notification/" + this.state.userID)
      .then((res) => {
        const notiDatas = res.data;
        this.setState({ notiDatas: notiDatas, isNotiLoad: true });
        console.log(this.state.notiDatas);
      });
  };

  checkNewMessage = () => {
    if (this.state.userID !== "") {
      var query = firebase
        .firestore()
        .collection("message")
        .doc("chatroom")
        .collection(this.state.userID);
      // Start listening to the query.
      query.onSnapshot((snapshot) => {
        if(this.state.firstLoadUnreadChat){
          var unreadRoom = 0;
        } else {
          var unreadRoom = this.state.unreadRoom;
        }
        snapshot.docChanges().forEach((change) => {
          var room = change.doc.data();
          if(this.state.firstLoadUnreadChat){
            if (room.read === false) {
              unreadRoom += 1;
            }
          } else {
            if (room.read === false) {
              unreadRoom += 1;
            } else {
              unreadRoom -= 1;
            }
          }
        });
        this.setState({ unreadRoom: unreadRoom, firstLoadUnreadChat: false });
        console.log(this.state.unreadRoom);
      });
    }
  };

  componentDidMount = () => {
    this.fetchDatas();
    this.checkNewMessage();
  };

  readNoti = (notiID, idx) => {
    let notiDatas = this.state.notiDatas;
    notiDatas[idx].isRead = true;
    this.setState({ notiDatas: notiDatas });
    axios.patch(
      utilities["backend-url"] + "/notification/" + this.state.userID
    );
  };

  render() {
    const YOUNGSTAR = "YoungStar ";
    var switchMode,
      createMenu,
      modePath,
      searchMenu,
      userMode,
      dropDownMenu,
      notiMenu,
      navbarMenu,
      signInMenu,
      signUpMenu,
      memberMenu,
      guestMenu,
      homePath,
      changeMode,
      chatMenu;
    var jobPath = "/" + this.state.mode + "/job";

    var newNotiDetail, oldNotiDetail;
    if (this.state.isNotiLoad) {
      newNotiDetail = this.state.notiDatas
        .filter((noti) => noti.isRead === false)
        .map((noti, idx) => (
          <DropdownItem
            key={idx}
            className="color-black background-yellow noti"
            onClick={() => {
              this.readNoti(noti.notificationId, idx);
            }}
          >
            <h5>{noti.topic}</h5>
            <p>{noti.description}</p>
          </DropdownItem>
        ));
      oldNotiDetail = this.state.notiDatas
        .filter((noti) => noti.isRead === true)
        .map((noti, idx) => (
          <DropdownItem
            key={idx}
            className="color-black noti"
            onClick={() => {
              this.readNoti(noti.notificationId, idx);
            }}
          >
            <h5>{noti.topic}</h5>
            <p>{noti.description}</p>
          </DropdownItem>
        ));
    }

    notiMenu = (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav>
          <Badge badgeContent={this.state.newNoti} color="secondary">
            <FaBell />
          </Badge>
        </DropdownToggle>
        <DropdownMenu right id="noti-box">
          {newNotiDetail}
          {oldNotiDetail}
        </DropdownMenu>
      </UncontrolledDropdown>
    );

    searchMenu = (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          <FaSearch className="navbar-icon" />
          Search
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem href="/jobsearch" className="color-black">
            <FaSearch className="navbar-icon" />
            Search Job
          </DropdownItem>
          <DropdownItem href="/freelancersearch" className="color-black">
            <FaSearch className="navbar-icon" />
            Search Freelancer
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
    userMode = YOUNGSTAR + this.state.mode;

    chatMenu = (
      <Nav.Link href="/chat">
        <Badge badgeContent={this.state.unreadRoom} color="secondary">
          <FaFacebookMessenger className="navbar-icon" />
        </Badge>
      </Nav.Link>
    );

    if (this.state.mode === this.state.status.CLIENT) {
      createMenu = (
        <Nav.Link href="/jobcreate">
          <FaPlusCircle className="navbar-icon" />
          Create Job
        </Nav.Link>
      );
      searchMenu = (
        <Nav.Link href="/freelancersearch">
          <FaSearch className="navbar-icon" />
          Search Freelancer
        </Nav.Link>
      );
      homePath = "/client/home";
      modePath = "/" + this.state.status.FREELANCER + "/home";
      switchMode = "Switch " + this.state.status.FREELANCER;
      changeMode = "freelancer";
    } else if (this.state.mode === this.state.status.FREELANCER) {
      searchMenu = (
        <Nav.Link href="/jobsearch">
          <FaSearch className="navbar-icon" />
          Search Job
        </Nav.Link>
      );
      modePath = "/" + this.state.status.CLIENT + "/home";
      switchMode = "Switch " + this.state.status.CLIENT;
      homePath = "/freelancer/home";
      changeMode = "client";
    } else if (this.state.mode === this.state.status.GUEST) {
      userMode = YOUNGSTAR;
      signInMenu = (
        <Nav.Link href="/signin" className="border-right border-warning">
          Sign in
        </Nav.Link>
      );
      signUpMenu = (
        <Nav.Link href="/signup" className="border-left border-warning">
          Sign up
        </Nav.Link>
      );
      homePath = "/";
    }
    dropDownMenu = (
      <DropdownMenu right>
        <DropdownItem
          id="dropdown-item-profile"
          href="/profile"
          className="color-black"
        >
          My profile
        </DropdownItem>
        <DropdownItem
          id="dropdown-item-job"
          href={jobPath}
          className="color-black"
        >
          My job
        </DropdownItem>
        <DropdownItem
          href="/payment"
          id="dropdown-item-balance"
          className="color-black"
        >
          My payment
        </DropdownItem>
        <DropdownItem
          id="dropdown-item-switch"
          href={modePath}
          onClick={() => {
            LocalStorageService.setUserMode(changeMode);
          }}
        >
          {switchMode}
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem id="dropdown-item-signout" onClick={this.signOut}>
          Sign out
        </DropdownItem>
      </DropdownMenu>
    );

    if (this.state.mode === this.state.status.ADMIN) {
      dropDownMenu = (
        <DropdownMenu right>
          <DropdownItem id="dropdown-item-signout" onClick={this.signOut}>
            Sign out
          </DropdownItem>
        </DropdownMenu>
      );
      notiMenu = (
        <Nav.Link href="/admin/announcement">
          <FaBell />
          Create Announcement
        </Nav.Link>
      );
      homePath = "/admin/home";
    }

    memberMenu = (
      <Nav className="ml-auto">
        {createMenu}
        {searchMenu}
        {chatMenu}
        {notiMenu}
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            <FaUserCircle className="navbar-icon" />
            {this.state.userDatas.firstName}
          </DropdownToggle>
          {dropDownMenu}
        </UncontrolledDropdown>
      </Nav>
    );

    guestMenu = (
      <Nav className="ml-auto">
        {searchMenu}
        {signInMenu}
        {signUpMenu}
      </Nav>
    );

    navbarMenu =
      this.state.mode === this.state.status.GUEST ? guestMenu : memberMenu;

    var logoBrand = (
      <Navbar.Brand href={homePath} id="logo">
        <img src={logo} id="logo-img" alt="youngstar logo" />
        {userMode}
      </Navbar.Brand>
    );

    return (
      <Navbar expand="lg" id="navbar" sticky="top" className="shadow">
        {logoBrand}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">{navbarMenu}</Navbar.Collapse>
      </Navbar>
    );
  }

  signOut() {
    console.log("signout");
    LocalStorageService.signOut();
    window.location.href = "/";
  }
}

export default NavBar;
