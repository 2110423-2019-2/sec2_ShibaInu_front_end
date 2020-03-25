import React from "react";
import profileimage from "./material/profileimg2.png";
import profilebg from "./material/profilebg.jpg";
import "./Profile.css";
import { FaGlobe, FaBirthdayCake } from "react-icons/fa";
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
  ExperienceModal,
  EducationModal,
  ReviewListItem,
  ProfileImageModal
} from "./ProfileModal";
import ImageUploader from './ImageUploader';
import { Container } from "react-bootstrap";
import LocalStorageService from './LocalStorageService';
var utilities = require("./Utilities.json");
class Profile extends React.Component {
  constructor(props) {
    super(props);
    if(!LocalStorageService.getUserID()){
      window.location.href = '/';
    }
    this.state = {
      isMyProfile: false,
      isLoaded:false,
      userId: this.props.userId == null? LocalStorageService.getUserID():this.props.userId.userId,
      data: {
        experience: [
          {
            role: "Royal Thai Army Headquarters (Office of The Command)",
            location: "Commander in Chief, Royal Thai Army",
            year: "2010 - 2014"
          },
          {
            role: "Office of the Prime Minister",
            location: "Prime minister of Thailand ",
            year: "2014 - Present"
          }
        ],
        education: [
          {
            location: "Armed Forces Academies Preparatory School ",
            year: " 1971 - 1974"
          }
        ],
        skills: ["C", "C++", "C#"]
      },
      fname: "Prayut",
      lname: "ChanOCha",
      headline: "Prime minister of Thailand",
      tel: "0812345678",
      email: "prayut1954@hotmail.com",
      website: "http://prayutchan-o-cha.com",
      location: "Bangkok,Thailand",
      about:"About mes",
      birthdate: "21 March 1954",
      exp: [
        {
          role: "Royal Thai Army Headquarters (Office of The Command)",
          location: "Commander in Chief, Royal Thai Army",
          year: "2010 - 2014"
        },
        {
          role: "Office of the Prime Minister",
          location: "Prime minister of Thailand ",
          year: "2014 - Present"
        }
      ],
      education: [
        {
          location: "Armed Forces Academies Preparatory School ",
          year: " 1971 - 1974"
        }
      ],
      skills: ["C", "C++", "C#"],
      reviewlist:[{reviewername:"itthi", description:"awesome!",score:10,jobname:"Building mobile application"}],
      verified: false,
      upper1: true,
      uploadImage: null
    };
    this.fetch = this.fetch.bind(this);
  }
  
