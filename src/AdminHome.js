import React from "react";
import './AdminHome.css';
import { Container, Row, Col, Table } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";
import LocalStorageService from "./LocalStorageService";
var utilities = require('./Utilities.json');
class AdminHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDataLoad: false,
      userDatas: {},
      isUserDataLoad: false,
      banned: []
    };
  }

  fetchDatas = () => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + LocalStorageService.getAccessToken();
    axios.get(utilities['backend-url'] + "/users").then(res => {
      const userDatas = res.data;
      var banned = [];
      for(let i=0;i<userDatas.length;i++){
        var ban = "Ban";
        if (userDatas[i].isBanned){
          ban = "Unban"
        }
        banned.push(ban);
      }
      this.setState({ userDatas: userDatas, isUserDataLoad: true, banned: banned });
      console.log(this.state.userDatas);
      console.log(this.state.isBanned);
    });
  };

  componentDidMount = () => {
    this.fetchDatas();
  };

  disapproveHandler = () => {
    swal({
      title: "Are you sure to disapprove?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDisapprove) => {
      if (willDisapprove) {
        var status = 
        swal("Disapproved success!", {
          icon: "success",
        });
        
      }
    });
  }

  approveHandler = (index) => {
    swal({
      title: "Are you sure to approve?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willApprove) => {
      if (willApprove) {
      axios
      .patch(utilities["backend-url"] + "/users/verify/verify",{
        user: this.state.userDatas[index].userId,
        approve: true
      })
      .then(response => {
        switch (response.status) {
          // Created
          case 201:
            console.log("already push");
            break;

          // Other case
          default:
            console.log("Status code is " + response.status);
        }
      });
        swal("Approved success!", {
          icon: "success",
        });

      }
    });
  }

  banHandler = (index) => {
    var title = "Are you sure to " + this.state.banned[index] + "?";
    swal({
      title: title,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willBan) => {
      if (willBan) {
      var banned = this.state.banned;
      var isBanned = false;
      if(banned[index] === "Ban"){
        isBanned = true;
        banned[index] = "Unban";
      } else {
        banned[index] = "Ban";
      }
      this.setState({banned: banned});
      axios
      .patch(utilities["backend-url"] + "/users/ban", {
        user: this.state.userDatas[index].userId,
        isBanned: isBanned
      })
      .then(response => {
        switch (response.status) {
          // Created
          case 201:
            console.log("already push");
            break;

          // Other case
          default:
            console.log("Status code is " + response.status);
        }
      });
        swal("Success!", {
          icon: "success",
        });

      }
    });
  }

  headTable = () => {
    return (
      <tr className="text-center background-blue text-light">
        <td>
          <h5>Name</h5>
        </td>
        <td>
          <h5>National ID</h5>
        </td>
        <td>
          <h5>Selfie</h5>
        </td>
        <td>National ID Card</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    );
  }

  detailTable = () => {
    return this.state.userDatas.map((user,index)=>(
      <tr key={index} className="text-center">
      <td className="align-middle">
        {user.firstName}
        {user.lastName}
      </td>
      <td className="align-middle">{user.identificationNumber}</td>
      <td className="align-middle">{user.identificationCardWithFacePic}</td>
      <td className="align-middle">{user.identificationCardPic}</td>
      <td className="align-middle">
        <button type="button" className="btn btn-secondary btn-block" onClick={()=>this.disapproveHandler(index)}>
          Disapprove
        </button>
      </td>
      <td className="align-middle">
        <button type="button" className="btn btn-success btn-block" onClick={()=>this.approveHandler(index)}>
          Approve
        </button>
      </td>
      <td className="align-middle">
        <button type="button" className="btn btn-danger btn-block" onClick={()=>this.banHandler(index)}>
          {this.state.banned[index]}
        </button>
      </td>
    </tr>
  ));
  }

  render() {
    if (!this.state.isUserDataLoad) {
      return null;
    }
    return (
      <div className="main-background">
        <Container id="adminHome-box">
          <Row>
            <Col>
              <Table responsive>
                <thead>{this.headTable()}</thead>
                <tbody>{this.detailTable()}</tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default AdminHome;
