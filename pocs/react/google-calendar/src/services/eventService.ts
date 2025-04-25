import { CalendarEvent } from '../types';
import * as EventApi from '../api/eventApi';

export const getEvents = (startDate: Date, endDate: Date) => {
  return EventApi.fetchEvents(startDate, endDate);
};

export const addEvent = (event: Omit<CalendarEvent, 'id'>) => {
  return EventApi.createEvent(event);
};

export const editEvent = (event: CalendarEvent) => {
  return EventApi.updateEvent(event);
};

export const removeEvent = (id: string) => {
  return EventApi.deleteEvent(id);
};

export const findConflictingEvents = (events: CalendarEvent[]): { [key: string]: CalendarEvent[] } => {
  const conflicts: { [key: string]: CalendarEvent[] } = {};

  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    const eventConflicts: CalendarEvent[] = [];

    for (let j = 0; j < events.length; j++) {
      if (i === j) continue;

      const otherEvent = events[j];

      if (
        (event.start < otherEvent.end && event.end > otherEvent.start) ||
        (otherEvent.start < event.end && otherEvent.end > event.start)
      ) {
        eventConflicts.push(otherEvent);
      }
    }

    if (eventConflicts.length > 0) {
      conflicts[event.id] = eventConflicts;
    }
  }

  return conflicts;
};