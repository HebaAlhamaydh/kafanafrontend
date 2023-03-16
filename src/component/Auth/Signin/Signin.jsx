import "./Signin.css";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";

import { signin } from "../../../store/auth";
import Logo from "../../../assets/logo2.png";
import { Link } from "react-router-dom";

export default function Signin() {
  const dispatch = useDispatch();
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSignin = async (event) => {
    event.preventDefault();
    const data = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    await dispatch(signin(data));
    usernameRef.current.value = null;
    passwordRef.current.value = null;
  };



  return (
    <>
      <div className="login-wrapper">
        <form action="" id="form" className="auth-form" onSubmit={handleSignin}>
          <div className="d-flex flex-row justify-content-start">
            <Link to="/">
              <i className="fa-solid fa-arrow-left" href="/"></i>
            </Link>
          </div>

          <a href="/">
            <img src={Logo} width="175px" alt="" />
          </a>
          <br />
          <br />
          <h2>Login</h2>

          <div className="input-group">
            <input required type="text" id="loginUser" ref={usernameRef} />
            <label>User Name</label>
          </div>

          <div className="input-group">
            <input type="password" id="loginPassword" ref={passwordRef} required />
            <label>Password</label>
          </div>

          <input type="submit" value="Login" className="submit-btn" />
          <br />
          
          <div className="forgot-pw footerForm">
            <p href="" className="text-white-50 fw-bold">
              Don't have an account?
              <Link to="/signup" className="forgot-pw">
                Register here
              </Link>
            </p>
          </div>
          <div className="d-flex flex-row justify-content-start">
            <a href="#!" className="small text-muted me-1">
              Terms of use.
            </a>
            <a href="#!" className="small text-muted">
              Privacy policy
            </a>
          </div>
        </form>

      
      </div>
    </>
  );
}
