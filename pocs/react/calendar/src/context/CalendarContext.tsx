import { createContext, useContext } from 'react';
import { CalendarEvent, UserAvailability, MeetingSuggestion } from '../types';

// Define the shape of our context
export interface CalendarContextType {
  events: CalendarEvent[];
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  addEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  updateEvent: (event: CalendarEvent) => void;
  deleteEvent: (id: string) => void;
  suggestMeetingTimes: (user1: UserAvailability, user2: UserAvailability, duration?: number) => MeetingSuggestion[];
  moveEvent: (id: string, newStart: Date) => void;
}

// Create the context with undefined as default value
const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

// Hook for consuming the calendar context
export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};

export default CalendarContext; 