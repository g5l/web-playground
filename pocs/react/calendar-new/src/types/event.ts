export interface Event {
  id: string;
  title: string;
  description?: string;
  start: string;
  end: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TimeSlot {
  start: string;
  end: string;
}