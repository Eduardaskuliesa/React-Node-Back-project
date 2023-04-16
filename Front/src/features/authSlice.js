/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/authService';

const user = JSON.parse(localStorage.getItem('user'));

export const login = createAsyncThunk('/login', async (userData, thunkAPI) => {
  try {
    return await authService.login(userData);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message)
        || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateUsername = createAsyncThunk('/updateUsername', async (data, thunkAPI) => {
  try {
    return await authService.updateUsername(data);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message)
        || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const updatePassword = createAsyncThunk('/updatePassword', async (data, thunkAPI) => {
  try {
    return await authService.updatePassword(data);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message)
        || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const updatePhoto = createAsyncThunk('/updatePhoto', async (data, thunkAPI) => {
  try {
    return await authService.updatePhoto(data);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message)
        || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk();

const userSlice = createSlice({
  name: 'user',
  initialState: {
    allUsers: [],
    username: '',
    token: '',
    secret: '',
    photo: '',
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  },
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      });
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.username = action.payload.username;
        state.token = action.payload.token;
        state.secret = action.payload.secret;
        state.allUsers = action.payload.allUsers;
        state.photo = action.payload.photo;
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
      });
    builder
      .addCase(login.rejected, (state, action) => {
        state.username = '';
        state.token = '';
        state.secret = '';
        state.photo = '';
        state.allUsers = [];
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload;
      });
    builder
      .addCase(updateUsername.pending, (state) => {
        state.isLoading = true;
      });
    builder
      .addCase(updateUsername.fulfilled, (state, action) => {
        state.username = action.payload.username;
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.message = action.payload.message;
      });
    builder
      .addCase(updateUsername.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload;
      });
    builder
      .addCase(updatePhoto.pending, (state) => {
        state.isLoading = true;
      });
    builder
      .addCase(updatePhoto.fulfilled, (state, action) => {
        state.photo = action.payload.photo;
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.message = action.payload.message;
      });
    builder
      .addCase(updatePhoto.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload;
      });
  },
});

export const { reset, setAllUsers } = userSlice.actions;
export default userSlice.reducer;
