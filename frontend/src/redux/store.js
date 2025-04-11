import {configureStore} from '@reduxjs/toolkit';
import userloginReducer from './slices/userlogin';

export const reduxstore = configureStore({
  reducer: {
    userlogin: userloginReducer,
  }
});

