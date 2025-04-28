export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
};

export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

export const getWeekDates = (currentDate: Date): Date[] => {
  const dates: Date[] = [];
  const day = currentDate.getDay();

  // Calculate the start date (Sunday of the current week)
  const startDate = new Date(currentDate);
  startDate.setDate(currentDate.getDate() - day);

  // Generate dates for the week
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    dates.push(date);
  }

  return dates;
};

export const getTimeSlots = (): Date[] => {
  const slots: Date[] = [];
  const baseDate = new Date();
  baseDate.setHours(0, 0, 0, 0);

  for (let hour = 0; hour < 24; hour++) {
    const date = new Date(baseDate);
    date.setHours(hour);
    slots.push(date);
  }

  return slots;
};

export const areDatesOnSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const isEventInTimeSlot = (event: { start: string; end: string }, slotStart: Date, slotEnd: Date): boolean => {
  const eventStart = new Date(event.start);
  const eventEnd = new Date(event.end);

  // Check if event overlaps with time slot
  return (
    (eventStart >= slotStart && eventStart < slotEnd) ||
    (eventEnd > slotStart && eventEnd <= slotEnd) ||
    (eventStart <= slotStart && eventEnd >= slotEnd)
  );
};