import React from "react";
import Logout from "../Auth/Logout/Logout";
import "./Header.css";
import {  useSelector } from "react-redux";
import { Button } from "react-bootstrap";
// import { useEffect } from "react";

// import {getAllActiveDeals,} from "../../store/deals";
// import cookie from "react-cookies";
import Logo from "../../assets/logo2.png";

import { Link } from "react-router-dom";
import Access from "../Access/Access";
// import Signin from "../Auth/Signin/Signin";

export default function Header(props) {
  // const dispatch = useDispatch();
  // const userId= cookie.load("userID");
 
  // const { isSignin } = useSelector((state) => state.authSlice);
  
  // useEffect(() => {
  //   dispatch(getAllActiveDeals());
  // }, [dispatch]);

  const { isSignin } = useSelector((state) => state.authSlice);

  return (
    <>
      <nav className="navbar  navbar-expand-lg bg-white navbar-light sticky-top px-4 px-lg-5 py-lg-0">
    
        <button
          type="button"
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav nav justify-content-center ms-auto py-3 py-lg-0">

               {/* *****************All User************************** */}
            <Access role={"admin"}>
              <Link className="nav-item nav-link" to={"/admin/users"}>
                <li nav-link>All User</li>
              </Link>
            </Access>
        {/* **************MyProfile********** */}
           <Access role="user">
              <Link className="nav-item nav-link" to={"/profile/user"}>
                <li nav-link> My Profile</li>
              </Link>
            </Access>
            {/* **************MyClaimedDeal********** */}
           <Access role="user">
              <Link className="nav-item nav-link" to={"/userClaimedDeals"}>
                <li nav-link> My Claimed Deal</li>
              </Link>
            </Access>
          {/* **************ActiveDeal********** */}
            <Access role="user">
              <Link className="nav-item nav-link" to={"/deal"}>
                <li nav-link>   Active Deal</li>
              </Link>
            </Access>
          {/* **************All Deals********* */}
            <Access role="admin">
              <div className="nav-item dropdown">
                <a className="nav-link dropdown-toggle nav-link" data-bs-toggle="dropdown">
                  Deals
                </a>
                <div className="dropdown-menu bg-light m-0">
                  <Link className="dropdown-item" to={"/allDealAdmin"}>
                    <li href="#">All Deals</li>
                  </Link>
                  <Link className="dropdown-item" to={"/admin/allClaimedDeals"}>
                    <li href="#">All ClaimedDeals</li>
                  </Link>
                </div>
              </div>
            </Access>
          </div>
        </div>
        {isSignin  ? (
        <div className="logout">
          <Logout />
        </div>
          ) : (
<Button className="mx-4" variant="dark" ><Link to="/signin">Login</Link></Button>
            )}
       
      </nav>

     
    </>
  );
}
