import cookie from "react-cookies";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Logout.css";


export default function Logout(props) {
  const navigate = useNavigate();
  const handleSignout = () => {
    cookie.remove("token");
    cookie.remove("actions");
    cookie.remove("userAccess");
    cookie.remove("userID");
    navigate("/");
    setTimeout(()=>{
      window.location.reload();
    },100)
  };
  return (
    <>
      <Button className="mx-4" variant="dark" onClick={handleSignout}>
        Logout
      </Button>
    </>
  );
}
