import React, { useState, useEffect, Component } from "react";
import { Modal, Button, Form, Col, ModalTitle, InputGroup, FormControl} from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
axios.defaults.baseURL = "http://35.198.228.244:10000";
class ProfileModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersId: "",
      fname: "",
      lname: "",
      headline: "",
      tel: "",
      email: "",
      website: "",
      country: "",
      show: false,
      birthDate: new Date()
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleSave = this.handleSave.bind(this);
    if (
      this.props.data !== {} &&
      this.props.userId !== undefined &&
      this.props.userId !== ""
    ) {
      let body = this.props.data;
      console.log(body);
      if (
        body.location !== undefined &&
        body.location !== "" &&
        body.location.split(" ").length > 0
      ) {
        this.setState({ country: body.location.split(",")[0] });
        this.setState({
          address: body.location
            .split(",")
            .shift()
            .join()
        });
      }

      this.setState({
        usersId: this.props.userId,
        fname: body.firstName,
        lname: body.lastName,
        headline: "",
        tel: body.phone,
        email: body.email,
        website: body.website,
        birthdate: new Date(this.props.data)
      });
    }
  }
  componentDidMount() {
    if (
      this.props.data !== {} &&
      this.props.userId !== undefined &&
      this.props.userId !== ""
    ) {
      let body = this.props.data;
      console.log(body);
      try {
        if (
          body.location !== undefined &&
          body.location !== "" &&
          body.location.split(" ").length > 0
        ) {
          console.log(body.location.split(",").shift());
          let arr = body.location.split(",");
          this.setState({ country: arr[0] });
          arr.shift();
          this.setState({ address: arr.join() });
        }
      } catch (e) {
        console.log(e);
      }

      this.setState({
        usersId: this.props.userId,
        fname: body.firstName,
        lname: body.lastName,
        headline: "",
        tel: body.phone,
        email: body.email,
        website: body.website,
        birthdate: new Date(this.props.data.dateOfBirth)
      });
    }
  }
  handleClose() {
    this.setState({ show: false });
  }
  handleShow() {
    this.setState({ show: true });
    this.componentDidMount();
  }
  handleSave() {
    axios
      .patch("/users/" + this.state.usersId, {
        firstName: this.state.fname,
        lastName: this.state.lname,
        tel: this.state.tel,
        email: this.state.email,
        website: this.state.website,
        dateOfBirth: this.state.birthDate,
        location: this.state.country + "," + this.state.address
      })
      .then(res => {
        console.log(res);
        this.handleClose();
        this.props.onUpdate(this.state.usersId);
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <>
        <button
          type="button"
          className="btn"
          id="e-link"
          onClick={this.handleShow}
          hidden={this.props.hidden}
        >
          <FaRegEdit size={20} id="edit-icon" />
        </button>

        <Modal size="lg" show={this.state.show} onHide={this.handleClose}>
          <Modal.Header className="modalHead" closeButton>
            <Modal.Title>Personal Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="fullName">
                <Form.Row>
                  <Col md="4">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      defaultValue={this.state.fname}
                      onChange={e => {
                        this.setState({ fname: e.target.value });
                      }}
                    />
                  </Col>
                  <Col md="4">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      defaultValue={this.state.lname}
                      onChange={e => {
                        this.setState({ lname: e.target.value });
                      }}
                    />
                  </Col>
                </Form.Row>
              </Form.Group>
              <Form.Group controlId="Headline">
                <Form.Row>
                  <Form.Label>Headline</Form.Label>
                  <Form.Control defaultValue="" as="textarea" />
                </Form.Row>
              </Form.Group>
              <Form.Label>Date of birth</Form.Label>
              <Form.Row>
                <DatePicker
                  selected={this.state.birthDate}
                  onChange={d => this.setState({ birthDate: d })}
                />
              </Form.Row>

              <Form.Group controlId="location">
                <Form.Row>
                  <Col md="4">
                    <Form.Label>Country/Region</Form.Label>
                    <Form.Control
                      defaultValue={this.state.country}
                      onChange={e => {
                        this.setState({ country: e.target.value });
                      }}
                    />
                  </Col>
                  <Col md="4">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      as="textarea"
                      defaultValue={this.state.address}
                      onChange={e => {
                        this.setState({ address: e.target.value });
                      }}
                    />
                  </Col>
                </Form.Row>
              </Form.Group>
              <Form.Group controlId="phone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  defaultValue={this.state.tel}
                  onChange={e => {
                    this.setState({ tel: e.target.value });
                  }}
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  defaultValue={this.state.email}
                  onChange={e => {
                    this.setState({ email: e.target.value });
                  }}
                />
              </Form.Group>
              <Form.Group controlId="website">
                <Form.Label>Website</Form.Label>
                <Form.Control
                  defaultValue={this.state.website}
                  onChange={e => {
                    this.setState({ website: e.target.value });
                  }}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.handleSave}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersId: "",
      about: "",
      show: false
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleSave = this.handleSave.bind(this);
    if (
      this.props.data !== {} &&
      this.props.userId !== undefined &&
      this.props.userId !== ""
    ) {
      let body = this.props.data;

      this.setState({
        usersId: this.props.userId,
        about: body.about
      });
    }
  }
  componentDidMount() {
    if (
      this.props.data !== {} &&
      this.props.userId !== undefined &&
      this.props.userId !== ""
    ) {
      let body = this.props.data;

      this.setState({
        usersId: this.props.userId,
        about: body.about
      });
    }
  }
  handleClose() {
    this.setState({ show: false });
  }
  handleShow() {
    this.setState({ show: true });
    this.componentDidMount();
  }
  handleSave() {
    console.log(this.state.about);
    axios
      .patch("/users/" + this.state.usersId, {
        about: this.state.about
      })
      .then(res => {
        console.log(res);
        this.handleClose();
        this.props.onUpdate(this.state.usersId);
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <>
        <button
          type="button"
          className="btn"
          id="e-link"
          onClick={this.handleShow}
          hidden={this.props.hidden}
        >
          <FaRegEdit size={20} id="edit-icon" />
        </button>

        <Modal size="lg" show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton className="modalHead">
            <ModalTitle>About</ModalTitle>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="Headline">
              <Form.Row>
                <Form.Control
                  placeholder="write something"
                  defaultValue={this.state.about}
                  as="textarea"
                  onChange={e => {
                    this.setState({ about: e.target.value });
                  }}
                />
              </Form.Row>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.handleSave}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
class ExperienceModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersId: "",
      role: "",
      location: "",
      year: "",
      experiences: [],
      show: false
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this,);
    this.showEditList = this.showEditList.bind(this);
    if (
      this.props.data !== {} &&
      this.props.userId !== undefined &&
      this.props.userId !== ""
    ) {
      let body = this.props.data;
      if (body.experience instanceof Array) {
        this.setState({
          experience: body.experience
        });
      }
      this.setState({
        usersId: this.props.userId
      });
    }
  }
  componentDidMount() {
    if (
      this.props.data !== {} &&
      this.props.userId !== undefined &&
      this.props.userId !== ""
    ) {
      let body = this.props.data;
      if (body.experience instanceof Array) {
        this.setState({
          experiences: body.experience
        });
      }
      this.setState({
        usersId: this.props.userId
      });
    }
    console.log(this.state.experiences);
  }
  handleClose() {
    this.setState({ show: false });
  }
  handleShow() {
    this.setState({ show: true });
    this.componentDidMount();
  }
  handleSave() {
    axios
      .patch("/users/" + this.state.usersId, {
        about: this.state.about
      })
      .then(res => {
        console.log(res);
        this.handleClose();
        this.props.onUpdate(this.state.usersId);
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleAdd() {
    let arr = this.state.experiences;
    arr.push({
      role: this.state.role,
      location: this.state.location,
      year: this.state.year
    });
    this.setState({ experiences : arr });
  }
  handleDelete(index) {
    let arr = this.state.experiences;
    arr.splice(index, 1);
    this.setState({ experience: arr });
  }
  handleEdit(index, word) {
    let arr = this.state.experiences;
    arr.splice(index, 1, word);
    this.setState({ experience: arr });
  }

  showEditList() {
    return this.state.experiences.length === 0? <h1>Add something</h1> : this.state.experiences.map((item,i) => (
      <ExperienceEditList 
        index = {i}
        location = {item.location}
        role = {item.role}
        year = {item.year}
        onEdit = {this.handleEdit}
      />
    ));
  }
  render() {
    return (
      <>
        <button
          type="button"
          className="btn"
          id="e-link"
          onClick={this.handleShow}
          hidden={this.props.hidden}
        >
          <FaRegEdit size={20} id="edit-icon" />
        </button>

        <Modal size="lg" show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <ModalTitle>Experience</ModalTitle>
          </Modal.Header>
          <Modal.Body>
          {this.showEditList()}
          <Form.Row>
            <Col md="3">
              <Form.Control
                defaultValue={this.state.role}
                onChange={(e) => {
                  this.setState({role : e.target.value});
                }}
                hidden={false}
              />
            </Col>
            <Col md="1">
              <Button
                variant="primary"
                onClick={() => this.handleAdd()}
                hidden={false}
              >
                ADD
              </Button>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col md="3">
              <Form.Control
                defaultValue={this.state.location}
                onChange={(e) => {
                  this.setState({location : e.target.value});
                }}
                hidden={false}
              />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col md="3">
              <Form.Control
                defaultValue={this.state.year}
                onChange={(e) => {
                  this.setState({year : e.target.value});
                }}
                hidden={false}
              />
            </Col>
          </Form.Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.handleSave}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
class ExperienceEditList extends Component{
  constructor(props){
    super(props);
    this.state = {
      index : "",
      editable : false,
      role : "",
      location : "",
      year : "",
    };
    this.setState({index : this.props.index, role : this.props.role, location : this.props.location, year : this.props.year})
    this.handleEdit = this.handleEdit.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  handleEdit(){
    let exp = {role : this.state.role,location : this.state.location, year : this.state.year}
    this.props.onEdit(exp);
    this.toggle();
  }
  toggle(){
    let prev = this.state.editable;
    this.setState({editable : !prev});
  }
  componentDidMount(){
    this.setState({index : this.props.index, role : this.props.role, location : this.props.location, year : this.props.year})

  }
  render(){
    console.log(this.state.editable)
    if (this.state.editable) {
      return (
        <>
          <Form.Row hidden={this.state.editable}>
            <Form.Control placeholder="role" defaultValue ={this.state.role} onChange={(e)=>{this.setState({role : e.target.value})}}/>
            <Form.Control placeholder="location" defaultValue ={this.state.location} onChange={(e)=>{this.setState({location : e.target.value})}}/>
            <Form.Control placeholder="year" defaultValue ={this.state.year} onChange={(e)=>{this.setState({year : e.target.value})}}/>
          </Form.Row>
          <button type="button" className="btn" onClick={this.handleEdit}>
              OK
          </button>
        </>
      );
  } else {
    return (
      <>
        <div className="exp-box">
          <p className="strong">{this.state.role}</p>
          <p className="normal">{this.state.location}</p>
          <p className="weak">{this.state.year}</p>
        </div>
        <button type="button" className="btn" onClick={this.toggle}>
              Edit
          </button>
      </>
    );
  }
  }
}

const EduacationModal = props => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <button
        type="button"
        className="btn"
        id="e-link"
        onClick={handleShow}
        hidden={props.hidden}
      >
        <FaRegEdit size={20} id="edit-icon" />
      </button>

      <Modal>
        <Modal.Header closeButton>
          <ModalTitle>Experience</ModalTitle>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};


const SkillModal = props => {
  const [skills, setSkills] = useState(props.Skills);
  const [show, setShow] = useState(false);
  const [dis, setDis] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [skill, setSkill] = useState("");
  const addSkill = item => {
    let arr = skills;
    if (skill === "") return;
    arr.push(item);
    setSkills(arr);
    if (skills.length >= 5) {
      setDis(true);
    }
    setSkill("");
  };
  const deleteSkill = idx => {
    let arr = skills.slice();
    if (arr.length < 1) return;
    arr.splice(idx, 1);
    setSkills(arr);
    if (skills.length <= 5) {
      setDis(false);
    }
    console.log(arr);
  };
  const editSkill = (name, idx) => {
    if (idx < 0 || idx >= skills.length) return;
    if (name === "") return;
    let arr = skills.slice();
    arr[idx] = name;

    setSkills(arr);
  };

  const data = skills.map((item, i) => {
    return (
      <>
        <SkillListItem
          key={Math.round(Math.random() * 1000)} //React use key to check that wheter the item was deleted.
          Skill={item}
          Index={i}
          ListOnly={false}
          onEdit={editSkill.bind(this)}
          onDelete={deleteSkill.bind(this, i)}
        />
      </>
    );
  });
  const fetchData = () => {
    console.log(skills);
    props.onChange(skills);
    handleClose();
  };
  //useEffect(fetchData,);

  return (
    <>
      <button
        type="button"
        className="btn"
        id="e-link"
        onClick={handleShow}
        hidden={props.hidden}
      >
        <FaRegEdit size={20} id="edit-icon" />
      </button>

      <Modal size="lg" show={show} onHide={handleClose} onExit={fetchData}>
        <Modal.Header className="modalHead" closeButton>
          <ModalTitle>Skills</ModalTitle>
        </Modal.Header>
        <Modal.Body>
          {data}
          <Form.Row>
            <Col md="3">
              <Form.Control
                value={skill}
                onChange={e => {
                  setSkill(e.target.value);
                }}
                hidden={dis}
              />
            </Col>
            <Col md="1">
              <Button
                variant="primary"
                onClick={() => addSkill(skill)}
                hidden={dis}
              >
                ADD
              </Button>
            </Col>
          </Form.Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={fetchData}>
            Cancel
          </Button>
          <Button variant="primary" onClick={fetchData}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const SkillListItem = props => {
  const [skill, setSkill] = useState(props.Skill);
  const index = props.Index;
  let listOnly = props.ListOnly;
  const [edit, setEdit] = useState(false);
  if (listOnly) {
    return (
      <>
        <p className="skill-list">{skill}</p>
      </>
    );
  }
  if (edit) {
    return (
      <>
        <Form.Row>
          <Col md="3">
            <Form.Control
              value={skill}
              onChange={e => setSkill(e.target.value)}
            />
          </Col>
          <Col>
            <button
              type="button"
              className="btn"
              onClick={() => {
                setEdit(false);
                props.onEdit(skill, index);
              }}
            >
              edit
            </button>
          </Col>
        </Form.Row>
      </>
    );
  } else {
    return (
      <>
        <p>
          {skill}
          <button type="button" className="btn" onClick={() => setEdit(true)}>
            edit
          </button>
          <button type="button" className="btn" onClick={props.onDelete}>
            Delete
          </button>
        </p>
      </>
    );
  }
};


class ExperienceListItem extends Component{
  constructor(props){
    super(props);
    this.setState({role : this.props.role, location : this.props.location, year : this.props.year})
  }
  render(){
    
    return (
      <>
        <div className="exp-box">
          <p className="strong">{this.props.role}</p>
          <p className="normal">{this.props.location}</p>
          <p className="weak">{this.props.year}</p>
        </div>
      </>
    );
  
  }
}
const EducationListItem = props => {
  return (
    <>
      <div className="edu-box">
        <p className="strong">{props.location}</p>
        <p className="weak">{props.year}</p>
      </div>
    </>
  );
};
export {
  ProfileModal,
  SkillListItem,
  SkillModal,
  About,
  EducationListItem,
  ExperienceListItem,
  ExperienceModal
};


/*
{data.Patient.map(items => <CardPatient
  Fname={items.Fname}
  Lname={items.Lname}
  Gender={items.Gender}
  BirthDate={items.BirthDate}
  PatientID={items.PatientID}
  Tel={items.Tel}
  CousinTel={items.CousinTel}
  CID={items.Case}
  Address={items.Address} />)}
  */
