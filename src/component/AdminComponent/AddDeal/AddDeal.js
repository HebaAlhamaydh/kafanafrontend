import "./AddDeal.css";

import React, { useState, useRef, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { addDeal } from "../../../store/deals";


export default function AddDeal({ postData }) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const server_dateTimeRef = useRef(null);
  const datetime_utcRef = useRef(null);
  const update_dateTime_utcRef = useRef(null);
  const last_login_dateTime_utcRef = useRef(null);
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const statusRef = useRef(null);
  const amountRef = useRef(null);
  const currencyRef = useRef(null);

  const handleSubmit = () => {
    const sendData = {
    server_dateTime: server_dateTimeRef.current.value,
    datetime_utc: datetime_utcRef.current.value,
    update_dateTime_utc: update_dateTime_utcRef.current.value,
    last_login_dateTime_utc: last_login_dateTime_utcRef.current.value,
    name: nameRef.current.value,
    description: descriptionRef.current.value,
    status: statusRef.current.value,
    amount: amountRef.current.value,
    currency: currencyRef.current.value,
   
    };

    dispatch(addDeal(sendData));
  };


  return (
    <>
      <Button variant="primary" size="lg" onClick={handleShow} className="ms-4 mt-3 add-btn">
        Add Deal
      </Button>

      <Modal show={show} onHide={handleClose} className="add-service-pop-form">
        <form
          action=""
          onSubmit={() => {
            handleSubmit();
            handleClose();
          }}
        >
          <div className="wrapper">
            <div className="title">Add New Deal</div>
            <div className="form">
              <div className="inputfield">
                <label>server_dateTime</label>
                <input
                  type="date"
                  className="input"
                  placeholder="title"
                  maxLength={25}
                  ref={server_dateTimeRef}
                  required
                />
              </div>
              <div className="inputfield">
                <label>datetime_utc</label>
                <input
                  type="date"
                  className="input"
                  placeholder="title"
                  maxLength={25}
                  ref={datetime_utcRef}
                  required
                />
              </div>
              <div className="inputfield">
                <label>update_dateTime_utc</label>
                <input
                  type="date"
                  className="input"
                  placeholder="title"
                  maxLength={25}
                  ref={update_dateTime_utcRef}
                  required
                />
              </div>
              <div className="inputfield">
                <label> last_login_dateTime_utc</label>
                <input
                  type="date"
                  className="input"
                  placeholder="title"
                  maxLength={25}
                  ref={last_login_dateTime_utcRef}
                  required
                />
              </div>
              <div className="inputfield">
                <label>name</label>
                <input
                  type="text"
                  className="input"
                  maxLength={25}
                  ref={nameRef}
                  required
                />
              </div>
              <div className="inputfield">
                <label>description</label>
                <textarea
                  className="textarea"
                  placeholder="description"
                  maxLength={150}
                  ref={descriptionRef}
                  required
                />
              </div>

              <div className="inputfield">
                <label>status</label>
                <div className="custom_select">
                  <select defaultValue={"Active"} ref={statusRef}>
                    <option value="Active">Active</option>
                    <option value="In Active">In Active</option>
                    <option value="Deleted">Deleted</option>
                    <option value="Expired">Expired</option>
                   
                  </select>
                </div>
              </div>

              <div className="inputfield">
                <label>amount</label>
                <input
                  type="number"
                  className="input"
                  min={10}
                  ref={amountRef}
                  required
                />
              </div>

              <div className="inputfield">
                <label>currency</label>
                <input
                  type="text"
                  className="input"
                  maxLength={25}
                  ref={currencyRef}
                  required
                />
              </div>
              <br />
              <div className="footer">
                <button type="" value="Close" className="btn-submit" onClick={handleClose}>
                  Close
                </button>
                <input type="submit" value="Add Deal" className="btn-submit" />
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}
