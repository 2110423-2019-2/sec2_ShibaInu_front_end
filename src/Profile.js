import React  from "react";
import logo from "./material/Logo.png";
import "./Profile.css";
import { FaRegEdit, FaGlobe, FaBirthdayCake } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { MdEmail, MdMyLocation } from "react-icons/md";
import NavBar from "./NavBar";
import {
  ProfileModal,
  SkillListItem,
  SkillModal,
  About,
  EducationListItem,
  ExperienceListItem
} from "./ProfileModal";
import { Container } from "react-bootstrap";
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
        {
          role: "Royal Thai Army Headquarters (Office of The Command)",
          at: "Commander in Chief, Royal Thai Army",
          year: "2010 - 2014"
        },
        {
          role: "Office of the Prime Minister",
          at: "Prime minister of Thailand ",
          year: "2014 - Present"
        }
      ],
      education: [
        {
          at: "Armed Forces Academies Preparatory School ",
          year: " 1971 - 1974"
        }
      ],
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
        <NavBar mode="guest"/>
        <Container className = "container">
          <div className="row-5-xs" id="personal">
            <div className="row" id="pro-bg">
              <img src={logo} className="pro-bg-img" alt="youngstar logo" />
            </div>
            <div className="row" id="upper-second">
              <div className="col-3 mr" id="pro-img-frame">
              
                <div id="img-f">
                <img src={logo} className="pro-img" alt="youngstar logo" />
                <button
                    id="pic-e"
                    onClick={this.handleUpper1}
                  >Change Profile
                  </button>
                </div>
                
              </div>
              <div className="col-5" >
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
              <div className="col-7" id="sub-second-one">
                <div>
                  <FiPhoneCall />
                  <p className="tel">{this.state.tel}</p>
                </div>
                <div>
                  <MdEmail />
                  <p className="email">{this.state.email}</p>
                </div>
                <div>
                  <FaGlobe />
                  <p className="web"><a href={this.state.website}>{this.state.website}</a></p>
                </div>
              </div>
              <div className="col-5" id="sub-second-two">
                <div>
                  <MdMyLocation />
                  <p className="location">{this.state.location}</p>
                </div>
                <div>
                  <FaBirthdayCake />
                  <p className="bd">{this.state.birthdate}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row-1" id="about-box">
            <div className="About">
              <h5>About</h5>
              <About />
            </div>
            <div className="content">{this.state.about}</div>
          </div>
          <div className="row-1" id="exp-edu" >
            <div className="Exp">
              <h5>Experience</h5>

            </div>
            <div className="Exp-content">
              {this.state.exp.map(item => (
                <ExperienceListItem
                  role={item.role}
                  location={item.at}
                  year={item.year}
                />
              ))}
            </div>
            <div className="Edu">
              <h5>Education</h5>
              
            </div>
            <div className="Edu-content">
              {this.state.education.map(item => (
                <EducationListItem location={item.at} year={item.year} />
              ))}
            </div>
          </div>
          <div className="row-1"></div>
          <div className="row-1" id="skill">
            <div className="skill">
              <h5>Skills</h5>
              <SkillModal
                Skills={this.state.skills}
                onChange={this.skillChange}
                hidden={false}
              />
            </div>
            {this.state.skills.map(item => (
              <SkillListItem Skill={item} ListOnly={true} />
            ))}
          </div>
        </Container>
      </>
    );
  }
}
export default Profile;
