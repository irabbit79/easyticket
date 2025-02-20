import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../types/user';
import { createUser as createUserAPI, resetDatabase } from '../services/userService';


interface UserState {
  currentUser: User | null;
  username: string;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  username: '',
  loading: false,
  error: null,
};

export const createUserAsync = createAsyncThunk(
  'createUser',
  async (username: string, { rejectWithValue }) => {
    try {
      const user = await createUserAPI(username);
      return user;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to create user');
    }
  }
);

export const resetDatabaseAsync = createAsyncThunk(
  'reset-database',
  async (_, { rejectWithValue }) => {
    try {
      await resetDatabase();
      return null;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to reset database');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
      state.error = null;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    clearUsername: (state) => {
      state.username = '';
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
    resetUserState: (state) => {
      state.currentUser = null;
      state.username = '';
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(resetDatabaseAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetDatabaseAsync.fulfilled, (state) => {
        state.currentUser = null;
        state.username = '';
        state.loading = false;
        state.error = null;
      })
      .addCase(resetDatabaseAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { 
  setUser, 
  setUsername, 
  clearUsername, 
  setLoading, 
  setError, 
  clearError,
  resetUserState 
} = userSlice.actions;
export default userSlice.reducer; 