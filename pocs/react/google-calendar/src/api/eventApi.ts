import colors from "../assets/colors";
import { CalendarEvent } from '../types';

let events: CalendarEvent[] = [
  {
    id: '1',
    title: 'Team Meeting',
    description: 'Weekly sync with the team',
    start: new Date(new Date().setHours(10, 0, 0, 0)),
    end: new Date(new Date().setHours(11, 0, 0, 0)),
    color: colors.blue,
  },
  {
    id: '2',
    title: 'Lunch with Client',
    description: 'Discuss project timeline',
    start: new Date(new Date().setHours(12, 0, 0, 0)),
    end: new Date(new Date().setHours(13, 30, 0, 0)),
    color: colors.orange,
  },
];

export const fetchEvents = async (startDate: Date, endDate: Date): Promise<CalendarEvent[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));

  return events.filter(event => event.start >= startDate && event.end <= endDate);
};

export const createEvent = async (event: Omit<CalendarEvent, 'id'>): Promise<CalendarEvent> => {
  await new Promise(resolve => setTimeout(resolve, 300));

  const newEvent = {
    ...event,
    id: Date.now().toString(),
  };

  events.push(newEvent);
  return newEvent;
};

export const updateEvent = async (event: CalendarEvent): Promise<CalendarEvent> => {
  await new Promise(resolve => setTimeout(resolve, 300));

  events = events.map(e => e.id === event.id ? event : e);
  return event;
};

export const deleteEvent = async (id: string): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 300));

  const initialLength = events.length;
  events = events.filter(e => e.id !== id);

  return initialLength > events.length;
};