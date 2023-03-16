import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import AddDeal from "../AddDeal/AddDeal";
import {getAllDeals,updateDeal } from "../../../store/deals";
import * as React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



export default function AllDeal() {
    const { allDealAdmin, isLoading } = useSelector((state) => state.dealsSlice);
    const [dealState, setDealState] = useState([])
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getAllDeals());
    }, [dispatch]);
    
    useEffect(()=>{
      setDealState(allDealAdmin)
    },[allDealAdmin])

    const onChangeStatus = (id,status) => {
      const selectedOption = {
        id: id,
        status: status,
      };
      dispatch(updateDeal(selectedOption));
    
    }

    return isLoading ? (
        <div className="spinner-service">
          <Spinner animation="border" variant="dark" />
        </div>
      ) : (
        <>
      <AddDeal/>
      <br/>
     <h1 style={{textAlign: "center"}}>All Deals Saved On The Database </h1>
     <br/>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell>id</TableCell>
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
          {dealState?.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >   <TableCell component="th" scope="row">{row.id}</TableCell>
              <TableCell component="th" scope="row">{row.name}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">
              <select value={row.status} onChange={(e) => onChangeStatus(row.id,e.target.value)}>
                <option value="Active" >Active</option>
                <option value="In Active">Inactive</option>
                <option value="Deleted">Deleted</option>
                <option value="Expired">Expired</option>
              </select>
              </TableCell>
           
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
