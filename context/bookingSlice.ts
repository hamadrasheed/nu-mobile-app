// bookingsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// Async thunk to fetch user bookings
export const fetchUserBookings: any = createAsyncThunk(
    'bookings/fetchUserBookings',
    async (_, { rejectWithValue }) => {
        try {

            const token = await SecureStore.getItemAsync('user_token');
            const response = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/bookings/my-bookings`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            return response.data.data; // Assuming bookings are in `data` key
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch bookings');
        }
    }
);

export const updateBookingStatus: any = createAsyncThunk(
    'bookings/updateBookingStatus',
    async ({ bookingId, status }: any, { rejectWithValue }) => {
      try {

        const token = await SecureStore.getItemAsync('user_token');

        const response = await axios.put(`${process.env.EXPO_PUBLIC_SERVER_URL}/bookings/status`, {
            statusToBe: status,
            id: bookingId
        }, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return { bookingId, status }; // Return the updated booking data
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to update booking status');
      }
    }
  );

const bookingsSlice = createSlice({
    name: 'bookings',
    initialState: {
        bookings: [],
        loading: false,
        error: null,
    },
    reducers: {
        // Add any additional reducers if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserBookings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserBookings.fulfilled, (state, action) => {
                state.loading = false;
                state.bookings = action.payload;
            })
            .addCase(fetchUserBookings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateBookingStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateBookingStatus.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(updateBookingStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default bookingsSlice.reducer;
