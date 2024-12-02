import { persistReducer } from 'redux-persist';
import { persistConfig } from './persistConfig';
import { combineReducers } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import authReducer from './authSlice';

const reducer = combineReducers({
  user: userSlice,
  // auth: authReducer
});

export const customPersistReducer = persistReducer(persistConfig, reducer);
