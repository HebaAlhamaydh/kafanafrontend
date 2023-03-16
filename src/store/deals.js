import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import cookie from "react-cookies";
import { toast } from "react-toastify";
const url = process.env.REACT_APP_URL;

// get all Active deals >>user
export const getAllActiveDeals = createAsyncThunk(
  "deals/getAllActiveDeals",
  async (data, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      let response = await axios.get(`https://kafana-backend-production-e33d.up.railway.app/deal`, {
        headers: {
          authorization: `Bearer ${cookie.load("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

// get all deals >> admin
export const getAllDeals = createAsyncThunk(
  "deals/getAllDeals",
  async (data, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      let response = await axios.get(`https://kafana-backend-production-e33d.up.railway.app/allDealAdmin`, {
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

// Add Deal >> admin
export const addDeal = createAsyncThunk(
  "deals/addDeal",
  async (arg, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const req = await axios.post(`https://kafana-backend-production-e33d.up.railway.app/createDeal`, arg, {
        headers: {
          authorization: `Bearer ${cookie.load("token")}`,
        },
      });
      return req.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update Status Deal >> admin
export const updateDeal = createAsyncThunk(
  "deals/updateDeal",
  async (data, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;
    try {
      const res = await axios.put(
        `https://kafana-backend-production-e33d.up.railway.app/allDealAdmin/${data.id}`,
        data,
        {
          headers: {
            authorization: `Bearer ${cookie.load("token")}`,
          },
        }
      );
      dispatch(getAllDeals());
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  allActiveDeals: [],
  allDealAdmin: [],
  isLoading: false,
  error: null,
};

const dealsSlice = createSlice({
  name: "deals",
  initialState,
  reducers: {},
  extraReducers: {
    // **********getAllActiveDeals**********
    [getAllActiveDeals.fulfilled]: (state, action) => {
      state.allActiveDeals = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    [getAllActiveDeals.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [getAllActiveDeals.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      
    },
    // **********getAllDeals>> admin   **********
    [getAllDeals.fulfilled]: (state, action) => {
      state.allDealAdmin = action.payload;
      state.isLoading = false;
    },
    [getAllDeals.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [getAllDeals.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    //****************Add Deal(Admin)****************
    [addDeal.fulfilled]: (state, action) => {
      state.allDealAdmin.push(action.payload);
      state.isLoading = false;
      toast.error(`${action.payload.status}`, { autoClose: false });
    },
    [addDeal.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addDeal.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(`${action.payload}`);
      state.error = action.payload;
    },

    //****************Update Status Deal (Admin)****************
    [updateDeal.fulfilled]: (state, action) => {
      state.isLoading = false;
      toast.success(`Edit Successfully`, { autoClose: false });
    },
    [updateDeal.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updateDeal.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(`${action.payload}`);
      state.error = action.payload;
    },
  },
});

export default dealsSlice.reducer;
