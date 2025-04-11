import React, { useState, useCallback, ReactNode } from 'react';
import CalendarContext, { CalendarContextType } from './CalendarContext';
import { CalendarEvent, UserAvailability, MeetingSuggestion } from '../types';
import { findBestMeetingTimes } from '../utils/dateUtils';

interface CalendarProviderProps {
  children: ReactNode;
}

// Generate a UUID for events
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Sample initial events
const initialEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Team Meeting',
    start: new Date(new Date().setHours(10, 0, 0, 0)),
    end: new Date(new Date().setHours(11, 0, 0, 0)),
    attendees: ['user1@example.com', 'user2@example.com'],
    description: 'Weekly team sync',
    color: '#4299E1'
  },
  {
    id: '2',
    title: 'Project Review',
    start: new Date(new Date().setHours(14, 0, 0, 0)),
    end: new Date(new Date().setHours(15, 30, 0, 0)),
    attendees: ['user1@example.com', 'user3@example.com'],
    description: 'Review project progress',
    color: '#9F7AEA'
  }
];

export const CalendarProvider: React.FC<CalendarProviderProps> = ({ children }) => {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const addEvent = useCallback((eventData: Omit<CalendarEvent, 'id'>) => {
    const newEvent: CalendarEvent = {
      ...eventData,
      id: generateId()
    };
    setEvents(prevEvents => [...prevEvents, newEvent]);
  }, []);

  const updateEvent = useCallback((updatedEvent: CalendarEvent) => {
    setEvents(prevEvents => 
      prevEvents.map(event => 
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  }, []);

  const deleteEvent = useCallback((id: string) => {
    setEvents(prevEvents => prevEvents.filter(event => event.id !== id));
  }, []);

  const moveEvent = useCallback((id: string, newStart: Date) => {
    setEvents(prevEvents => 
      prevEvents.map(event => {
        if (event.id === id) {
          // Calculate event duration to preserve it
          const durationMs = event.end.getTime() - event.start.getTime();
          // Create new end time
          const newEnd = new Date(newStart.getTime() + durationMs);
          
          return {
            ...event,
            start: newStart,
            end: newEnd
          };
        }
        return event;
      })
    );
  }, []);

  const suggestMeetingTimes = useCallback(
    (user1: UserAvailability, user2: UserAvailability, duration: number = 30): MeetingSuggestion[] => {
      return findBestMeetingTimes(user1, user2, duration);
    },
    []
  );

  // Create the context value object
  const contextValue: CalendarContextType = {
    events,
    currentDate,
    setCurrentDate,
    addEvent,
    updateEvent,
    deleteEvent,
    suggestMeetingTimes,
    moveEvent
  };

  return (
    <CalendarContext.Provider value={contextValue}>
      {children}
    </CalendarContext.Provider>
  );
};

export default CalendarProvider; 