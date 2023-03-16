import { useDispatch, useSelector } from "react-redux";
import { useEffect,useState } from "react";
import { Spinner } from "react-bootstrap";
import cookie from "react-cookies";
import {getAllActiveDeals } from "../../store/deals";
import {sendDeals} from "../../store/claimedDeals"

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function ActiveDeal() {
    const { allActiveDeals, isLoading } = useSelector((state) => state.dealsSlice);
    const dispatch = useDispatch();

  
    useEffect(() => {
      dispatch(getAllActiveDeals());
    }, [dispatch]);


 /////////////send request calim deal///////////
 const handleClaimClick = (row) => {
  const data={
    user_id:cookie.load("userID"),
    deal_id:row.id,
    amount:row.amount,
    server_datetime:row.server_dateTime,
    datetime_utc:row.datetime_utc,
    currency:row.currency
  }

  dispatch(sendDeals(data));
 
};  
    return isLoading ? (
        <div className="spinner-service">
          <Spinner animation="border" variant="dark" />
        </div>
      ) : (
        <>
      <br/>
     <h1 style={{textAlign: "center"}}>All Active Deals Saved On The Database </h1>
     <br/>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell>id</TableCell>
          <TableCell>claim</TableCell>
            <TableCell>name</TableCell>
            <TableCell align="right">description</TableCell>
            <TableCell align="right">status</TableCell>
            <TableCell align="right">amount</TableCell>
            <TableCell align="right">currency</TableCell>
            <TableCell align="right">server_dateTime</TableCell>
            <TableCell align="right">datetime_utc</TableCell>
            <TableCell align="right"> update_dateTime_utc</TableCell>
            <TableCell align="right"> last_login_dateTime_utc</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allActiveDeals.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row.id}</TableCell>
               <TableCell component="th" scope="row">  
               <button onClick={() => handleClaimClick(row)}>Claim Deal</button>
               </TableCell>
               
              <TableCell component="th" scope="row">{row.name}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell align="right">{row.currency}</TableCell>
              <TableCell align="right">{row.server_dateTime}</TableCell>
              <TableCell align="right">{row.datetime_utc}</TableCell>
              <TableCell align="right">{row.update_dateTime_utc}</TableCell>
              <TableCell align="right">{row.last_login_dateTime_utc}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   

    </>
  )
}
