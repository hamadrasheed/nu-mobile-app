import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// Fetch all rooms
export const fetchRooms: any = createAsyncThunk(
    'rooms/fetchRooms',
    async (_, { rejectWithValue }) => {
        try {

            const response = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/rooms/home`);
            return response?.data?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch rooms');
        }
    }
);

// Fetch rooms by type
export const fetchRoomsByType: any = createAsyncThunk(
    'rooms/fetchRoomsByType',
    async (roomTypeId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/rooms?typeId=${roomTypeId}`);
            return response?.data?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch rooms by type');
        }
    }
);

export const bookRoom = createAsyncThunk(
    'rooms/bookRoom',
    async ({
        roomId,
        checkInDate,
        checkOutDate,
        paymentVia,
        totalPaid,
        totalDays,
    }: any, { rejectWithValue }) => {
        try {

            const token = await SecureStore.getItemAsync('user_token');

            const response = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/bookings`, {
                roomId,
                checkInDate,
                checkOutDate,
                paymentVia,
                totalPaid,
                totalDays,
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            return response.data; // Expected success response
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Booking failed');
        }
    }
);

export const fetchCheckedOutBookings: any = createAsyncThunk(
    'bookings/fetchCheckedOutBookings',
    async ({status}: any, { rejectWithValue }) => {
        try {
            console.log('checkedOut id',status);
            const token = await SecureStore.getItemAsync('user_token');

            const response = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/bookings/staff`, {
                // data: {status},
                params: {status},
                headers: { 'Authorization': `Bearer ${token}` }
            });
            return response.data.data; // Replace with the actual data structure from your API
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch bookings');
        }
    }
);

const roomsSlice = createSlice({
    name: 'rooms',
    initialState: {
        rooms: [], // All rooms data
        filteredRooms: [], // Rooms filtered by type
        checkOutRooms: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle fetchRooms
            .addCase(fetchRooms.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRooms.fulfilled, (state, action) => {
                state.loading = false;
                state.rooms = action.payload;
            })
            .addCase(fetchRooms.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Handle fetchRoomsByType
            .addCase(fetchRoomsByType.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRoomsByType.fulfilled, (state, action) => {
                state.loading = false;
                state.filteredRooms = action.payload;
            })
            .addCase(fetchRoomsByType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // book a room
            .addCase(bookRoom.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(bookRoom.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(bookRoom.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // checkout rooms
            .addCase(fetchCheckedOutBookings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCheckedOutBookings.fulfilled, (state, action) => {
                state.loading = false;
                state.checkOutRooms = action.payload;
            })
            .addCase(fetchCheckedOutBookings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default roomsSlice.reducer;
