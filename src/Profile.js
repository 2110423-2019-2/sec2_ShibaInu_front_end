import React from "react";
import profileimage from "./material/profileimg2.png";
import profilebg from "./material/profilebg.jpg";
import "./Profile.css";
import { FaGlobe, FaBirthdayCake } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdEmail, MdMyLocation } from "react-icons/md";
import axios from "axios";
import {
  ProfileModal,
  SkillModal,
  About,
  EducationListItem,
  ExperienceListItem,
  ExperienceModal,
  EducationModal,
  ProfileImageModal,
  VerifyDataModal
} from "./ProfileModal";
import { Container, Spinner, Row, Col } from "react-bootstrap";
import PageNotFoundNotAllow from './PageNotFoundNotAllow';
import LocalStorageService from './LocalStorageService';
import Rating from "@material-ui/lab/Rating"
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      err_count : 0,
      isMyProfile: false,
      isLoaded: false,
      userId: this.props.userId == null ? LocalStorageService.getUserID() : this.props.userId.userId,
      data: {
        experience: [
          {
            role: "",
            location: "",
            year: ""
          },
          {
            role: "",
            location: "",
            year: ""
          }
        ],
        education: [
          {
            location: "",
            year: ""
          }
        ],
        skills: []
      },
      fname: "",
      lname: "",
      headline: "",
      tel: "",
      email: "",
      website: "",
      location: "",
      about: "",
      birthdate: "",
      realBirthDate: "",
      exp: [
        {
          role: "",
          location: "",
          year: ""
        },
        {
          role: "",
          location: "",
          year: ""
        }
      ],
      education: [
        {
          location: "",
          year: ""
        }
      ],
      skills: [],
      reviewlist: [],
      verified: false,
      imageProfileURL: profileimage,
      limitReview : 2,
    };
    this.fetch = this.fetch.bind(this);
    this.formatJPGtopath = this.formatJPGtopath.bind(this);
  }

  componentDidMount() {
    this.fetch();
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({ userId: LocalStorageService.getUserID() })
    }
  }
  formatJPGtopath(res) {
    return btoa(
      new Uint8Array(res.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        '',
      ),
    );
  }
  async fetch() {
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
    if (this.state.userId === LocalStorageService.getUserID()) {
      this.setState({ isMyProfile: true })
    } else {
      this.setState({ isMyProfile: false })
    }
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + LocalStorageService.getAccessToken();
    await axios
      .get(process.env.REACT_APP_BACKEND_URL + "/users/" + this.state.userId)
      .then(async (res) => {
        ////console.log(res);
        let body = res.data;
        let bdate = new Date(body.dateOfBirth);
        this.setState({realBirthDate : body.dateOfBirth})
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
        await axios.get(process.env.REACT_APP_BACKEND_URL + "/review/reviewee/"+this.state.userId)
          .then(res =>{
            console.log(res.data)
            let arr = res.data
            .filter((item)=>(LocalStorageService.getUserMode().toLowerCase() !== item.reviewerRole))
            this.setState({reviewlist : [...arr]})
          })
          .catch(err=>{
            this.setState({reviewlist : []})
            ////console.log(err);
          })
        await axios.get(process.env.REACT_APP_BACKEND_URL + "/users/profilePicture/" + this.state.userId, { responseType: 'arraybuffer' })
          .then(res => {
            this.setState({ imageProfileURL: "data:;base64," + this.formatJPGtopath(res) });
            ////console.log(res);
          })
          .catch(err => {
            ////console.log(err);
          })
        this.setState({
          data: body,
          fname: body.firstName,
          lname: body.lastName,
          headline: body.headline===null?"":body.headline,
          tel: body.phone === null ? "" : body.phone,
          email: body.email === null ? "" : body.email,
          website: body.website === null ? "" : body.website,
          location: body.location === null ? "" : body.location,
          about: body.about === null ? "" : body.about,
          birthdate: body.dateOfBirth === null ? "" : formatted_date,
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
        this.setState({ isLoaded: true });
      })
      .catch(async err => {
        ////console.log(this.state.isLoaded,this.state.err_count)
        let count = this.state.err_count+1
        await this.setState({err_count:count})
        if(this.state.err_count<2){
          this.fetch()
        }else{
          this.setState({ isLoaded: true });
        }
      })
  }
  handleShowReview=async()=>{
      if(this.state.limitReview+3>=this.state.reviewlist.length){
        ////console.log(this.state.limitReview+1)
        await this.setState({limitReview : this.state.reviewlist.length+1})
      }else{
        let prev = this.state.limitReview+3
        this.setState({limitReview : prev})
      }
  }
  renderReload() {
    return (<Spinner animation="border" role="status" className="loading">
      <span className="sr-only">Loading...</span>
    </Spinner>);
  }
  render() {
    if(this.state.err_count>=2){
      return <PageNotFoundNotAllow/>
    }
    if (!this.state.isLoaded) {
      return (
        <>
          {this.renderReload()}
        </>
      );
    }

    let verify_btn = (<VerifyDataModal
      id="verify-btn"
      userId={this.state.userId}
      hidden={!this.state.isMyProfile}
      onUpdate={this.fetch}
    />)
    return (
      <>
        <Container id="profile-container">
          <div className="row-5-xs shadow-sm" id="personal">
            <div className="row" id="pro-bg" style={{backgroundImage : "url("+profilebg+")"}}>
            </div>
            <div className="row " id="upper-second">
              <div className="col-3 mr " id="pro-img-frame">
                <div id="img-f">
                  <img src={this.state.imageProfileURL} className="pro-img" alt="youngstar logo" />
                  <ProfileImageModal id="profile-img"
                    userId={this.state.userId}
                    hidden={!this.state.isMyProfile}
                    onUpdate={this.fetch} />
                </div>
              </div>
              <div className="col-4">
                <div className="fname">{this.state.fname}</div>
                <div className="lname">{this.state.lname}</div>
                <div className="headline" hidden={this.state.headline === ""}>
                  {this.state.headline}
                </div>
              </div>
              <div className="col-1">
                {this.state.verified ? <IoMdCheckmarkCircleOutline size={30} color="green" /> : this.state.isMyProfile ? verify_btn : null}
              </div>
              <div className="col-1" id="edit">
                <ProfileModal
                  userId={this.state.userId}
                  data={this.state.data}
                  onUpdate={this.fetch}
                  hidden={!this.state.isMyProfile}
                  dateOfBirth= {this.state.realBirthDate}
                />
              </div>
            </div>
            <div className="row ">
              <div className="col-7" id="sub-second-one">
                <div>
                  <FiPhoneCall hidden={this.state.tel === ""} />
                  <p className="tel">{this.state.tel === "" ? this.state.tel : (this.state.tel.substr(0, 3) + "-" + this.state.tel.substr(3))}</p>
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
            <Container>
              {this.state.exp.length === 0
                ? "No information yet"
                : this.state.exp.map((item, idx) => (
                  <ExperienceListItem
                    key={idx}
                    role={item.role}
                    location={item.location}
                    year={item.year}
                  />
                ))}
            </Container>
            <div className="Edu">
              <h5>Education</h5>
              <EducationModal
                userId={this.state.userId}
                data={this.state.data}
                onUpdate={this.fetch}
                hidden={!this.state.isMyProfile}

              />
            </div>
              <Container>
              {this.state.education.length === 0
                ? "No information yet"
                : this.state.education.map((item, idx) => (
                  <EducationListItem key={idx} location={item.location} year={item.year} />
                ))}
            </Container>
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
            <Container>
           
            {this.state.skills.length === 0
              ? "No information yet"
              :  <ul>{this.state.skills.map((item, idx) => <li key={idx}>{item.skill}</li>)}</ul>}
            </Container>
          </div>
          <div className="row-1 shadow-sm" id="review" >
            <h5>Review by {LocalStorageService.getUserMode().toLowerCase()==="client"?"freelancer":"client"}</h5>
            {/// responsive problem div have more width than html width
              <Container>
              {this.state.reviewlist.length === 0
              ? "No information yet"
              : this.state.reviewlist
                .sort((x,y)=>{return y.score-x.score})
                .map((item,idx) =>
                idx+1>this.state.limitReview?null:
                <ReviewListItem
                  key={idx}
                  reviewTime={new Date(item.createdTime).toLocaleString()}
                  description={item.description}
                  score={item.score}
                  jobname={item.jobName}
                />
              )}
              <p hidden={this.state.reviewlist.length<=3||this.state.limitReview>this.state.reviewlist.length}
                onClick={this.handleShowReview}
               align="center" style={{textDecoration:"underline",cursor:"pointer"}}>show more</p>
              <p hidden={this.state.reviewlist.length<=3||this.state.limitReview<=this.state.reviewlist.length}onClick={()=>{this.setState({limitReview : 2})}}
               align="center" style={{textDecoration:"underline",cursor:"pointer"}}>show less</p>
             </Container>}
          </div>
        </Container>
      </>
    );
  }
}
class ReviewListItem extends React.Component {
  render() {
    return (
      <>
        <Container >
          <Row>
            <Col>
            <p >Job name : {this.props.jobname}</p>
            </Col>
          </Row>
          <Row hidden={this.props.description!==null&&this.props.description===""}>
            <Col>
            <p style={{textIndent:"5vh"}}>{this.props.description}</p>
            </Col>
          </Row>
          <Row>
            <Col>
            <p>score : <Rating style={{paddingTop:10,marginTop:10,bottom:0}} name="half-rating" value={this.props.score} precision={1} readOnly={true} /></p>
            </Col>
            <Col>
            <p align="right" style={{color:"gray"}}>since : {this.props.reviewTime}</p>
            </Col>
          </Row>
        </Container>
        <hr/>
      </>
    );
  }
}

export default Profile;
