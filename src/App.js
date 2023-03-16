import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import Header from './component/Header/Header';

import Signin from './component/Auth/Signin/Signin';
import NotFoundPage from './component/NotFound/NotFoundPage';
import Signup from './component/Auth/Signup/Signup';
import UserProfile from './component/UserProfile/UserProfile'
import Users from './component/AdminComponent/AllUser/Users';
import AllDeal from './component/AdminComponent/AllDeal/AllDeal';
import ClaimedDeals from './component/AdminComponent/ClaimedDeals/ClaimedDeals';
import Search from './component/AdminComponent/Search/Search';
import Access from './component/Access/Access';
import ActiveDeal from './component/ActiveDeal/ActiveDeal';
import HomePage from './component/HomePage/HomePage';
import Footer from './component/Footer/Footer';

import 'react-toastify/dist/ReactToastify.css';
import SearchUser from './component/AdminComponent/Search/SearchUser';
import UserClaimeddeal from './component/UserClaimedDeal/UserClaimeddeal';

function App() {
  const { isSignin } = useSelector((state) => state.authSlice);
  return (
    <>
      {isSignin ? (
        <>
          <Header/>
          <ToastContainer />
          <Routes>
            <Route path="/admin/users" element={<Access role={"admin"}> <Users /></Access>}></Route>
            {/* <Route path="*" element={<NotFoundPage />} /> */}
            {/* <Route path="/" element={<HomePage/>} /> */}
            <Route path="/signin" />
            
            <Route path="/deal" element={<ActiveDeal />} />
            <Route path="/userClaimedDeals" element={<UserClaimeddeal />} />
            <Route path="/profile/user" element={<UserProfile />} />
            <Route path="/allDealAdmin" element={<AllDeal />} />
            <Route path="/admin/allClaimedDeals" element={<ClaimedDeals/>} />
            <Route path="/admin/byUserId" element={<SearchUser />} />
          </Routes>
          {/* <Footer /> */}
        </>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </> 
      )} 
    </>
  );
}

export default App;
