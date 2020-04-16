import React from "react";
import NavBar from "./NavBar";
import Background from "./material/GuestBackground.jpg";
import './HomeGuest.css';
import LocalStorageService from "./LocalStorageService";

class HomeGuest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    LocalStorageService.setUserMode('guest');
    return (
      <div className="main-background" id="home-guest" >
        <NavBar />
        <div id="navbar-guest">
        </div>
          <div id="bg-overlay" style={{backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.5)),url(${Background})`}}>
            <div id="content">
              <h1>Hire expert freelancers for any job, online</h1>
              <p>Millions of small businesses use Freelancer to turn their ideas into reality.</p>
              <div id="btn-group">
              <button type="button" className="btn btn-outline-light btn-lg">Start Hiring</button>
              <button type="button" className="btn btn-outline-light btn-lg">Start working</button>
              </div>
            </div>
          </div>
          
    
      </div>
    );
  }
}

export default HomeGuest;
