import React from "react";
import Background from "./material/GuestBackground.jpg";
import './HomeGuest.css';
import LocalStorageService from "./LocalStorageService";

class HomeGuest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  onClickHiring=()=>{
    window.location.href="/freelancersearch"
  }
  onClickWorking=()=>{
    window.location.href="/jobsearch"
  }
  render() {
    LocalStorageService.setUserMode('guest');
    return (
      <div className="main-background" id="home-guest" >
        <div id="navbar-guest">
        </div>
          <div id="bg-overlay" style={{backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.5)),url(${Background})`}}>
            <div id="content">
              <h1>Hire expert freelancers for any job, online</h1>
              <p>Millions of small businesses use Freelancer to turn their ideas into reality.</p>
              <div id="btn-group">
              <button type="button" className="btn btn-outline-light btn-lg" onClick={this.onClickHiring}>Start Hiring</button>
              <button type="button" className="btn btn-outline-light btn-lg" onClick={this.onClickWorking}>Start working</button>
              </div>
            </div>
          </div>
          
    
      </div>
    );
  }
}

export default HomeGuest;
