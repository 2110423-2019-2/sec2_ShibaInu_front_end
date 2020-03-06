import React from "react";
import NavBar from "./NavBar";
import Background from "./material/GuestBackground.jpg";
import { Container, Row } from "react-bootstrap";
import './HomeGuest.css';

class HomeGuest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="main-background" id="home-guest">
        <div id="navbar-guest">
            <NavBar mode="guest" userDatas="" />
        </div>
        <Container>
            <Row>
                <img src={Background} alt="bg" className="img-fluid" id="bg-guest" />
            </Row>
        </Container>
      </div>
    );
  }
}

export default HomeGuest;
