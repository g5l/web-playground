import axios from 'axios';
import { Event, TimeSlot } from '../types/event';

const API_URL = 'http://localhost:3001/api';

export const fetchEvents = async (userId?: string, startDate?: string, endDate?: string) => {
  const params = { userId, startDate, endDate };
  const response = await axios.get<Event[]>(`${API_URL}/events`, { params });
  return response.data;
};

export const fetchEvent = async (id: string) => {
  const response = await axios.get<Event>(`${API_URL}/events/${id}`);
  return response.data;
};

export const createEvent = async (event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>) => {
  const response = await axios.post<Event>(`${API_URL}/events`, event);
  return response.data;
};

export const updateEvent = async (id: string, event: Partial<Event>) => {
  const response = await axios.put<Event>(`${API_URL}/events/${id}`, event);
  return response.data;
};

export const deleteEvent = async (id: string) => {
  const response = await axios.delete<Event>(`${API_URL}/events/${id}`);
  return response.data;
};

export const suggestTimes = async (userIds: string[], date: string, duration: number) => {
  const response = await axios.post<TimeSlot[]>(`${API_URL}/events/suggest`, {
    userIds,
    date,
    duration
  });
  return response.data;
};