import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Col, ModalTitle } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { log } from "util";

const ProfileModal = props => {
  const [show, setShow] = useState(false);
  const [p, setP] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [startDate, setStartDate] = useState(new Date());

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

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header className="modalHead" closeButton>
          <Modal.Title>Personal Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="fullName">
              <Form.Row>
                <Col md="4">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control placeholder="First name" />
                </Col>
                <Col md="4">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control placeholder="Last name" />
                </Col>
              </Form.Row>
            </Form.Group>
            <Form.Group controlId="Headline">
              <Form.Row>
                <Form.Label>Headline</Form.Label>
                <Form.Control placeholder="Headline" as="textarea" />
              </Form.Row>
            </Form.Group>
            <Form.Label>Date of birth</Form.Label>
            <Form.Row>
              <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
              />
            </Form.Row>

            <Form.Group controlId="location">
              <Form.Row>
                <Col md="4">
                  <Form.Label>Country/Region {p}</Form.Label>
                  <Form.Control placeholder="Country/Region" />
                </Col>
                <Col md="4">
                  <Form.Label>City/Province</Form.Label>
                  <Form.Control placeholder="City/Province" />
                </Col>
              </Form.Row>
            </Form.Group>
            <Form.Group controlId="phone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control />
            </Form.Group>
            <Form.Group controlId="website">
              <Form.Label>Website</Form.Label>
              <Form.Control />
            </Form.Group>
          </Form>
        </Modal.Body>
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

const About = props => {
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

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton className="modalHead">
          <ModalTitle>About</ModalTitle>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="Headline">
            <Form.Row>
              <Form.Control placeholder="about us" as="textarea" />
            </Form.Row>
          </Form.Group>
        </Modal.Body>
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

const ExperienceModal = props => {
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

      <Modal size="lg" show={show} onHide={handleClose}>
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
        <p >
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

const ExperienceListItem = props => {
  const [edit, setEdit] = useState(false);
  if (edit) {
    return (
      <>
        <Form>
          <Form.Control placeholder="role" />
          <Form.Control placeholder="location" />
          <Form.Control placeholder="year" />
        </Form>
      </>
    );
  } else {
    return (
      <>
        <div className="exp-box">
        <p className="strong">{props.role}</p>
        <p className="normal">{props.location}</p>
        <p className="weak">{props.year}</p>
        </div>
      </>
    );
  }
};

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
  ExperienceListItem
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
