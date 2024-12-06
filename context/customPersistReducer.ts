import { persistReducer } from 'redux-persist';
import { persistConfig } from './persistConfig';
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import roomsReducer from './roomSlice';

const reducer = combineReducers({
  auth: authReducer,
  rooms: roomsReducer,
});

export const customPersistReducer = persistReducer(persistConfig, reducer);
