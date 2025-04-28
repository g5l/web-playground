import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Event, TimeSlot } from '../types/event';
import * as eventApi from '../api/events';

interface EventsState {
  events: Event[];
  loading: boolean;
  error: string | null;
  suggestedTimeSlots: TimeSlot[];
}

const initialState: EventsState = {
  events: [],
  loading: false,
  error: null,
  suggestedTimeSlots: [],
};

export const fetchUserEvents = createAsyncThunk(
  'events/fetchUserEvents',
  async ({ userId, startDate, endDate }: { userId: string, startDate?: string, endDate?: string }) => {
    return await eventApi.fetchEvents(userId, startDate, endDate);
  }
);

export const createNewEvent = createAsyncThunk(
  'events/createEvent',
  async (event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>) => {
    return await eventApi.createEvent(event);
  }
);

export const updateExistingEvent = createAsyncThunk(
  'events/updateEvent',
  async ({ id, event }: { id: string, event: Partial<Event> }) => {
    return await eventApi.updateEvent(id, event);
  }
);

export const removeEvent = createAsyncThunk(
  'events/removeEvent',
  async (id: string) => {
    return await eventApi.deleteEvent(id);
  }
);

export const getSuggestedTimes = createAsyncThunk(
  'events/suggestTimes',
  async ({ userIds, date, duration }: { userIds: string[], date: string, duration: number }) => {
    return await eventApi.suggestTimes(userIds, date, duration);
  }
);

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuggestedTimeSlots: (state) => {
      state.suggestedTimeSlots = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch events
      .addCase(fetchUserEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserEvents.fulfilled, (state, action: PayloadAction<Event[]>) => {
        state.events = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch events';
      })

      // Create event
      .addCase(createNewEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewEvent.fulfilled, (state, action: PayloadAction<Event>) => {
        state.events.push(action.payload);
        state.loading = false;
      })
      .addCase(createNewEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create event';
      })

      // Update event
      .addCase(updateExistingEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExistingEvent.fulfilled, (state, action: PayloadAction<Event>) => {
        const index = state.events.findIndex(e => e.id === action.payload.id);
        if (index !== -1) {
          state.events[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateExistingEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update event';
      })

      // Delete event
      .addCase(removeEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeEvent.fulfilled, (state, action: PayloadAction<Event>) => {
        state.events = state.events.filter(e => e.id !== action.payload.id);
        state.loading = false;
      })
      .addCase(removeEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete event';
      })

      // Suggest times
      .addCase(getSuggestedTimes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSuggestedTimes.fulfilled, (state, action: PayloadAction<TimeSlot[]>) => {
        state.suggestedTimeSlots = action.payload;
        state.loading = false;
      })
      .addCase(getSuggestedTimes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to suggest times';
      });
  },
});

export const { clearError, clearSuggestedTimeSlots } = eventsSlice.actions;
export default eventsSlice.reducer;
