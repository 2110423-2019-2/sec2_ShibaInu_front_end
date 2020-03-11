import React from "react";
import NavBar from "./NavBar";
import './AdminHome.css';
import { Container, Row, Col, Table } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";
import LocalStorageService from "./LocalStorageService";

class AdminHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDataLoad: false,
      userDatas: {},
      isUserDataLoad: false
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

  disapproveHandler = () => {
    swal({
      title: "Are you sure to disapprove?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDisapprove) => {
      if (willDisapprove) {
        swal("Disapproved success!", {
          icon: "success",
        });

      }
    });
  }

  approveHandler = () => {
    swal({
      title: "Are you sure to approve?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willApprove) => {
      if (willApprove) {
        swal("Approved success!", {
          icon: "success",
        });

      }
    });
  }

  render() {
    if (!this.state.isUserDataLoad) {
      return null;
    }
    var headTable, detailTable;
    headTable = (
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
      </tr>
    );
    detailTable = this.state.userDatas.map((user,index)=>(
        <tr key={index} className="text-center">
        <td className="align-middle">
          {user.firstName}
          {user.lastName}
        </td>
        <td className="align-middle">{user.identificationNumber}</td>
        <td className="align-middle">{user.identificationCardWithFacePic}</td>
        <td className="align-middle">{user.identificationCardPic}</td>
        <td className="align-middle">
          <button type="button" className="btn btn-danger btn-block" onClick={()=>this.disapproveHandler(index)}>
            Disapprove
          </button>
        </td>
        <td className="align-middle">
          <button type="button" className="btn btn-success btn-block" onClick={()=>this.approveHandler(index)}>
            Approve
          </button>
        </td>
      </tr>
    ));
    return (
      <div className="main-background">
        <NavBar mode="admin" userDatas={this.state.userDatas} />
        <Container id="adminHome-box">
          <Row>
            <Col>
              <Table responsive>
                <thead>{headTable}</thead>
                <tbody>{detailTable}</tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default AdminHome;
