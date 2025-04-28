import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CalendarState {
  currentDate: string;
  view: 'day' | 'week' | 'month';
}

const initialState: CalendarState = {
  currentDate: new Date().toISOString(),
  view: 'week',
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setCurrentDate: (state, action: PayloadAction<string>) => {
      state.currentDate = action.payload;
    },
    nextWeek: (state) => {
      const date = new Date(state.currentDate);
      date.setDate(date.getDate() + 7);
      state.currentDate = date.toISOString();
    },
    prevWeek: (state) => {
      const date = new Date(state.currentDate);
      date.setDate(date.getDate() - 7);
      state.currentDate = date.toISOString();
    },
    setView: (state, action: PayloadAction<'day' | 'week' | 'month'>) => {
      state.view = action.payload;
    },
  },
});

export const { setCurrentDate, nextWeek, prevWeek, setView } = calendarSlice.actions;
export default calendarSlice.reducer;