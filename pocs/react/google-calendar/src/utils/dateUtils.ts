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
