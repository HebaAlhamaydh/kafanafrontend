import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
// import {getMyReserve} from './reservation.js'
import cookie from "react-cookies";
const url = process.env.REACT_APP_URL;

// send requset  Claimed Deal
export const sendDeals= createAsyncThunk("claimed/sendDeals", async (data, thunkApi) => {
  const { rejectWithValue } = thunkApi;
  try {
    const req = await axios.post(`http://localhost:3030/userClaimedDeals`, data, {
      headers: {
        authorization: `Bearer ${cookie.load("token")}`,
      },
    });
    return ;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

//Get my  Claimed Deals >> user
export const getMyClaimedDeals = createAsyncThunk("claimed/getMyClaimedDeals", async (data, thunkApi) => {
  const { rejectWithValue } = thunkApi;
  try {
    let response = await axios.get(`http://localhost:3030/userClaimedDeals`, {
      headers: {
        authorization: `Bearer ${cookie.load("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

// Delete Claimed Deals
export const deleteClaimedDeals = createAsyncThunk(
  "claimed/deleteClaimedDeals",
  async (id, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;
    try {
      let response = await axios.delete(`http://localhost:3030/userdeleteClaimedDeals/${id}`, {
        headers: {
          authorization: `Bearer ${cookie.load("token")}`,
        },
      });
      dispatch(getMyClaimedDeals());
      return id;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

// admin: get all Claimed Deals/
export const getAllClaimedDeals = createAsyncThunk(
  "claimed/getAllClaimedDeals",
  async (data, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      let response = await axios.get(`http://localhost:3030/admin/allClaimedDeals`, {
        headers: {
          authorization: `Bearer ${cookie.load("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
// get Claimed Deal by id
export const getUserClaimedDeal = createAsyncThunk("claimed/getUserClaimedDeal", async (userId, thunkApi) => {
  const { rejectWithValue } = thunkApi;
  try {
    const req = await axios.get(`http://localhost:3030/admin/byUserId/${userId}`,  {
      headers: {
        authorization: `Bearer ${cookie.load("token")}`,
      },
    });
    return req.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const initialState = {
  myClaimedDeals: [],
  allClaimedDeals: [],
  userClaimedDeal: [],
  isLoading: false,
  error: null,
};
const claimedDealSlice = createSlice({
  name: "claimed",
  initialState,

  extraReducers: {
    //Send Claimed Deals
    [sendDeals.fulfilled]: (state, action) => {
      toast.success("Send deals successfully");
      state.isLoading = false;
    },
    [sendDeals.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [sendDeals.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    //Delete reservation
    [deleteClaimedDeals.fulfilled]: (state, action) => {
      toast.success("Deleted successfully");
      state.isLoading = false;
    },
    [deleteClaimedDeals.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [deleteClaimedDeals.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    //getMyClaimedDeals
    [getMyClaimedDeals.fulfilled]: (state, action) => {
      state.myClaimedDeals = action.payload;
      state.isLoading = false;
    },
    [getMyClaimedDeals.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [getMyClaimedDeals.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    // **********getAllClaimedDeals (Admin)**********
    [getAllClaimedDeals.fulfilled]: (state, action) => {
      state.allClaimedDeals = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    [getAllClaimedDeals.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [getAllClaimedDeals.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    //**************get user Claimed Deal by user id (Admin)******** */
    [getUserClaimedDeal.fulfilled]: (state, action) => {
      state.userClaimedDeal = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    [getUserClaimedDeal.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [getUserClaimedDeal.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    
  },
});

export default claimedDealSlice.reducer;
