import { useState } from 'react';
import {
  Box,
  Button,
  Group,
  Text,
} from '@mantine/core';
import { IconChevronLeft, IconChevronRight, IconPlus } from '@tabler/icons-react';
import { getWeekDays, formatDate, addDays } from '../../utils/dateUtils';
import WeekGrid from './WeekGrid';
import EventModal from '../Events/EventModal';
import { CalendarEvent } from '../../types';
import * as eventService from '../../services/eventService';

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [weekDays, setWeekDays] = useState<Date[]>(getWeekDays(currentDate));
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [eventsByDay, setEventsByDay] = useState<Record<string, CalendarEvent[]>>({});

  const fetchWeekEvents = async () => {
    const startOfWeek = weekDays[0];
    const endOfWeek = addDays(weekDays[6], 1);

    try {
      const events = await eventService.getEvents(startOfWeek, endOfWeek);

      const eventMap: Record<string, CalendarEvent[]> = {};

      weekDays.forEach(day => {
        const dateStr = day.toISOString().split('T')[0];
        eventMap[dateStr] = events.filter(event =>
          new Date(event.start).toISOString().split('T')[0] === dateStr
        );
      });

      setEventsByDay(eventMap);
      return eventMap;
    } catch (error) {
      console.error('Failed to fetch events:', error);
      return {};
    }
  };
  
  useState(() => {
    fetchWeekEvents();
  });

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + (direction === 'prev' ? -7 : 7));
    setCurrentDate(newDate);
    setWeekDays(getWeekDays(newDate));
    fetchWeekEvents();
  };

  const handleAddEvent = () => {
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const handleEditEvent = (event: CalendarEvent) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleDeleteEvent = async (id: string) => {
    await eventService.removeEvent(id);
    fetchWeekEvents();
  };

  const handleSaveEvent = async (event: CalendarEvent | Omit<CalendarEvent, 'id'>) => {
    if ('id' in event) {
      await eventService.editEvent(event as CalendarEvent);
    } else {
      await eventService.addEvent(event);
    }
    setIsModalOpen(false);
    fetchWeekEvents();
  };

  return (
    <Box>
      <Group justify="center" m="lg">
        <Group justify="space-between">
          <Button
            variant="outline"
            leftSection={<IconChevronLeft size={16} />}
            onClick={() => navigateWeek('prev')}
          >
            Previous
          </Button>
          <Text size="xl">
            {formatDate(weekDays[0])} - {formatDate(weekDays[weekDays.length - 1])}
          </Text>
          <Button
            variant="outline"
            rightSection={<IconChevronRight size={16} />}
            onClick={() => navigateWeek('next')}
          >
            Next
          </Button>
        </Group>
        <Button
          leftSection={<IconPlus size={16} />}
          onClick={handleAddEvent}
        >
          Add Event
        </Button>
      </Group>

      <WeekGrid
        days={weekDays}
        events={eventsByDay}
        onEditEvent={handleEditEvent}
        onDeleteEvent={handleDeleteEvent}
      />

      <EventModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={editingEvent}
        onSave={handleSaveEvent}
      />
    </Box>
  );
}