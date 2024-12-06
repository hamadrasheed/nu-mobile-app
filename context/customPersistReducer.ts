import { persistReducer } from 'redux-persist';
import { persistConfig } from './persistConfig';
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import roomsReducer from './roomSlice';
import bookingReducer from './bookingSlice';

const reducer = combineReducers({
  auth: authReducer,
  rooms: roomsReducer,
  bookings: bookingReducer
});

export const customPersistReducer = persistReducer(persistConfig, reducer);
