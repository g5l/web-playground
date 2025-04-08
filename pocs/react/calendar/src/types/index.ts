export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
  attendees: string[];
  color?: string;
}

export interface UserAvailability {
  userId: string;
  name: string;
  availableSlots: {
    start: Date;
    end: Date;
  }[];
}

export interface MeetingSuggestion {
  start: Date;
  end: Date;
  score: number; // Higher is better
}

export type DayOfWeek = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

export interface TimeSlot {
  time: Date;
  events: CalendarEvent[];
}

export interface DayColumn {
  date: Date;
  dayOfWeek: DayOfWeek;
  timeSlots: TimeSlot[];
} 