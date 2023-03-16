import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";


import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getMyClaimedDeals } from "../../store/claimedDeals";

export default function UserClaimeddeal() {
    const { myClaimedDeals,isLoading } = useSelector((state) => state.claimedDealSlice);

    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getMyClaimedDeals());
     
    }, [dispatch]);
    /////// Total amounts of My claimed deals ///////
    const totalAmount = myClaimedDeals.reduce((total, claimedDeal) => {
        return total + claimedDeal.amount;
      }, 0);
     ///////////////////////    
    return isLoading ? (
        <div className="spinner-service">
          <Spinner animation="border" variant="dark" />
        </div>
      ) : (
        <>
          <br/>
     <h1 style={{textAlign: "center"}}>My Claimed Deals </h1>
     <br/>
              <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>user_id</TableCell>
              <TableCell align="right">deal_id</TableCell>
              <TableCell align="right">server_datetime</TableCell>
              <TableCell align="right">datetime_utc</TableCell>
              <TableCell align="right">amount</TableCell>
              <TableCell align="right">currency</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myClaimedDeals.map((row,index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{row.user_id}</TableCell>
                <TableCell align="right">{row.deal_id}</TableCell>
                <TableCell align="right">{row.server_datetime}</TableCell>
                <TableCell align="right">{row.datetime_utc}</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                <TableCell align="right">{row.currency}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br/>
      <p><b>Count Of My Claimed Deal:</b> {myClaimedDeals.length}  </p>
      <p><b>Total Amount of My Claimed Deal: </b>{totalAmount}</p>
    
      </>
    );
}
