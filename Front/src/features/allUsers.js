/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/authService';

export const getUsers = createAsyncThunk('/getAllUsers', async (_, thunkAPI) => {
  try {
    return await authService.getUsers();
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message)
        || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getProfile = createAsyncThunk('/getUser/id', async (id, thunkAPI) => {
  try {
    return await authService.getUser(id);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message)
        || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const getUserSlice = createSlice({
  name: 'data',
  initialState: {
    users: [],
    profile: '',
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
    value: {
      allUsers: [],
    },
  },
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
    },
    setAllUsers: ({ value }, { payload }) => {
      value.allUsers = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      });
    builder
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
      });
    builder
      .addCase(getUsers.rejected, (state, action) => {
        state.users = '';
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload;
      });
    builder
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
      });
    builder
      .addCase(getProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
      });
    builder
      .addCase(getProfile.rejected, (state, action) => {
        state.profile = '';
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = getUserSlice.actions;
export default getUserSlice.reducer;
