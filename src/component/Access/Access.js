import { When } from "react-if";
import cookie from 'react-cookies'
export default function Access(props) {

    let role =  cookie.load('userAccess')

    function check(Role) {
        
      return Role===role;
    }
    return(
        <>
        <When condition={check(props.role)}>
        {props.children}
        </When>
        </>
    )
}