  componentDidMount(){
    this.fetch();
  }
  componentDidUpdate(prevProps){
    if(this.props !== prevProps){
      this.setState({userId : LocalStorageService.getUserID()})
      console.log(2)
    }
  }
  fetch() {
    let months = [
      "January",
      "Febuary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    if(this.state.userId === LocalStorageService.getUserID()){
      this.setState({isMyProfile : true})
    }else{
      this.setState({isMyProfile : false})
    }
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + LocalStorageService.getAccessToken();
    axios
      .get(utilities["backend-url"]+"/users/" + this.state.userId)
      .then(res => {
        console.log(res);
        let body = res.data;
        let bdate = new Date(body.dateOfBirth);
        let formatted_date =
          bdate.getDate() +
          " " +
          months[bdate.getMonth()] +
          " " +
          bdate.getFullYear();
        let edu_json = [];
        let exp_json = [];
        if (body.education !== null) {
          edu_json = JSON.parse(body.education);
        }
        if (body.experience !== null) {
          exp_json = JSON.parse(body.experience);
        }
        this.setState({
          data: body,
          fname: body.firstName,
          lname: body.lastName,
          headline: body.headline,
          tel: body.phone === null ? "" : body.phone,
          email: body.email === null ? "" : body.email,
          website: body.website === null ? "" : body.website,
          location: body.location === null ? "" : body.location,
          about: body.about === null ? "" : body.about,
          birthdate: formatted_date === null ? new Date() : formatted_date,
          exp: exp_json === null ? [] : exp_json,
          education: edu_json === null ? [] : edu_json,
          skills: body.skills == null ? [] : body.skills,
          verified: body.isVerified
        });
        this.setState({
          data: {
            userId: this.state.userId,
            firstName: this.state.fname,
            lastName: this.state.lname,
            headline: this.state.headline,
            phone: this.state.tel,
            email: this.state.email,
            website: this.state.website,
            location: this.state.location,
            about: this.state.about,
            dateOfBirth: this.state.birthdate,
            experience: this.state.exp,
            education: this.state.education,
            skills: this.state.skills,
            verified: this.state.verified
          }
        });
        this.setState({isLoaded:true});
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    /*if(!this.state.isLoaded){
      return(
        <>
        </>
      );
    }*/
    return (
      <>
        <NavBar mode="client" userDatas={this.state.data} />
        <Container id="profile-container">
          <div className="row-5-xs shadow-sm" id="personal">
            <div className="row" id="pro-bg">
              <img src={profilebg} className="pro-bg-img" alt="youngstar logo" />
            </div>
            <div className="row " id="upper-second">
              <div className="col-3 mr " id="pro-img-frame">
                <div id="img-f">
                  <img src={profileimage} className="pro-img" alt="youngstar logo" />
                  <ProfileImageModal id="profile-img"/>
                </div>
              </div>
              <div className="col-5">
                <div className="fname">{this.state.fname}</div>
                <div className="lname">{this.state.lname}</div>
                <div className="headline" hidden={this.state.headline === ""}>
                  {this.state.headline}
                </div>
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
                <ProfileModal
                  userId={this.state.userId}
                  data={this.state.data}
                  onUpdate={this.fetch}
                  hidden={!this.state.isMyProfile}
                />
              </div>
            </div>
            <div className="row ">
              <div className="col-7" id="sub-second-one">
                <div>
                  <FiPhoneCall hidden={this.state.tel === ""} />
                  <p className="tel">{this.state.tel === "" ?this.state.tel: (this.state.tel.substr(0,3)+"-"+this.state.tel.substr(3,))}</p>
                </div>
                <div>
                  <MdEmail hidden={this.state.email === ""} />
                  <p className="email">{this.state.email}</p>
                </div>
                <div>
                  <FaGlobe hidden={this.state.website === ""} />
                  <p className="web">
                    <a href={this.state.website}>{this.state.website}</a>
                  </p>
                </div>
              </div>
              <div className="col-5" id="sub-second-two">
                <div>
                  <MdMyLocation hidden={this.state.location === ""} />
                  <p className="location">{this.state.location}</p>
                </div>
                <div>
                  <FaBirthdayCake hidden={this.state.birthdate === ""} />
                  <p className="bd">{this.state.birthdate}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row-1 shadow-sm" id="about-box">
            <div className="About">
              <h5>About</h5>
              <About
                userId={this.state.userId}
                data={this.state.data}
                onUpdate={this.fetch}
                hidden={!this.state.isMyProfile}
              />
            </div>
            <div className="content">
              {this.state.about === ""
                ? "I'm " + this.state.fname
                : this.state.about}
            </div>
          </div>
          <div className="row-1 shadow-sm" id="exp-edu">
            <div className="Exp">
              <h5>Experience</h5>
              <ExperienceModal
                userId={this.state.userId}
                data={this.state.data}
                onUpdate={this.fetch}
                hidden={!this.state.isMyProfile}

              />
            </div>
            <div className="Exp-content">
              {this.state.exp.length === 0
              ? "No information yet"
              : this.state.exp.map((item,idx) => (
                <ExperienceListItem
                  key={idx}
                  role={item.role}
                  location={item.location}
                  year={item.year}
                />
              ))}
            </div>
            <div className="Edu">
              <h5>Education</h5>
              <EducationModal
                userId={this.state.userId}
                data={this.state.data}
                onUpdate={this.fetch}
                hidden={!this.state.isMyProfile}

              />
            </div>
            <div className="Edu-content">
              {this.state.education.length === 0
              ? "No information yet"
              : this.state.education.map((item,idx) => (
                <EducationListItem key={idx} location={item.location} year={item.year} />
              ))}
            </div>
          </div>
          <div className="row-1 shadow-sm" id="skill">
            <div className="skill">
              <h5>Skills</h5>
              <SkillModal
                userId={this.state.userId}
                data={this.state.data}
                onUpdate={this.fetch}
                hidden={!this.state.isMyProfile}

              />
            </div>
            {this.state.skills.length === 0
              ? "No skill yet"
            : this.state.skills.map((item,idx) => <SkillListItem key={idx} skill={item} />)}
          </div>
          <div className="row-1 shadow-sm" id="review" hidden={LocalStorageService.getUserMode()==="client"}>
            <h5>Review</h5>
            <div className="review">
              {this.state.reviewlist.length === 0
              ? "No skill yet"
              : this.state.reviewlist.map((item,idx) => 
                <ReviewListItem
                  reviewername={item.reviewername}
                  description={item.description}
                  score={item.score}
                  jobname={item.jobname}
                />
              )}
            </div>
          </div>
        </Container>
      </>
    );
  }
}
export default Profile;
