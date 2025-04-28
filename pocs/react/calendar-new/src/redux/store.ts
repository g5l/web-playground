import { configureStore } from '@reduxjs/toolkit';
import calendarReducer from './calendarSlice';
import eventsReducer from './eventsSlice';

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    events: eventsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;