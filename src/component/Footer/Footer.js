import React from 'react';
import { Link } from 'react-router-dom';
import './footer.scss'


function Footer(){
 
    return(
      <div className="container-fluid bg-dark mt-5 pt-5 wow fadeIn main-footer" data-wow-delay="0.1s">
           <div className="container py-5">
           <div className="container-fluid copyright">
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-md-start mb-3 mb-md-0">Copyright © 2023 Heba Alhamaydh</div>
          </div>
        </div>
      </div>
    </div>
    </div>
    ) 
  }


export default Footer;