import React, { useState } from "react";
import logo from "./material/Logo.png";
import "./Profile.css";
import { FaRegEdit,FaGlobe,FaBirthdayCake } from "react-icons/fa";
import {FiPhoneCall} from "react-icons/fi";
import {MdEmail,MdMyLocation} from "react-icons/md";
import NavBar from "./NavBar";
import { ProfileModal, SkillListItem, SkillModal } from "./ProfileModal";
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "Prayut",
      lname: "ChanOCha",
      headline: "Prime minister of Thailand",
      tel: "0812345678",
      email: "prayut1954@hotmail.com",
      website: "http://prayutchan-o-cha.com",
      location: "Bangkok,Thailand",
      about:
        "I’m Prime minister of Thailand, but i’m looking for some more interesting job. \
        I have to write down something more because it too short but i have no idea about it, \
        so if someone know send direct message to me please. thank you.",
      birthdate: "21 March 1954",
      exp: [
        "Royal Thai Army Headquarters (Office of The Command) \n Commander in Chief, Royal Thai Army \n 2010 - 2014",
        "Office of the Prime Minister \n Prime minister of Thailand \n 2014 - Present"
      ],
      education: ["Armed Forces Academies Preparatory School \n 1971 - 1974"],
      skills: ["c", "c++", "c#"],
      verified: false,
      upper1: true
    };
    this.handleUpper1 = this.handleUpper1.bind(this);
    this.skillChange = this.skillChange.bind(this);
  }
  handleUpper1() {
    this.setState({ upper1: true });
  }
  skillChange(e) {
    let arr = e;
    this.setState({ skills: e }, () =>
      console.log("updated : " + this.state.skills)
    );
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
              <div className="col-5">
                <div className="fname">{this.state.fname}</div>
                <div className="lname"> {this.state.lname}</div>
                <div className="headline">{this.state.headline}</div>
              </div>
              <div className="col-1">
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  id="e-link"
                  hidden={this.state.verified}
                >
                  verify
                </button>
              </div>
              <div className="col-1" id="edit">
                <ProfileModal />
              </div>
            </div>
            <div className="row">
              <div className="col-7">
                <div><FiPhoneCall/><p className="tel">{this.state.tel}</p></div>
                <div><MdEmail/><p className="email">{this.state.email}</p></div>
                <div><FaGlobe/><p className="web">{this.state.website}</p></div>
              </div>
              <div className="col-5">
                <div><MdMyLocation/><p className="location">{this.state.location}</p></div>
                <div><FaBirthdayCake/><p className="bd">{this.state.birthdate}</p></div>
              </div>
            </div>
          </div>
          <div className="row-1" id="exp">
            <div className="About">
              About
              <button type="button" className="btn" id="e-link">
                <FaRegEdit size={20} id="edit-icon" />
              </button>
            </div>
          </div>
          <div className="row-1" id="edu">
            <div className="Exp">
              Experience
              <button type="button" className="btn" id="e-link">
                <FaRegEdit size={20} id="edit-icon" />
              </button>
            </div>
            <div className="Edu">
              Education
              <button type="button" className="btn" id="e-link">
                <FaRegEdit size={20} id="edit-icon" />
              </button>
            </div>
          </div>
          <div className="row-1"></div>
          <div className="row-1" id="skill">
            <div className="skill">
              Skills
              <SkillModal
                Skills={this.state.skills}
                onChange={this.skillChange}
              />
            </div>
            {this.state.skills.map((item, idx) => (
              <SkillListItem Index={idx} Skill={item} ListOnly={true} />
            ))}
          </div>
        </div>
      </>
    );
  }
}
export default Profile;
