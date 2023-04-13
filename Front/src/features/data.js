/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'user',
  initialState: {
    value: {
      myUser: null,
      allUser: [],
    },
  },
  reducers: {
    setAllUsers: ({ value }, { payload }) => {
      value.allUser = payload;
    },
    setUser: ({ value }, { payload }) => {
      value.myUser = payload;
    },
  },
});

export const {
  setAllUsers,
  setUser,
} = dataSlice.actions;

export default dataSlice.reducer;
