import { 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  format, 
  addDays, 
  setHours, 
  setMinutes, 
  isSameDay,
  areIntervalsOverlapping,
  isWithinInterval,
  addMinutes,
  getHours,
  getMinutes,
  parseISO
} from 'date-fns';
import { CalendarEvent, DayOfWeek, MeetingSuggestion, TimeSlot, UserAvailability } from '../types';

export const formatTime = (date: Date): string => {
  return format(date, 'h:mm a');
};

export const formatDate = (date: Date): string => {
  return format(date, 'MMM d, yyyy');
};

export const getDayOfWeek = (date: Date): DayOfWeek => {
  return format(date, 'EEEE') as DayOfWeek;
};

export const getWeekDays = (currentDate: Date = new Date()): Date[] => {
  const start = startOfWeek(currentDate, { weekStartsOn: 0 });
  const end = endOfWeek(currentDate, { weekStartsOn: 0 });
  
  return eachDayOfInterval({ start, end });
};

export const generateTimeSlots = (day: Date, events: CalendarEvent[]): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  
  // Generate time slots from 8 AM to 6 PM
  for (let hour = 8; hour <= 18; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = setMinutes(setHours(day, hour), minute);
      
      // Filter events that overlap with this time slot
      const slotEvents = events.filter(event => 
        isSameDay(time, event.start) && 
        isWithinInterval(time, { start: event.start, end: event.end })
      );
      
      slots.push({ time, events: slotEvents });
    }
  }
  
  return slots;
};

export const findBestMeetingTimes = (
  user1: UserAvailability, 
  user2: UserAvailability, 
  duration: number = 30 // Meeting duration in minutes
): MeetingSuggestion[] => {
  const suggestions: MeetingSuggestion[] = [];
  
  // Check each available slot of user1
  user1.availableSlots.forEach(slot1 => {
    // For each slot, check if there's an overlapping slot in user2's availability
    user2.availableSlots.forEach(slot2 => {
      // Check if slots overlap
      if (areIntervalsOverlapping(
        { start: slot1.start, end: slot1.end },
        { start: slot2.start, end: slot2.end }
      )) {
        // Find the overlapping interval
        const overlapStart = new Date(Math.max(slot1.start.getTime(), slot2.start.getTime()));
        const overlapEnd = new Date(Math.min(slot1.end.getTime(), slot2.end.getTime()));
        
        // Calculate overlap duration in minutes
        const overlapDuration = (overlapEnd.getTime() - overlapStart.getTime()) / (1000 * 60);
        
        // If overlap is sufficient for the meeting
        if (overlapDuration >= duration) {
          // We can propose multiple slots within this overlap
          const numSlots = Math.floor(overlapDuration / duration);
          
          for (let i = 0; i < numSlots; i++) {
            const start = addMinutes(overlapStart, i * duration);
            const end = addMinutes(start, duration);
            
            // Calculate score based on time of day (prefer business hours)
            let score = 100;
            const hour = getHours(start);
            if (hour < 9) score -= (9 - hour) * 10;
            if (hour > 16) score -= (hour - 16) * 10;
            
            // Prefer slots on the hour or half-hour
            const minute = getMinutes(start);
            if (minute !== 0 && minute !== 30) score -= 5;
            
            suggestions.push({ start, end, score });
          }
        }
      }
    });
  });
  
  // Sort by score (highest first)
  return suggestions.sort((a, b) => b.score - a.score);
};

export const parseEventDates = (event: any): CalendarEvent => {
  return {
    ...event,
    start: typeof event.start === 'string' ? parseISO(event.start) : event.start,
    end: typeof event.end === 'string' ? parseISO(event.end) : event.end
  };
}; 