import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export const deactivateUser: any = createAsyncThunk(
  'auth/deactivate',
  async (_, { rejectWithValue }) => {
    try {

      const token = await SecureStore.getItemAsync('user_token');

      const response = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/deactivate`, {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      await SecureStore.setItemAsync('user_token',response?.data?.data?.token);

      return response.data; 

    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const loginUser: any = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {

      const response = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/login`, {
        email,
        password,
      });

      await SecureStore.setItemAsync('user_token',response?.data?.data?.token);

      return response.data; 

    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const registerUser: any = createAsyncThunk(
  'auth/registerUser',
  async ({ 
    firstName,
    lastName,
    email,
    password,
    roleSlug,
   }: any, { rejectWithValue }) => {
    try {

      const response = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/register`, {
        firstName,
        lastName,
        email,
        password,
        roleSlug,
      });

      return response.data;

    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action?.payload?.data?.token;
        state.user = {
          ...action?.payload?.data
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // deactivateUser
      .addCase(deactivateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deactivateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deactivateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
