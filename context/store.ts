// import { configureStore } from '@reduxjs/toolkit';
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // Local storage
// import { combineReducers } from 'redux';
// import { persistStore } from 'redux-persist';
// import authReducer from './authSlice'; // Example reducer

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const rootReducer = combineReducers({
//   auth: authReducer, // Add all reducers here
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });

// export default store;

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './cSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});