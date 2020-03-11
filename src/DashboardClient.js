import React from "react";
import NavBar from "./NavBar";
import "./DashboardClient.css";
import profileimage from "./material/profileimg2.png";
import { Table, Container, Row, Col, Breadcrumb } from "react-bootstrap";
import { DashboardBox, DashboardStatus, DashboardResponsible, DashboardContract, DashboardTimeline } from "./DashboardComponent";
//import { ReactComponent } from '*.svg';
// import logo from './material/Logo.png';

class DashboardClient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "client",
      jobname : "Build a mobile application"
    };
  }

  render() {
    return (
      <div>
        <NavBar mode={this.state.mode} userDatas={""} />
        <Container>
        <Breadcrumb>
          <Breadcrumb.Item href={"/"+this.state.mode+"/job"}>My job</Breadcrumb.Item>
          <Breadcrumb.Item active>{this.state.jobname}</Breadcrumb.Item>
        </Breadcrumb>
          <h1 className="job-header">{this.state.jobname}</h1>
          <hr/>
          <Row>
            <Col sm={4} >
                <div className="left-col">
                <Row><DashboardStatus/></Row>
                <Row><DashboardResponsible /></Row>
                <Row><DashboardContract /></Row>
                </div>
            </Col>
            <Col sm={8}>
                <Row><FreelancerBox /></Row>
                <Row><DashboardTimeline /></Row>
            </Col>
          
            </Row>
        </Container>
      </div>
    );
  }
}

class FreelancerBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      freelancerList: [
        { userId: "1", fname: "Irma", lname: "Williamson", score: 10, img: profileimage },
        { userId: "2", fname: "Irma", lname: "Williamson", score: 10, img: profileimage },
        { userId: "3", fname: "Irma", lname: "Williamson", score: 10, img: profileimage },
        { userId: "4", fname: "Irma", lname: "Williamson", score: 10, img: profileimage },
        { userId: "5", fname: "Irma", lname: "Williamson", score: 10, img: profileimage },
        { userId: "6", fname: "Irma", lname: "Williamson", score: 10, img: profileimage },
        { userId: "7", fname: "Irma", lname: "Williamson", score: 10, img: profileimage },
      ]
    };
    this.showInterestedList = this.showInterestedList.bind(this);
  }
  componentDidUpdate(prevProps){
    
  }
  showInterestedList() {
    return this.state.freelancerList.map(item => (
      <tr key={item.userId}>
        <td>
          <div className="profile-img"><img src={item.img} alt="youngstar logo" /></div>
        </td>
        <td>{item.fname+" "+item.lname}</td>
        <td>{item.score}</td>
        <td>
          <button type="button" className="btn btn-primary" onClick={""}>
            Chat
          </button>
        </td>
      </tr>
    ));
  }

  render() {
    return (
      <DashboardBox
        hidden={this.props.hidden}
        topic="Interested Freelancer"
        size="large-box"
        component={
          this.state.freelancerList.length === 0 ? (
            "No one interested yet"
          ) : (
            <>
            <div className="table-container-f">
            <Table className="table-freelancer" responsive = "sm" hover>
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>score</th>
                        <th>chat</th>
                    </tr>
                </thead>
                <tbody>{this.showInterestedList()}</tbody>
            </Table>
            </div>
            <div className="footer">
              <button type="button" className="btn btn-success" onClick={""}>
                invite
              </button>
            </div>
            </>
          )
        }
      />
      // <div className="freelancerBox">
      //     <header>Interested Freelancer</header>
      //     <Table responsive><tbody>{this.showInterestedList()}</tbody></Table>
      // </div>
    );
  }
}

export default DashboardClient;
