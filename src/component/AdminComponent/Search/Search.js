import React, { useEffect,useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserClaimedDeal} from "../../../store/claimedDeals";
import "./Search.css";


export default function Search(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userId, setUserId] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getUserClaimedDeal(userId));
    navigate("/admin/byUserId");
  }
  useEffect(()=>{
    
  })
  return (
    <div className="search_container">
      <div className="search_section">
        <div className="co_sera">
          <div className="search">
            <i className="fa fa-search" />
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Search By user id" name="inputs"
               value={userId} onChange={(e) => setUserId(e.target.value)} />
              <button className="btn btn-primary">Search</button>
            </form>
          </div>
        </div>
      </div>

      
    </div>
  );
}
