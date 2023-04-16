/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUsers = createAsyncThunk(
  'getUsers',
  async (object, { getState, rejectWithValue }) => {
    console.log(getState());
    try {
      const { data } = await axios.get(
        'http://localhost:5002/getAllUsers',
      );
      return data;
    } catch (error) {
      rejectWithValue(error.response);
    }
  },
);

const getUserSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],
    loading: false,
    isSuccess: false,
    message: '',
  },
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      });
    builder
      .addCase(getUsers.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
      });
    builder
      .addCase(getUsers.rejected, (state, action) => {
        state.data = '';
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload;
      });
  },
});

export default getUserSlice;
