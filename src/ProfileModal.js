import React, { Component } from "react";
import { Modal, Button, Form, Col, ModalTitle, Table, Spinner } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import ImageUploader from "./ImageUploader"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import LocalStorageService from './LocalStorageService';
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
          body.location.split(",").length > 0
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
        headline: body.headline,
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
      .patch(process.env.REACT_APP_BACKEND_URL+"/users/" + this.state.usersId, {
        firstName: this.state.fname,
        lastName: this.state.lname,
        headline: this.state.headline,
        phone: this.state.tel,
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
                  <Form.Label>Headline</Form.Label>
                  <Form.Control
                    defaultValue={this.state.headline}
                    as="textarea"
                    onChange={e => {
                      this.setState({ headline: e.target.value });
                    }}
                  />
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
                  value={this.state.tel}
                  onChange={e => {
                    if(e.target.value.length >10){
                      return;
                    }
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
            <Button variant="outline-danger" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button variant="outline-success " onClick={this.handleSave}>
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
      .patch(process.env.REACT_APP_BACKEND_URL+"/users/" + this.state.usersId, {
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
            <Button variant="outline-danger" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button variant="outline-success" onClick={this.handleSave}>
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
      limit: false,
      experiences: [],
      show: false
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.showEditList = this.showEditList.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount() {
    if (
      this.props.data !== {} &&
      this.props.userId !== undefined &&
      this.props.userId !== ""
    ) {
      let body = this.props.data;
      if (body.experience instanceof String) {
        let json_arr = JSON.parse(body.experience);
        this.setState({
          experiences: json_arr
        });
      }
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
    let json = JSON.stringify(this.state.experiences);
    console.log(json);
    axios
      .patch(process.env.REACT_APP_BACKEND_URL+"/users/" + this.state.usersId, {
        experience: json
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
    if (
      this.state.role === "" ||
      this.state.location === "" ||
      this.state.year === ""
    )
      return alert("please fill at least 1 character");
    let arr = this.state.experiences;
    arr.push({
      role: this.state.role,
      location: this.state.location,
      year: this.state.year
    });
    this.setState({ role: "", location: "", year: "", experiences: arr });
    if (this.state.experiences.length >= 3) {
      this.setState({ limit: true });
    }
  }
  handleDelete(index) {
    let arr = this.state.experiences;
    arr.splice(index, 1);
    this.setState({ experiences: arr });
    if (this.state.experiences.length < 3) {
      this.setState({ limit: false });
    }
  }
  handleEdit(index, word) {
    let arr = this.state.experiences;
    arr.splice(index, 1, word);
    this.setState({ experience: arr });
  }

  showEditList() {
    return this.state.experiences.length === 0 ? (
      <h1>Add something</h1>
    ) : (
      this.state.experiences.map((item, i) => (
        <ExperienceEditList
          key={Math.round(Math.random() * 1000)}
          index={i}
          location={item.location}
          role={item.role}
          year={item.year}
          onEdit={this.handleEdit}
          onDelete={this.handleDelete}
        />
      ))
    );
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
            <ModalTitle>Experience</ModalTitle>
          </Modal.Header>
          <Modal.Body>
            <Table>
              <tbody>{this.showEditList()}</tbody>
            </Table>
            <Form.Row hidden={this.state.limit}>
              <Col md="3">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  placeholder="role"
                  value={this.state.role}
                  onChange={e => {
                    this.setState({ role: e.target.value });
                  }}
                  hidden={false}
                />
              </Col>
              <Col md="3">
                <Form.Label>At</Form.Label>
                <Form.Control
                  placeholder="location"
                  value={this.state.location}
                  onChange={e => {
                    this.setState({ location: e.target.value });
                  }}
                  hidden={false}
                />
              </Col>
              <Col md="3">
                <Form.Label>Since</Form.Label>
                <Form.Control
                  placeholder="year"
                  value={this.state.year}
                  onChange={e => {
                    this.setState({ year: e.target.value });
                  }}
                  hidden={false}
                />
              </Col>
              <Col md="1" id="Add-btn">
                <Button
                  variant="primary"
                  onClick={() => this.handleAdd()}
                  hidden={false}
                >
                  Add
                </Button>
              </Col>
            </Form.Row>
            <Form.Row></Form.Row>
            <Form.Row></Form.Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-danger" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button variant="outline-success" onClick={this.handleSave}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

class ExperienceEditList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: "",
      editable: false,
      role: "",
      location: "",
      year: ""
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  handleEdit() {
    if (
      this.state.role === "" ||
      this.state.location === "" ||
      this.state.year === ""
    )
      return alert("please fill at least 1 character");
    let exp = {
      role: this.state.role,
      location: this.state.location,
      year: this.state.year
    };
    this.props.onEdit(this.state.index, exp);
    this.toggle();
  }
  handleDelete() {
    this.props.onDelete(this.state.index);
  }
  toggle() {
    let prev = this.state.editable;
    this.setState({ editable: !prev });
  }
  componentDidMount() {
    this.setState({
      index: this.props.index,
      role: this.props.role,
      location: this.props.location,
      year: this.props.year
    });
  }
  render() {
    console.log(this.state.editable);
    if (this.state.editable) {
      return (
        <>
          <tr>
            <th>
              <Form.Row md="1">
                <Form.Control
                  placeholder="role"
                  defaultValue={this.state.role}
                  onChange={e => {
                    this.setState({ role: e.target.value });
                  }}
                />
                <Form.Control
                  placeholder="location"
                  defaultValue={this.state.location}
                  onChange={e => {
                    this.setState({ location: e.target.value });
                  }}
                />
                <Form.Control
                  placeholder="year"
                  defaultValue={this.state.year}
                  onChange={e => {
                    this.setState({ year: e.target.value });
                  }}
                />
              </Form.Row>
            </th>
            <th>
              <button type="button" className="btn" onClick={this.handleEdit}>
                OK
              </button>
            </th>
            <th>
              <button type="button" className="btn" onClick={this.handleDelete}>
                Delete
              </button>
            </th>
          </tr>
        </>
      );
    } else {
      return (
        <>
          <tr>
            <th>
              <p className="strong">Role : {this.state.role}</p>
              <p className="normal">At : {this.state.location}</p>
              <p className="weak">Since : {this.state.year}</p>
            </th>
            <th>
              <button type="button" className="btn" onClick={this.toggle}>
                Edit
              </button>
            </th>
            <th>
              <button type="button" className="btn" onClick={this.handleDelete}>
                Delete
              </button>
            </th>
          </tr>
        </>
      );
    }
  }
}

///////////////////////////////////////////
class EducationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersId: "",
      location: "",
      year: "",
      limit: false,
      edu: [],
      show: false
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.showEditList = this.showEditList.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount() {
    if (
      this.props.data !== {} &&
      this.props.userId !== undefined &&
      this.props.userId !== ""
    ) {
      let body = this.props.data;
      if (body.education instanceof Array) {
        this.setState({
          edu: body.education
        });
      }
      this.setState({
        usersId: this.props.userId
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
    let json = JSON.stringify(this.state.edu);
    console.log(json);
    axios
      .patch(process.env.REACT_APP_BACKEND_URL+"/users/" + this.state.usersId, {
        education: json
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
    if (this.state.location === "" || this.state.year === "")
      return alert("please fill at least 1 character");
    let arr = this.state.edu;
    arr.push({
      location: this.state.location,
      year: this.state.year
    });
    this.setState({ role: "", location: "", year: "", experiences: arr });
    if (this.state.edu.length >= 3) {
      this.setState({ limit: true });
    }
  }
  handleDelete(index) {
    let arr = this.state.edu;
    arr.splice(index, 1);
    this.setState({ edu: arr });
    if (this.state.edu.length < 3) {
      this.setState({ limit: false });
    }
  }
  handleEdit(index, word) {
    let arr = this.state.edu;
    arr.splice(index, 1, word);
    this.setState({ edu: arr });
  }

  showEditList() {
    return this.state.edu.length === 0 ? (
      <h1>Add something</h1>
    ) : (
      this.state.edu.map((item, i) => (
        <EducationEditList
          key={Math.round(Math.random() * 1000)}
          index={i}
          location={item.location}
          year={item.year}
          onEdit={this.handleEdit}
          onDelete={this.handleDelete}
        />
      ))
    );
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
            <ModalTitle>Education</ModalTitle>
          </Modal.Header>
          <Modal.Body>
            <Table>
              <tbody>{this.showEditList()}</tbody>
            </Table>
            <Form.Row hidden={this.state.limit}>
              <Col md="3">
                <Form.Label>At</Form.Label>
                <Form.Control
                  placeholder="location"
                  value={this.state.location}
                  onChange={e => {
                    this.setState({ location: e.target.value });
                  }}
                  hidden={false}
                />
              </Col>
              <Col md="3">
                <Form.Label>Since</Form.Label>
                <Form.Control
                  placeholder="year"
                  value={this.state.year}
                  onChange={e => {
                    this.setState({ year: e.target.value });
                  }}
                  hidden={false}
                />
              </Col>
              <Col md="1" id="Add-btn">
                <Button
                  variant="primary"
                  onClick={this.handleAdd}
                  hidden={false}
                >
                  Add
                </Button>
              </Col>
            </Form.Row>
            <Form.Row></Form.Row>
            <Form.Row></Form.Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-danger" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button variant="outline-success" onClick={this.handleSave}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

class EducationEditList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: "",
      editable: false,
      location: "",
      year: ""
    };

    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  handleEdit() {
    if (this.state.location === "" || this.state.year === "")
      return alert("please fill at least 1 character");
    let ed = { location: this.state.location, year: this.state.year };
    this.props.onEdit(this.state.index, ed);
    this.toggle();
  }
  handleDelete() {
    this.props.onDelete(this.state.index);
  }
  toggle() {
    let prev = this.state.editable;
    this.setState({ editable: !prev });
  }
  componentDidMount() {
    this.setState({
      index: this.props.index,
      location: this.props.location,
      year: this.props.year
    });
  }
  render() {
    console.log(this.state.editable);
    if (this.state.editable) {
      return (
        <>
          <tr>
            <th>
              <Form.Row md="1">
                <Form.Control
                  placeholder="location"
                  defaultValue={this.state.location}
                  onChange={e => {
                    this.setState({ location: e.target.value });
                  }}
                />
                <Form.Control
                  placeholder="year"
                  defaultValue={this.state.year}
                  onChange={e => {
                    this.setState({ year: e.target.value });
                  }}
                />
              </Form.Row>
            </th>
            <th>
              <button type="button" className="btn" onClick={this.handleEdit}>
                OK
              </button>
            </th>
            <th>
              <button type="button" className="btn" onClick={this.handleDelete}>
                Delete
              </button>
            </th>
          </tr>
        </>
      );
    } else {
      return (
        <>
          <tr>
            <th>
              <p className="normal">At : {this.state.location}</p>
              <p className="weak">Since : {this.state.year}</p>
            </th>
            <th>
              <button type="button" className="btn" onClick={this.toggle}>
                Edit
              </button>
            </th>
            <th>
              <button type="button" className="btn" onClick={this.handleDelete}>
                Delete
              </button>
            </th>
          </tr>
        </>
      );
    }
  }
}

class SkillModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numOflimit: 10,
      usersId: "",
      skill: "",
      limit: false,
      skills: [],
      show: false
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.showEditList = this.showEditList.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount() {
    if (
      this.props.data !== {} &&
      this.props.userId !== undefined &&
      this.props.userId !== ""
    ) {
      let body = this.props.data;
      console.log(this.props.data)
      if (body.skills instanceof Array) {
        this.setState({
          skills: body.skills
        },console.log(body.skills));
      }
      this.setState({
        usersId: this.props.userId
      });
    }
    console.log(this.state.skills);
  }
  handleClose() {
    this.setState({ show: false });
    
  }
  handleShow() {
    this.setState({ show: true });
    this.componentDidMount();
  }
  handleSave() {
    console.log(this.state.usersId)
    axios
      .patch(process.env.REACT_APP_BACKEND_URL+"/users/" + this.state.usersId, {
        skills: this.state.skills
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
    if (this.state.skill === "") return;
    let arr = this.state.skills;
    arr.push({skill:this.state.skill});
    this.setState({ skill: "", skills: arr });
    if (this.state.skills.length >= this.state.numOflimit) {
      this.setState({ limit: true });
    }
  }
  handleDelete(index) {
    let arr = this.state.skills;
    arr.splice(index, 1);
    this.setState({ skills: arr });
    if (this.state.skills.length < this.state.numOflimit) {
      this.setState({ limit: false });
    }
  }
  handleEdit(index, word) {
    let arr = this.state.skills;
    arr.splice(index, 1, {skill:word});
    this.setState({ skills: arr });
  }

  showEditList() {
    return this.state.skills.length === 0 ? (
      <h1>Add something</h1>
    ) : (
      this.state.skills.map((item, i) => (
        <SkillEditList
          key={Math.round(Math.random() * 1000)}
          index={i}
          skill={item.skill}
          onEdit={this.handleEdit}
          onDelete={this.handleDelete}
        />
      ))
    );
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
            <ModalTitle>Skill</ModalTitle>
          </Modal.Header>
          <Modal.Body>
            <Table>
              <tbody>{this.showEditList()}</tbody>
            </Table>
            <Form.Row hidden={this.state.limit}>
              <Col md="3">
                <Form.Label>Skill</Form.Label>
                <Form.Control
                  placeholder="skill"
                  value={this.state.skill}
                  onChange={e => {
                    this.setState({ skill: e.target.value });
                  }}
                />
              </Col>
              <Col md="1" id="Add-btn">
                <Button variant="primary" onClick={() => this.handleAdd()}>
                  Add
                </Button>
              </Col>
            </Form.Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-danger" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button variant="outline-success" onClick={this.handleSave}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

class SkillEditList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: "",
      editable: false,
      skill: ""
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  handleEdit() {
    if (this.state.skill === "")
      return alert("pleas fill at least 1 character");
    let skill = this.state.skill;
    this.props.onEdit(this.state.index, skill);
    this.toggle();
  }
  handleDelete() {
    this.props.onDelete(this.state.index);
  }
  toggle() {
    let prev = this.state.editable;
    this.setState({ editable: !prev });
    
  }
  componentDidMount() {
    this.setState({ index: this.props.index, skill: this.props.skill });
  }
  render() {
    console.log(this.state.editable);
    if (this.state.editable) {
      return (
        <>
          <tr>
            <th>
              <Form.Row md="1">
                <Form.Control
                  placeholder="skill"
                  defaultValue={this.state.skill}
                  onChange={e => {
                    this.setState({ skill: e.target.value });
                  }}
                />
              </Form.Row>
            </th>
            <th>
              <button type="button" className="btn" onClick={this.handleEdit}>
                OK
              </button>
            </th>
            <th>
              <button type="button" className="btn" onClick={this.handleDelete}>
                Delete
              </button>
            </th>
          </tr>
        </>
      );
    } else {
      return (
        <>
          <tr>
            <th>
              <p className="skill-list">{this.state.skill}</p>
            </th>
            <th>
              <button type="button" className="btn" onClick={this.toggle}>
                Edit
              </button>
            </th>
            <th>
              <button type="button" className="btn" onClick={this.handleDelete}>
                Delete
              </button>
            </th>
          </tr>
        </>
      );
    }
  }
}

class SkillListItem extends Component {
  render() {
    return (
      <>
        <p className="skill-list">{this.props.skill.skill}</p>
      </>
    );
  }
}
class ExperienceListItem extends Component {
  render() {
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
class EducationListItem extends Component {
  render() {
    return (
      <>
        <div className="exp-box">
          <p className="strong">{this.props.location}</p>
          <p className="weak">{this.props.year}</p>
        </div>
      </>
    );
  }
}

class ReviewListItem extends Component {
  render() {
    return (
      <>
        <div className="review-box">
          <p>{this.props.reviewername}</p>
          <p>{this.props.description}</p>
          <p>score : {this.props.score}</p>
          <p>{this.props.jobname}</p>
        </div>
      </>
    );
  }
}

class ProfileImageModal extends Component {
  constructor(props){
    super(props);
    this.state={
      upload : false,
      show:false,
      userId:null,
      file : null,
      isUploading : false,
      error : null,
    }
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handlerUpload = this.handlerUpload.bind(this,);
  }
  handleClose=async()=>{
    await this.setState({file:null,show:false,error : null})
  }
  handleShow(){
    this.setState({show:true})
  }
  handleSave(){
    this.handlerUpload()
  }
  componentDidMount(){
    this.setState({userId : this.props.userId})
  }
  handleSetImage=(fd)=>{
    console.log(fd)
    this.setState({file:fd})
  }
  handlerUpload=async(fd=this.state.file)=>{
        if(fd===null){
          this.setState({error:"image cannot be null"})
        }
        if(!(fd instanceof FormData)){
          return;
        }
        await this.setState({isUploading : true})
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + LocalStorageService.getAccessToken();
        await axios({
          method: 'post',
          url: process.env.REACT_APP_BACKEND_URL+"/users/profilePicture/" + this.state.userId,
          data: fd,
          headers: {'Content-Type': 'multipart/form-data' }
          })
        .then(res => {
            console.log(res);
            this.handleClose();
            this.props.onUpdate();
          })
        .catch(err => {
          console.log(err);
        })
        .finally(()=>{
          this.setState({isUploading:false})
        })
  }
  render(){
    if(this.state.upload){
      this.setState({upload:false})
    }
    return (
      <>
      <button
          type="button"
          id= {this.props.id}
          onClick={this.handleShow}
          hidden={this.props.hidden}
        >
          <p>change profile image</p>
        </button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header className="modalHead" closeButton>
            <ModalTitle>Profile Image</ModalTitle>
          </Modal.Header>
          <Modal.Body>
            <ImageUploader handlerUpload={this.handleSetImage} error={this.state.error}/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-danger" onClick={this.handleClose} disabled={this.state.isUploading}>
              Cancel
            </Button>
            <Button variant="outline-success" onClick={this.handleSave} disabled={this.state.isUploading}>
              Save{' '}
              {this.state.isUploading?
               <Spinner
               as="span"
               animation="border"
               size="sm"
               role="status"
               aria-hidden="true"
             />
              :null}
            </Button>
          </Modal.Footer>
        </Modal>
    </>
    )
  }
}

class VerifyDataModal extends Component{
  constructor(props){
    super(props)
    this.state = {
      upload : false,
      show:false,
      userId:null,
      SSN:"",
      file_selfie: null,
      file_card:null,
      error : {err0 : null,err1 : null,err2:null},
      isUploading : false,
      loadData : false,
    }
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handlerUploadSelfie = this.handlerUploadSelfie.bind(this,);
    this.handlerUploadNationalIDcard = this.handlerUploadNationalIDcard.bind(this,);
  }
  
  handleClose(){
    this.setState({show:false})
  }
  handleShow(){
    this.setState({show:true})
  }

  handleSave =async()=>{
    console.log(this.state.file_card instanceof FormData)
    if(this.state.SSN===""||this.state.SSN.length<13){
      await this.setState({error:{...(this.state.error),err0:"National ID must have 13 numbers"}})
    }else{
      await this.setState({error:{...(this.state.error),err0:null}})
    }
    if(!(this.state.file_card instanceof FormData)){
      await this.setState({error:{...(this.state.error),err1:"image cannot be null"}})
    }else{
      await this.setState({error:{...(this.state.error),err1:null}})
    }
    if(!(this.state.file_selfie instanceof FormData)){
      await this.setState({error:{...(this.state.error),err2:"image cannot be null"}})
    }else{
      await this.setState({error:{...(this.state.error),err2:null}})
    }
    if(this.state.error.err0!==null||this.state.error.err1!==null
      ||this.state.error.err2!==null){
      return
    }
    console.log("d",this.state.error.err0,this.state.error.err1,this.state.error.err2)
    this.setState({isUploading:true})
    await axios.patch(process.env.REACT_APP_BACKEND_URL+"/users/"+this.props.userId,
      {
        identificationNumber : this.state.SSN
      }
    )
    .then(res => {
      console.log(res);
      this.handlerUploadSelfie();
      this.handlerUploadNationalIDcard();
      this.props.onUpdate();
      this.handleClose();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(()=>{
      this.setState({isUploading:false})
    })
  }
  handleWrite=(e)=>{
    let format = /^$|[0-9]+$/i.test(e.target.value)?(e.target.value):this.state.SSN;
    if(format && format.length >13){
      return;
    }
    this.setState({SSN:format})
  }
  async handlerUploadNationalIDcard(fd=this.state.file_card){
    let error = {err1:null,}
    if(!(fd instanceof FormData)){
      console.log("fd is null")
      return;
    }
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + LocalStorageService.getAccessToken();
    await axios({
      method: 'post',
      url: process.env.REACT_APP_BACKEND_URL+"/users/IDCard/" + this.state.userId,
      data: fd,
      headers: {'Content-Type': 'multipart/form-data' }
      })
    .catch(err => {
      error.err1 = err;
      console.log(err);
    });
  }
  async handlerUploadSelfie(fd=this.state.file_selfie){
    let error = {err1:null,}
    if(!(fd instanceof FormData)){
      console.log("fd is null")
      return;
    }
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + LocalStorageService.getAccessToken();
    await axios({
      method: 'post',
      url: process.env.REACT_APP_BACKEND_URL+"/users/IDCardWithFace/" + this.state.userId,
      data: fd,
      headers: {'Content-Type': 'multipart/form-data' }
      })
    .catch(err => {
      error.err1 = err;
      console.log(err);
    });
    
  }
  componentDidMount=async()=>{
    await this.setState({userId : this.props.userId,loadData:true})
  }
  handleSetSelfie=(fd)=>{
    this.setState({file_selfie:fd})
  }
  handleSetCard=(fd)=>{
    this.setState({file_card:fd})
  }
  onExit=async()=>{
   await this.setState({
      userId:null,
      SSN:"",
      file_card : null,
      file_selfie : null,
      error : {err0 : null,err1 : null,err2:null},
    })
      
  }
  render(){
    if(!this.state.loadData){
      return "load";
    }
    return (
      <>
      <button
          type="button"
          id= {this.props.id}
          onClick={this.handleShow}
          hidden={this.props.hidden}
          className = "btn btn-outline-secondary "
        >
          verify
        </button>
        <Modal show={this.state.show} onHide={this.handleClose} onExited={this.onExit}>
          <Modal.Header className="modalHead" closeButton>
            <Modal.Title>Verify</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Label>National ID</Form.Label>
            <Col>
            <Form.Control
              placeholder="1234567890123"
              value={this.state.SSN}
              onChange={this.handleWrite}
              />
            <p className="unauthorized-message">{this.state.error.err0}</p>
            </Col>
            </Form>
            <br/>
            <label>National ID card image</label>
            <ImageUploader 
            upload={this.state.upload} name="1" 
            handlerUpload={this.handleSetCard}
            label="National ID card image"
            error={this.state.error.err1}
            />             
            <br/>
            <label>Selfie image with national ID card</label>
            <ImageUploader 
            upload={this.state.upload} name="2" 
            handlerUpload={this.handleSetSelfie}
            label="Selfie image with national ID card"
            error={this.state.error.err2}
             />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-danger" onClick={this.handleClose} disabled={this.state.isUploading}>
              Cancel
            </Button>
            <Button variant="outline-success" onClick={this.handleSave} disabled={this.state.isUploading}>
            Save{' '}
              {this.state.isUploading?
               <Spinner
               as="span"
               animation="border"
               size="sm"
               role="status"
               aria-hidden="true"
             />
              :null}
            </Button>
          </Modal.Footer>
        </Modal>
        </>
    )
  }
}
export {
  ProfileModal,
  SkillListItem,
  SkillModal,
  About,
  EducationListItem,
  ExperienceListItem,
  ExperienceModal,
  EducationModal,
  ReviewListItem,
  ProfileImageModal,
  VerifyDataModal
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
