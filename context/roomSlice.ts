import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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

const roomsSlice = createSlice({
  name: 'rooms',
  initialState: {
    rooms: [], // All rooms data
    filteredRooms: [], // Rooms filtered by type
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
      });
  },
});

export default roomsSlice.reducer;
