
import "./AddUser.css"
import React, { useState, useRef, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { addUser } from "../../../store/users";
import axios from "axios";

export default function AddUser({ postData }) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [file, setFile] = useState("");
//   const [addUser, setAddUser] = useState({
//     username: '',
//     server_DateTime: null,
//     dateTime_UTC: null,
//     Update_DateTime_UTC: null,
//     image: ''
//   });
  const [myImage, setMyImage] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const usernameRef = useRef(null);
  const server_DateTimeRef = useRef(null);
  const dateTime_UTCRef = useRef(null);
  const Update_DateTime_UTCRef = useRef(null);
  const Last_Login_DateTime_UTCRef = useRef(null);
  const date_Of_BirthRef = useRef(null);
  const phoneRef = useRef(null);
  const genderRef = useRef(null);
  const statusRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const handleSubmit = (e) => {
    // e.preventDefault()
    const sendData = {
        username: usernameRef.current.value,
        server_DateTime: server_DateTimeRef.current.value ,
        dateTime_UTC: dateTime_UTCRef.current.value,
        Update_DateTime_UTC: Update_DateTime_UTCRef.current.value,
        Last_Login_DateTime_UTC: Last_Login_DateTime_UTCRef.current.value,
        date_Of_Birth: date_Of_BirthRef.current.value,
        phone:phoneRef.current.value,
        gender: genderRef.current.value,
        status: statusRef.current.value,
        password: passwordRef.current.value,
        email: emailRef.current.value,
        // photo_url: " ",
      // userID: cookie.load("userID"),
    };
    console.log(sendData)

    dispatch(addUser(sendData));
  };
  // useEffect(() => {
  //   if (file) {
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     formData.append("upload_preset", "kpc5yviv");
  //     axios
  //       .post("https://api.cloudinary.com/v1_1/dminynjzy/image/upload", formData)
  //       .then((response) => {
  //         setMyImage(response.data.secure_url);
  //       });
  //     setFile("");
  //     setMyImage("");
  //   }
  // }, [file]);
 
//   const onChange = (e) => {
//     console.log(e, e.target.value)
//     setAddUser({
//         ...addUser,
//         [e.target.name]: e.target.value
//     })
//   }
  return (
    <>
      <Button variant="primary" size="lg" onClick={handleShow} className="ms-4 mt-3 add-btn">
        Add New User
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
            <div className="title">Add new user</div>
            <div className="form">
              <div className="inputfield">
                <label>username</label>
                <input
                  type="text"
                ref={usernameRef}
                  className="input"
                  placeholder="username"
                  maxLength={25}
                  required
                />
              </div>
              <div className="inputfield">
                <label>password</label>
                <input
                  type="password"
                  className="input"
                  ref={passwordRef}
                  required
                />
              </div>
              <div className="inputfield">
                <label>Email</label>
                <input
                  type="email"
                  className="input"
                  ref={emailRef}
                  required
                />
              </div>

              <div className="inputfield">
                <label>server_DateTime</label>
                <input
                  type="date"
                  className="input"
                  ref={server_DateTimeRef}
                  required
                />
              </div>
              <div className="inputfield">
                <label>dateTime_UTC</label>
                <input
                  type="date"
                  className="input"
                  ref={dateTime_UTCRef}
                  required
                />
              </div>
              <div className="inputfield">
                <label>Update_DateTime_UTC</label>
                <input
                  type="date"
                  className="input"
                  ref={Update_DateTime_UTCRef}
                  required
                />
              </div>
              <div className="inputfield">
              <label>Last_Login_DateTime_UTC</label>
                <input
                  type="date"
                  className="input"
                  ref={Last_Login_DateTime_UTCRef}
                  required
                />
              </div>
              <div className="inputfield">
              <label>date_Of_Birth</label>
                <input
                  type="date"
                  className="input"
                  ref={date_Of_BirthRef}
                  required
                />
              </div>


              <div className="inputfield">
              <label>Phone Number</label>
                <input
                  type="number"
                  className="input"
                  placeholder="07"
                  min={10}
                  ref={phoneRef}
                  required
                />
              </div>

              <div className="inputfield">
                <label>gender</label>
                <div className="custom_select">
                  <select defaultValue={"Male"} ref={genderRef}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                </div>

                <div className="inputfield">
                <label>status</label>
                <div className="custom_select">
                  <select defaultValue={"Amman"} ref={statusRef}>
                    <option value="Active">Active</option>
                    <option value="In Active">In Active</option>
                    <option value="Deleted">Deleted</option>
                    <option value="Expired">Expired</option>
                  </select>
                </div>
              </div> 

              {/* <div className="add-image">
                <label className="add-image-title"> Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    setFile(event.target.files[0]);
                  }}
                />
              </div>  */}
              
              <br />
              <div className="footer">
                <button type="" value="Close" className="btn-submit" onClick={handleClose}>
                  Close
                </button>
                <input type="submit" value="Add New User" className="btn-submit" />
              </div>
          
          </div>
          </div>
        </form>
      </Modal>
    </>
  );
}
