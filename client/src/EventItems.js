import React, { useState } from "react";
import { Button, Modal } from 'react-bootstrap';
import {registerEvent} from './api';

export default function EventItems({ id, title, time, registered, handle , duration }) {
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [reg, setReg] = useState(registered)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleNameChange = e => {
        setName(e.target.value);
      };

      const handleEmailChange = e => {
        setEmail(e.target.value);
      };

    const handleRegister = () => {
        setShow(false);
        registerEvent(id, name, email).then( async (data) => {
        })
    };
        return (
        
        <div>
            <div className="border-bottom pb-3 pt-3">
        <div className="row">
          <div className="col-sm-4 border-right-lg border-right-md-0">
            <div className="d-flex justify-content-center align-items-center">
              <h4 className="mb-0 mr-2 text-primary font-weight-normal">{time}</h4>
            </div>
            <div className="d-flex justify-content-center align-items-center pt-2">
                <p className="font-weight-bold mb-0 text-dark">{duration} Min</p>
                <p className="mb-0"></p>
              </div>
          </div >
          <div className="col-sm-8 pl-3">
            <p className="text-dark font-weight-bold mb-0">{title}</p>
            <p className="mb-0 text-primary">{handle}</p><p className="mb-0">{reg} Attended</p>
            <Button variant="primary" onClick={handleShow}>
        Register
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register the event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form>
        <div className="form-group">
          <label htmlFor="name" value={name}  className="col-form-label">Name:</label>
          <input type="text" className="form-control" onChange={handleNameChange} type="name" id="name" />
        </div>
        <div className="form-group">
          <label htmlFor="email" value={email}  className="col-form-label" >Email:</label>
          <input className="form-control" onChange={handleEmailChange} id="email" type="email" />
        </div>
      </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleRegister}>
            Register
          </Button>
        </Modal.Footer>
      </Modal>
          </div>
        </div>
      </div>
        </div>
    )
}