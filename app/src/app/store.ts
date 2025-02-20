import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'
import reservationReducer from '../features/reservationSlice'
import eventReducer from '../features/eventSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    reservations: reservationReducer,
    events: eventReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

