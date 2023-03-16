import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import base64 from "base-64";
import cookie from "react-cookies";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const url = process.env.REACT_APP_URL;

//******signin****//
export const signin = createAsyncThunk("auth/signin", async (data, thunkApi) => {
  const { rejectWithValue } = thunkApi;
  try {
    const request = await axios.post(
      `https://kafana-backend-production-e33d.up.railway.app/signin`,
      {},
      {
        headers: {
          authorization: `Basic ${base64.encode(`${data.username}:${data.password}`)}`,
        },
      }
    );
    window.location.href = "/";
    return request.data;
  } catch (err) {
    return rejectWithValue(err.request.response);
  }
});

//// sign up //////
export const signup = createAsyncThunk("auth/signup", async (data, thunkApi) => {
  const { rejectWithValue } = thunkApi;
  try {
    const request = await axios.post(`https://kafana-backend-production-e33d.up.railway.app/signup`, data);
    return request.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});


const initialState = {
  isSignin: cookie.load("token") ? true : false,
  errorSignIn: null,
  isLoadingSignIn: false,
  errorSignUp: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [signin.fulfilled]: (state, action) => {
      state.isSignin = true;
      // window.location.href = '/Services'
      cookie.save("token", action.payload.token);
      cookie.save("actions", action.payload.actions);
      cookie.save("userAccess", action.payload.role);
      cookie.save("userID", action.payload.id);
      state.actions = cookie.load("actions");
      state.errorSignIn = null;

      state.isLoadingSignIn = false;
    },
    /// Sign in  /////
    [signin.pending]: (state, action) => {
      state.isLoadingSignIn = true;
      state.errorSignIn = null;
    },
    [signin.rejected]: (state, action) => {
      state.isLoadingSignIn = false;
      state.errorSignIn = action.payload;
      Swal.fire({
        title: "Error!",
        text: action.payload,
        icon: "error",
        showConfirmButton: false,
        timer: 3500,
      });
    },

    /// Sign up  /////
    [signup.fulfilled]: (state, action) => {
      state.isLoadingSignUp = false;
      state.errorSignUp = null;
    },
    [signup.pending]: (state, action) => {
      state.isLoadingSignUp = true;
      state.errorSignUp = null;
    },
    [signup.rejected]: (state, action) => {
      state.isLoadingSignUp = false;
      state.errorSignUp = action.payload;
    },
    
    // //**************** send Email Verification ****************
    // [sendEmailVerification.fulfilled]: (state) => {
    //   state.isLoading = false;
    //   toast.success(`Email Sent Successfully`, { autoClose: false });
    // },
    // [sendEmailVerification.rejected]: (state, action) => {
    //   toast.error(`${action.payload}`);
    //   state.error = action.payload;
    // },

  },
});

export default authSlice.reducer;
