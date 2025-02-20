import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Event } from '../types/event';
import { getEvents } from '../services/eventService';
import { createOrder } from '../services/orderService';
import { OrderResponse } from '../types/order';
import { fetchUserReservations } from './reservationSlice';

interface EventState {
  events: Event[];
  selectedEvent: Event | null;
  loading: boolean;
  isSubmitting: boolean;
  error: string | null;
  tickets: number;
  orderConfirmation: { order: OrderResponse; tickets: number } | null;
}

const initialState: EventState = {
  events: [],
  selectedEvent: null,
  loading: false,
  isSubmitting: false,
  error: null,
  orderConfirmation: null,
  tickets: 0,
};

export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (_, { rejectWithValue }) => {
    try {
      const events = await getEvents();
      return events;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch events');
    }
  }
);

export const createEventOrder = createAsyncThunk(
  'events/createOrder',
  async (params: { userId: string; eventId: number; numberOfTickets: number }, { rejectWithValue, dispatch }) => {
    try {
      const order = await createOrder(params);
      // Refresh events list after successful order
      dispatch(fetchEvents());
      // Refresh reservations list after successful order
      dispatch(fetchUserReservations(params.userId));
      return { order, tickets: params.numberOfTickets };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to create order');
    }
  }
);

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setSelectedEvent: (state, action: PayloadAction<Event | null>) => {
      state.selectedEvent = action.payload;
    },
    clearOrderConfirmation: (state) => {
      state.orderConfirmation = null;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setTickets: (state, action: PayloadAction<number>) => {
      state.tickets = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
        state.error = null;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createEventOrder.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
      })
      .addCase(createEventOrder.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.selectedEvent = null;
        state.orderConfirmation = action.payload;
        state.error = null;
      })
      .addCase(createEventOrder.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.payload as string;
      });
  },
});

export const { 
  setSelectedEvent, 
  clearOrderConfirmation, 
  setError,
  clearError,
  setTickets
} = eventSlice.actions;

export default eventSlice.reducer; 