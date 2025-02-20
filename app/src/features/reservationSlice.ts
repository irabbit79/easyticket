import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Reservation } from '../types/reservation';
import { getUserReservations } from '../services/reservationService';

interface ReservationState {
  reservations: Reservation[];
  loading: boolean;
  error: string | null;
}

const initialState: ReservationState = {
  reservations: [],
  loading: false,
  error: null,
};

export const fetchUserReservations = createAsyncThunk(
  'reservations/fetchUserReservations',
  async (userId: string, { rejectWithValue }) => {
    try {
      const reservations = await getUserReservations(userId);
      console.log('Reservations', reservations);
      return reservations;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch reservations');
    }
  }
);

const reservationSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    clearReservations: (state) => {
      state.reservations = [];
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserReservations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserReservations.fulfilled, (state, action) => {
        state.loading = false;
        state.reservations = action.payload;
        state.error = null;
      })
      .addCase(fetchUserReservations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { 
  clearReservations, 
  setLoading, 
  setError, 
  clearError 
} = reservationSlice.actions;

export default reservationSlice.reducer; 