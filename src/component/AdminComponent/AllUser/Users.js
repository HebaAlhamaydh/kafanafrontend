
import { deleteUser, getAllUser,updateUser } from "../../../store/users";
import { useDispatch, useSelector } from "react-redux";
import { useEffect,useState } from "react";
import { Spinner } from "react-bootstrap";


import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddUser from "../AddUser/AddUser";

export default function Users() {
    const { userInfo, isLoading } = useSelector((state) => state.usersSlice);
    const [usersState, setUsersState] = useState([])

    const dispatch = useDispatch();
   
  
    useEffect(() => {
      dispatch(getAllUser());
    }, [dispatch]);
    
    useEffect(()=>{setUsersState(userInfo)},[userInfo])
  
        ///////////////handle checkbox //////
        const [selectedUsers, setSelectedUsers] = useState([]);
  
        const handleCheckboxChange = ( rowId) => {
          if (selectedUsers.includes(rowId)) {
            setSelectedUsers(selectedUsers.filter((id) => id !== rowId));
          } else {
            setSelectedUsers([...selectedUsers, rowId]);
          }
        };
      
       ///////////update user status //////
        const onChangeStatus = (id,status) => {
          const selectedOption = {
            id: id,
            status: status,
          };
          dispatch(updateUser(selectedOption));
        
        }

      ////////////////delete user//////
      const handleDeleteClick = () => {
        dispatch(deleteUser(selectedUsers));
        setUsersState(usersState.filter((user) => !selectedUsers.includes(user.id)));
        setSelectedUsers([]);
      };


    return isLoading ? (
        <div className="spinner-service">
          <Spinner animation="border" variant="dark" />
        </div>
      ) : (
      <>
      <AddUser/>
      <br/>
     <h1 style={{textAlign: "center"}}>All Users Saved On The Database </h1>
     <br/>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell>   Delete</TableCell>
            <TableCell>username</TableCell>
            <TableCell>Photo</TableCell>
            <TableCell align="right">server_DateTime</TableCell>
            <TableCell align="right">dateTime_UTC</TableCell>
            <TableCell align="right"> Update_DateTime_UTC</TableCell>
            <TableCell align="right"> Last_Login_DateTime_UTC</TableCell>
            <TableCell align="right">date_Of_Birth</TableCell>
            <TableCell align="right">phone</TableCell>
            <TableCell align="right"> gender</TableCell>
            <TableCell align="right"> status</TableCell>
            <TableCell align="right"> email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usersState?.map((row,index) => (
          
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <TableCell component="th" scope="row">  
            <input
            type="checkbox"
            checked={selectedUsers.includes(row.id)}
            onChange={() => handleCheckboxChange(row.id)}
          />
          </TableCell>
              <TableCell component="th" scope="row">{row.username}</TableCell>
              <TableCell component="th" scope="row">{userInfo.photo_url}</TableCell>
              <TableCell align="right">{row.server_DateTime}</TableCell>
              <TableCell align="right">{row.dateTime_UTC}</TableCell>
              <TableCell align="right">{row.Update_DateTime_UTC}</TableCell>
              <TableCell align="right">{row.Last_Login_DateTime_UTC}</TableCell>
              <TableCell align="right">{row.date_Of_Birth}</TableCell>
              <TableCell align="right">{row.phone}</TableCell>
              <TableCell align="right">{row.gender}</TableCell>
              <TableCell align="right">
              <select value={row.status} onChange={(e) => onChangeStatus(row.id,e.target.value)}>
                <option value="Active" >Active</option>
                <option value="In Active">Inactive</option>
                <option value="Deleted">Deleted</option>
                <option value="Expired">Expired</option>
              </select>
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <br/>
    <button onClick={handleDeleteClick}>Delete Selected Users</button>
     
    
    </>
  )
}
