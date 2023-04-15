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

export const logout = createAsyncThunk();

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    token: '',
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
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
      });
    builder
      .addCase(login.rejected, (state, action) => {
        state.username = '';
        state.token = '';
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
