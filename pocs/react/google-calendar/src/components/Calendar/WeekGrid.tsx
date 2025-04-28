import { Box, Grid, Paper, Text, useMantineTheme } from '@mantine/core';
import * as eventService from '../../services/eventService';
import { CalendarEvent } from '../../types';
import { formatDate } from '../../utils/dateUtils';
import EventItem from '../Events/EventItem';
import styles from './WeekGrid.module.css';
import { useEffect } from 'react';

interface WeekGridProps {
  days: Date[];
  events: Record<string, CalendarEvent[]>;
  onEditEvent: (event: CalendarEvent) => void;
  onDeleteEvent: (id: string) => void;
}

export default function WeekGrid({ days, events, onEditEvent, onDeleteEvent }: WeekGridProps) {
  const theme = useMantineTheme();
  const hours = Array.from({ length: 24 }, (_, i) => i);

  useEffect(() => {
    document.documentElement.style.setProperty('--gray-border', theme.colors.gray[3]);
    document.documentElement.style.setProperty('--day-header-bg', theme.colors.gray[0]);
  }, [theme]);

  const timeSlots = hours.map(hour => (
    <Box key={hour} className={styles.timeSlot}>
      <Text size="xs" color="dimmed" align="right" pr={10}>
        {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
      </Text>
    </Box>
  ));

  const handleEventConflicts = (dayEvents: CalendarEvent[]) => {
    const conflicts = eventService.findConflictingEvents(dayEvents);
    const eventPositioning: Record<string, { width: string; left: string }> = {};

    dayEvents.forEach(event => {
      eventPositioning[event.id] = { width: '95%', left: '2.5%' };
    });

    Object.entries(conflicts).forEach(([eventId, conflictingEvents]) => {
      const totalEvents = conflictingEvents.length + 1; 
      const eventWidth = 95 / totalEvents;

      let positionIndex = 0;
      const sortedEvents = [{ id: eventId }, ...conflictingEvents]
        .sort((a, b) => a.id.localeCompare(b.id));

      sortedEvents.forEach((e, idx) => {
        if (e.id === eventId) positionIndex = idx;
      });

      eventPositioning[eventId] = {
        width: `${eventWidth}%`,
        left: `${2.5 + (positionIndex * eventWidth)}%`
      };

      conflictingEvents.forEach(conflict => {
        const conflictIndex = sortedEvents.findIndex(e => e.id === conflict.id);
        eventPositioning[conflict.id] = {
          width: `${eventWidth}%`,
          left: `${2.5 + (conflictIndex * eventWidth)}%`
        };
      });
    });

    return { eventPositioning, conflicts };
  };

  return (
    <Grid gutter={0}>
      <Grid.Col span={1}>
        <Box className={styles.weekContainer}>
          {timeSlots}
        </Box>
      </Grid.Col>

      {days.map((day, index) => {
        const dateStr = day.toISOString().split('T')[0];
        const dayEvents = events[dateStr] || [];
        const { eventPositioning } = handleEventConflicts(dayEvents);
        const isLastColumn = index === days.length - 1;

        return (
          <Grid.Col key={index} span={1.57}>
            <Paper withBorder className={styles.dayHeader}>
              <Text size="sm" ta="center">{formatDate(day)}</Text>
            </Paper>

            <Box className={`${styles.dayColumn} ${!isLastColumn ? styles.rightBorder : ''}`}>
              {hours.map(hour => (
                <Box key={hour} className={styles.hourCell} />
              ))}

              {dayEvents.map(event => {
                const startHour = event.start.getHours();
                const startMinute = event.start.getMinutes();
                const endHour = event.end.getHours();
                const endMinute = event.end.getMinutes();

                const top = (startHour * 60) + startMinute;
                const height = ((endHour * 60) + endMinute) - top;
                const positioning = eventPositioning[event.id];

                return (
                  <EventItem
                    key={event.id}
                    event={event}
                    style={{
                      top: `${top}px`,
                      height: `${height}px`,
                      width: positioning.width,
                      left: positioning.left,
                    }}
                    onEdit={() => onEditEvent(event)}
                    onDelete={() => onDeleteEvent(event.id)}
                  />
                );
              })}
            </Box>
          </Grid.Col>
        );
      })}
    </Grid>
  );
}