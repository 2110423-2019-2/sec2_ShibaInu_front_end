import React from "react";
import logo from "./material/Logo.png";
import "./NavBar.css";
import {
  FaBell,
  FaPlusCircle,
  FaUserCircle,
  FaSearch,
  FaFacebookMessenger,
  FaWindowClose,
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
import LoadingSpinner from './utilities/LoadingSpinner';

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
      mode:
        LocalStorageService.getUserMode() === "" ? "guest"
          : LocalStorageService.getUserMode(),
      userID: LocalStorageService.getUserID(),
      userDatas: [],
      notiDatas: [],
      isNotiLoad: false,
      unreadRoom: 0,
      newNoti: 0,
      hasDeleteNoti: false,
      firstLoadUnreadChat: true,
      firstLoadNoti: true,
      isUserDataLoad: false, //tested
    };
  }

  fetchDatas = () => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + LocalStorageService.getAccessToken();
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/users/" + this.state.userID)
      .then((res) => {
        const userDatas = res.data;
        this.setState({ userDatas: userDatas });
        // //console.log(this.state.userDatas);
      })
      .then((res) => {
        this.setState({ isUserDataLoad: true }); //tested
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
        var unreadRoom;

        if (this.state.firstLoadUnreadChat) {
          unreadRoom = 0;
        } else {
          unreadRoom = this.state.unreadRoom;
        }
        snapshot.docChanges().forEach((change) => {
          var room = change.doc.data();
          if (this.state.firstLoadUnreadChat) {
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
        // //console.log(this.state.unreadRoom);
      });
    }
  };

  makeData = () => {
    if (this.state.userID !== "") {
      firebase
        .firestore()
        .collection("notification")
        .doc("notification")
        .collection(this.state.userID.toString())
        .add({
          topic: "TestNoti15",
          detail: "noti15",
          link: "/client/job",
          createtime: firebase.firestore.FieldValue.serverTimestamp(),
          read: false,
          mode: "client",
        })
        .catch((error) => {
          alert("Error adding noti:", error);
        });
    }
  };

  checkNoti = () => {
    if (this.state.userID !== "") {
      var query = firebase
        .firestore()
        .collection("notification")
        .doc("notification")
        .collection(this.state.userID.toString())
        .orderBy("createtime", "desc");
      // Start listening to the query.
      query.onSnapshot((snapshot) => {
        if (this.state.firstLoadNoti) {
          var notiDatas = [];
          var newNoti = 0;
        } else {
          var { notiDatas, newNoti } = this.state;
        }
        snapshot.docChanges().forEach((change) => {
          var noti = change.doc.data();
          if (noti.createtime !== null) {
            if (this.state.firstLoadNoti) {
              notiDatas.push({
                id: change.doc.id,
                topic: noti.topic,
                detail: noti.detail,
                link: noti.link,
                read: noti.read,
                mode: noti.mode
              });
              if (noti.read === false) {
                newNoti += 1;
              }
            } else {
              var newNotiDatas = [];
              for (let i = 0; i < notiDatas.length; i++) {
                if (this.state.hasDeleteNoti === true) {
                  if (change.doc.id === notiDatas[i].id) {
                    continue;
                  }
                } else {
                  if (change.doc.id === notiDatas[i].id) {
                    notiDatas[i].read = true;
                  }
                }
                newNotiDatas.push(notiDatas[i]);
              }
              notiDatas = newNotiDatas;
              if (this.state.hasDeleteNoti === false) {
                if (noti.read === true) {
                  newNoti -= 1;
                } else {
                  newNoti += 1;
                  notiDatas.push({
                    id: change.doc.id,
                    topic: noti.topic,
                    detail: noti.detail,
                    link: noti.link,
                    read: noti.read,
                    mode: noti.mode
                  });
                }
              } else {
                if (noti.read === false) {
                  newNoti -= 1;
                }
              }
            }
          }
        });
        this.setState({
          notiDatas: notiDatas,
          newNoti: newNoti,
          firstLoadNoti: false,
          hasDeleteNoti: false,
          isNotiLoad: true,
        });
        // //console.log(this.state.notiDatas);
      });
    }
  };

  componentDidMount = () => {
    this.fetchDatas();
    this.checkNewMessage();
    //this.makeData();
    this.checkNoti();
    // //console.log(this.state.mode);
  };

  readNoti = (notiData) => {
    //update status read
    firebase
      .firestore()
      .collection("notification")
      .doc("notification")
      .collection(this.state.userID.toString())
      .doc(notiData.id)
      .update({
        read: true,
      })
      .then(() => {
        // //console.log("a");
        if (notiData.mode !== "") {
          LocalStorageService.setUserMode(notiData.mode);
        }
        window.location.href = notiData.link;
      })
      .catch(function (error) {
        //console.error("Error updating status read", error);
      });
  };

  deleteNoti = (id) => {
    firebase
      .firestore()
      .collection("notification")
      .doc("notification")
      .collection(this.state.userID.toString())
      .doc(id)
      .delete()
      .then(() => {
        //console.log("Document successfully deleted!");
      })
      .catch((error) => {
        //console.error("Error removing document: ", error);
      });
    this.setState({ hasDeleteNoti: true });
  };

  showNotiFilterByRead = (read) => {
    return this.state.notiDatas
      .filter((notiData) => notiData.read === read)
      .map((notiData, idx) => (
        <div key={idx}>
          <DropdownItem
            className={
              notiData.read
                ? "color-black noti"
                : "color-black background-yellow noti"
            }
          >
            <FaWindowClose
              className="float-right text-danger noti-delete"
              onClick={() => this.deleteNoti(notiData.id)}
            />
            <div
              onClick={() => {
                this.readNoti(notiData);
              }}
            >
              <h5>{notiData.topic}</h5>
              <p className="noti-detail">{notiData.detail}</p>
            </div>
          </DropdownItem>
        </div>
      ));
  };

  notiList = () => {
    if (this.state.notiDatas.length > 0) {
      return (
        <div>
          {this.showNotiFilterByRead(false)}
          {this.showNotiFilterByRead(true)}
        </div>
      );
    } else if (!this.state.isNotiLoad) {
      return <LoadingSpinner />
    } else {
      return <div>
        <DropdownItem className='text-center'>
          <h5>NO NOTIFICATION</h5>
        </DropdownItem>
      </div>
    }
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

    notiMenu = (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav>
          <Badge badgeContent={this.state.newNoti} color="secondary">
            <FaBell />
          </Badge>
        </DropdownToggle>
        <DropdownMenu right id="noti-box">
          {this.notiList()}
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
      signInMenu = <Nav.Link href="/signin">Sign in</Nav.Link>;
      signUpMenu = <Nav.Link href="/signup">Sign up</Nav.Link>;
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
          href="/report"
          id="dropdown-item-balance"
          className="color-black"
        >
          My report
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
        <DropdownItem
          href="/setting"
          id="dropdown-item-balance"
          className="color-black"
        >
          Setting
        </DropdownItem>
        <DropdownItem id="dropdown-item-signout" onClick={this.signOut}>
          Sign out
        </DropdownItem>
      </DropdownMenu>
    );

    if (this.state.mode === this.state.status.ADMIN) {
      dropDownMenu = (
        <DropdownMenu right>
          <DropdownItem
            href="/admin/verify"
            id="dropdown-item-balance"
            className="color-black"
          >
            User verification
          </DropdownItem>
          <DropdownItem
            href="/admin/ban"
            id="dropdown-item-balance"
            className="color-black"
          >
            Ban user
          </DropdownItem>
          <DropdownItem
            href="/admin/report"
            id="dropdown-item-balance"
            className="color-black"
          >
            Report list
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem
          href="/setting"
          id="dropdown-item-balance"
          className="color-black"
        >
          Setting
        </DropdownItem>
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
    if (
      this.state.mode !== this.state.status.GUEST &&
      this.state.isUserDataLoad === false
    ) {
      //tested
      return null;
    }
    return (
      <Navbar expand="lg" id="navbar" sticky="top" className="shadow">
        {logoBrand}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">{navbarMenu}</Navbar.Collapse>
      </Navbar>
    );
  }

  signOut() {
    //console.log("signout");
    LocalStorageService.signOut();
    window.location.href = "/";
  }
}

export default NavBar;
