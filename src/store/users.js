import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import cookie from "react-cookies";
import { toast } from "react-toastify";
const url = process.env.REACT_APP_URL;

// get all users >> Admin
export const getAllUser = createAsyncThunk("users/getAllUser", async (id, thunkApi) => {
  const { rejectWithValue } = thunkApi;
  try {
    let response = await axios.get(`https://kafana-backend-production-e33d.up.railway.app/admin/users`, {
      headers: {
        authorization: `Bearer ${cookie.load("token")}`,
      },
    });
    console.log({response});
    return response.data;
    
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});
// Update Status User >> admin
export const updateUser= createAsyncThunk(
  "users/updateUser",
  async (data, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;
    try {
      const res = await axios.put(
        `https://kafana-backend-production-e33d.up.railway.app/updateStatus/${data.id}`,
        data,
        {
          headers: {
            authorization: `Bearer ${cookie.load("token")}`,
          },
        }
      );
      dispatch(getAllUser());
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// Delete User >> Admin
export const deleteUser = createAsyncThunk("users/deleteUser", async (data, thunkApi) => {
  const { rejectWithValue, dispatch } = thunkApi;
  try {
    console.log({data})
    let response = await axios.delete(`https://kafana-backend-production-e33d.up.railway.app/admin/deletUser`,
      {
        headers: {
          authorization: `Bearer ${cookie.load("token")}`,
        },
      data: {
        
          userIds: data

      }
    });
    console.log(response)
    dispatch(getAllUser());
    return response.data ;
  } catch (error) {
    return rejectWithValue(error.response);
  }
});

// Add User >> Admin
export const addUser = createAsyncThunk("users/addUser", async (arg, thunkApi) => {
  const { rejectWithValue } = thunkApi;
  try {
    const req = await axios.post(`https://kafana-backend-production-e33d.up.railway.app/admin/addUser`, arg, {
      headers: {
        authorization: `Bearer ${cookie.load("token")}`,
      },
    });
    return req.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// // get user by ID 
export const getOneUser = createAsyncThunk("users/getOneUser", async (id, thunkApi) => {
  const { rejectWithValue } = thunkApi;
  try {
    let response = await axios.get(`https://kafana-backend-production-e33d.up.railway.app/profile/user`, {
      headers: {
        authorization: `Bearer ${cookie.load("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

const initialState = {
  userInfo: [],
  isLoadingProviderInfo: false,
  errorProviderInfo: null,

};
const usersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: {
    //Get all Users
    [getAllUser.fulfilled]: (state, action) => {
      state.userInfo = action.payload;
      state.isLoadingProviderInfo = false;
      state.errorProviderInfo = null;
    },
    [getAllUser.pending]: (state, action) => {
      state.isLoadingProviderInfo = true;
      state.errorProviderInfo = null;
    },
    [getAllUser.rejected]: (state, action) => {
      state.errorProviderInfo = action.payload;
      state.isLoadingProviderInfo = false;
    },
//****************Update Status user (Admin)****************
[updateUser.fulfilled]: (state, action) => {
  state.isLoading = false;
  toast.success(`Edit Successfully`, { autoClose: false });
},
[updateUser.pending]: (state, action) => {
  state.isLoading = true;
},
[updateUser.rejected]: (state, action) => {
  state.isLoading = false;
  toast.error(`${action.payload}`);
  state.error = action.payload;
},
    // Delete Users
    [deleteUser.fulfilled]: (state, action) => {
      toast.success("Deleted User successfully");
    },
    [deleteUser.pending]: (state, action) => {},
    [deleteUser.rejected]: (state, action) => {
      toast.error("Error");
    },

    ////////////////////////
    //Add user >> Admin 
    [addUser.fulfilled]: (state, action) => {
      state.userInfo.push(action.payload);
      toast.success("Add user");
      state.isLoading = false;
    },
    [addUser.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [addUser.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

//////get one user///////
[getOneUser.fulfilled]: (state, action) => {
  state.userInfo = action.payload;
  state.isLoadingProviderInfo = false;
  state.errorProviderInfo = null;
},
[getOneUser.pending]: (state, action) => {
  state.isLoadingProviderInfo = true;
  state.errorProviderInfo = null;
},
[getOneUser.rejected]: (state, action) => {
  state.errorProviderInfo = action.payload;
  state.isLoadingProviderInfo = false;
},

    
  },
});

export default usersSlice.reducer;
