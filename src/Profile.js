import React  from "react";
import logo from "./material/Logo.png";
import "./Profile.css";
import { FaRegEdit, FaGlobe, FaBirthdayCake } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { MdEmail, MdMyLocation } from "react-icons/md";
import NavBar from "./NavBar";
import axios from "axios";
import {
  ProfileModal,
  SkillListItem,
  SkillModal,
  About,
  EducationListItem,
  ExperienceListItem,
  ExperienceModal
} from "./ProfileModal";
import { Container } from "react-bootstrap";
import { fireEvent } from "@testing-library/dom";
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data : {},
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
      skills: [],
      verified: false,
      upper1: true
    };
    this.onChangeProfileImage = this.onChangeProfileImage.bind(this);
    this.skillChange = this.skillChange.bind(this);
    this.fetch = this.fetch.bind(this,);
    this.fetch(1);
  }
  onChangeProfileImage() {
    this.setState({ upper1: true });
  }
  skillChange(e) {
    let arr = e;
    this.setState({ skills: e }, () =>
      console.log("updated : " + this.state.skills)
    );
  }
  componentDidMount(){
    fetch(1);
  }
  
  fetch(userId){
    let months = ["January","Febuary","March","April","May","June","July","August","September","October","November","December"]
    axios.get("http://35.198.228.244:10000/users/"+userId).then(res =>{
      console.log(res);
      let body = res.data;
      let bdate = new Date(body.dateOfBirth);
      let formatted_date = bdate.getDate() + " " + months[bdate.getMonth()] + " " + bdate.getFullYear()
      console.log(JSON.parse(body.experience));
      this.setState({
        userId : 1,
        data : body,
        fname: body.firstName,
        lname: body.lastName,
        headline: "",
        tel: body.phone,
        email: body.email,
        website: body.website,
        location: body.location,
        about:body.about,
        birthdate: formatted_date,
        exp: JSON.parse(body.experience),
        education: [
          {
            at: body.education,
            year: "2475"
          }
        ],
        skills: body.skills,
        verified: body.isVerified,
      })
    }).catch(err => {
        console.log(err);
    });
  }
  render() {
    return (
      <>
        <NavBar mode='client' userDatas=''/>
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
                    id="profile-img"
                    onClick={this.handleUpper1}
                  ><p>Change Profile</p>
                  </button>
                </div>
                
              </div>
              <div className="col-5" >
                <div className="fname">{this.state.fname}</div>
                <div className="lname"> {this.state.lname}</div>
                <div className="headline" hidden={this.state.headline === ""}>{this.state.headline}</div>
              </div>
              <div className="col-1">
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  id="verify"
                  hidden={this.state.verified}
                >
                  verify
                </button>
              </div>
              <div className="col-1" id="edit">
                <ProfileModal userId={this.state.userId} data={this.state.data} onUpdate={this.fetch}/>
              </div>
            </div>
            <div className="row">
              <div className="col-7" id="sub-second-one">
                <div>
                  <FiPhoneCall hidden={this.state.tel === ""}/>
                  <p className="tel">{this.state.tel}</p>
                </div>
                <div>
                  <MdEmail hidden={this.state.email === ""}/>
                  <p className="email">{this.state.email}</p>
                </div>
                <div>
                  <FaGlobe hidden={this.state.website === ""}/>
                  <p className="web"><a href={this.state.website}>{this.state.website}</a></p>
                </div>
              </div>
              <div className="col-5" id="sub-second-two">
                <div>
                  <MdMyLocation hidden={this.state.location === ""}/>
                  <p className="location">{this.state.location}</p>
                </div>
                <div>
                  <FaBirthdayCake hidden={this.state.birthdate === ""}/>
                  <p className="bd">{this.state.birthdate}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row-1" id="about-box">
            <div className="About">
              <h5>About</h5>
              <About userId={this.state.userId} data={this.state.data} onUpdate={this.fetch} />
            </div>
            <div className="content">{this.state.about==="" ?"I'm "+this.state.fname:this.state.about}</div>
          </div>
          <div className="row-1" id="exp-edu" >
            <div className="Exp">
              <h5>Experience</h5>
              <ExperienceModal userId={this.state.userId} data={this.state.data} onUpdate={this.fetch}/>
            </div>
            <div className="Exp-content">
              {this.state.exp.map(item => (
                <ExperienceListItem
                  role={item.role}
                  location={item.location}
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
            {this.state.skills===[]?"No skill yet":this.state.skills.map(item => (
              <SkillListItem Skill={item} ListOnly={true} />
            ))}
          </div>
        </Container>
      </>
    );
  }
}
export default Profile;
