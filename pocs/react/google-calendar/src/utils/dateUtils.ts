export const getWeekDays = (date: Date): Date[] => {
  const day = date.getDay();
  const diff = date.getDate() - day;

  return Array(7)
    .fill(0)
    .map((_, i) => {
      const d = new Date(date);
      d.setDate(diff + i);
      return d;
    });
};

export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
};

export const addOneHour = (timeString: string): string => {
  if (!timeString) return "";
  const [hours, minutes] = timeString.split(':').map(Number);

  let newHours = (hours + 1) % 24;

  return `${newHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

export const getTimeFromDate = (date: Date): string => {
  // Get hours and minutes from the Date object
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Format with leading zeros if needed
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');

  // Return in "hh:mm" format
  return `${formattedHours}:${formattedMinutes}`;
}

