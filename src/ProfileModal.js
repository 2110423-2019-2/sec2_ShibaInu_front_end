import React, { useState } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";


import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'

const ProfileModal = props => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [startDate, setStartDate] = useState(new Date());

  return (
    <>
      <button type="button" className="btn" id="e-link" onClick={handleShow}>
        <FaRegEdit size={20} id="edit-icon" />
      </button>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header className="modalHead" closeButton>
          <Modal.Title className="modalTittle">Personal Information</Modal.Title>
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
              <Form.Row><DatePicker selected={startDate} onChange={date => setStartDate(date)}/></Form.Row>
              
            <Form.Group></Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ProfileModal;
