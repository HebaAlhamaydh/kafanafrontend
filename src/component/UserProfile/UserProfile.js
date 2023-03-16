import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getOneUser } from "../../store/users";
import { getMyClaimedDeals } from "../../store/claimedDeals";

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function UserProfile() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.usersSlice);
  const { myClaimedDeals,isLoading } = useSelector((state) => state.claimedDealSlice);

  useEffect(() => {
    dispatch(getOneUser());
    dispatch(getMyClaimedDeals());
  }, [ dispatch]);


   /////// Total amounts of My claimed deals ///////
   const totalAmount = myClaimedDeals.reduce((total, claimedDeal) => {
    return total + claimedDeal.amount;
  }, 0);

  return (
    <section>
      <br/>
     <h1 style={{textAlign: "center"}}>My Profile </h1>
     <br/>
 <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
         
            <TableCell>username</TableCell>
            <TableCell>Photo</TableCell>
  
            <TableCell align="right">phone</TableCell>
            <TableCell align="right"> gender</TableCell>
         
            <TableCell align="right"> email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{userInfo.username}</TableCell>
             
              <TableCell align="right">{userInfo. photo_url}</TableCell>
              <TableCell align="right">{userInfo.phone}</TableCell>
              <TableCell align="right">{userInfo.gender}</TableCell>
       
              <TableCell align="right">{userInfo.email}</TableCell>
            </TableRow>
       
        </TableBody>
      </Table>
    </TableContainer>
    <br/>
      <p><b>Count Of My Claimed Deal:</b> {myClaimedDeals.length}  </p>
      <p><b>Total Amount of My Claimed Deal: </b>{totalAmount}</p>

    </section>
  );
}
