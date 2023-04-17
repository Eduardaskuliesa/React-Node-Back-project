import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/authSlice';
import getUserSlice from './features/allUsers';

const store = configureStore({
  reducer: {
    data: getUserSlice,
    auth: authSlice,
  },
});

export default store;
