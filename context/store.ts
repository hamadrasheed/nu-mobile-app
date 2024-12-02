// import { configureStore} from '@reduxjs/toolkit';
// import authReducer from './authSlice';


// const store = configureStore({
//   reducer: {
//     auth: authReducer, // Add your reducers here
//   },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// export default store;


import {configureStore} from '@reduxjs/toolkit';
import {customPersistReducer} from './customPersistReducer';

export const store = configureStore({
  reducer: customPersistReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

