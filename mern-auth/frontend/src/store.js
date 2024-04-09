import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import adminAuthSlice from './slices/adminAuthSlice';
import searchSlice from "./slices/searchSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminAuth: adminAuthSlice,
    searchUsers: searchSlice,

  },

});

export default store;
