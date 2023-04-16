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
    allUsers: [],
    username: '',
    token: '',
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    value: {
      getAll: [],
    },
  },
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
    },
    setAllUsers: ({ value }, { payload }) => {
      value.getAll = payload;
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
        state.allUsers = action.payload.allUsers;
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
      });
    builder
      .addCase(login.rejected, (state, action) => {
        state.username = '';
        state.token = '';
        state.allUsers = [];
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload;
      });
  },
});

export const { reset, setAllUsers } = userSlice.actions;
export default userSlice.reducer;
