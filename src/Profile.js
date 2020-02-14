import React, { useState } from "react";
import logo from "./material/Logo.png";
import "./Profile.css";
import { FaRegEdit } from "react-icons/fa";
import NavBar from "./NavBar";
import { ProfileModal, SkillListItem ,SkillModal} from "./ProfileModal";
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { skills: ["c", "c++", "c#"], upper1: true };
    this.handleUpper1 = this.handleUpper1.bind(this);
  }
  handleUpper1() {
    this.setState({ upper1: true });
  }
  render() {
    
    return (
      <>
        <NavBar />
        <div className="container">
          <div className="row-5-xs" id="personal">
            <div className="row" id="pro-bg">
              ProfileBG
            </div>
            <div className="row" id="upper-second">
              <div className="col-3 mr" id="pro-img-frame">
                <div id="img-f">
                  <img src={logo} className="pro-img" alt="youngstar logo" />
                  <button
                    className="btn"
                    id="pic-e"
                    onClick={this.handleUpper1}
                  >
                    <FaRegEdit size={20} id="pic-edit" />
                  </button>
                </div>
              </div>
              <div className="col-2">
                <div className="Fullname">Fullname</div>
                <div className="Headline">Headline</div>
              </div>
              <div className="col-1">
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  id="e-link"
                >
                  verify
                </button>
              </div>
              <div className="col-1" id="edit">
                <ProfileModal />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="">Tel</div>
                <div className="">Email</div>
                <div className="">website</div>
              </div>
              <div className="col-6">
                <div className="">location</div>
                <div className="">Email</div>
              </div>
            </div>
          </div>
          <div className="row-1 bg-danger" id="exp">
            <div className="Exp">
              Experience
              <button type="button" className="btn" id="e-link">
                <FaRegEdit size={20} id="edit-icon" />
              </button>
            </div>
          </div>
          <div className="row-1 bg-success" id="edu">
            <div className="Edu">
              Education
              <button type="button" className="btn" id="e-link">
                <FaRegEdit size={20} id="edit-icon" />
              </button>
            </div>
          </div>
          <div className="row-1"></div>
          <div className="row-1 bg-warning" id="skill">
            <div className="skill">
              Skills
              <SkillModal Skills={this.state.skills}/>
            </div>
            {
                this.state.skills.map((item,idx) => <SkillListItem
                    Index={idx}
                    Skill={item}
                    ListOnly={true}
                    />)
            }
          </div>
        </div>
      </>
    );
  }
}
export default Profile;
