import { persistReducer } from 'redux-persist';
import { persistConfig } from './persistConfig';
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';

const reducer = combineReducers({
  auth: authReducer
});

export const customPersistReducer = persistReducer(persistConfig, reducer);
