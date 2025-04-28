import {Box, Grid, Stack, Text} from '@mantine/core';
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {Event} from '../types/event';
import {areDatesOnSameDay, formatDate, formatTime, getTimeSlots, getWeekDates, isEventInTimeSlot} from '../utils/dateUtils';
import EventItem from './EventItem';

interface WeekGridProps {
  onEditEvent: (event: Event) => void;
  onDeleteEvent: (id: string) => void;
  onTimeClick: (date: Date) => void;
}

const WeekGrid = ({onEditEvent, onDeleteEvent, onTimeClick}: WeekGridProps) => {
  const {currentDate} = useSelector((state: RootState) => state.calendar);
  const {events} = useSelector((state: RootState) => state.events);

  const weekDates = getWeekDates(new Date(currentDate));
  const timeSlots = getTimeSlots();

  return (
    <Box style={{overflowX: 'auto'}}>
      <Grid gutter={0}>
        {/* Header with weekdays */}
        <Grid.Col span={1}>
          <Box p="xs" sx={{height: '60px'}}></Box>
        </Grid.Col>

        {weekDates.map((date, index) => (
          <Grid.Col span={1} key={index}>
            <Box p="xs" sx={{height: '60px', textAlign: 'center'}}>
              <Text weight={500}>{formatDate(date)}</Text>
            </Box>
          </Grid.Col>
        ))}

        {/* Time slots */}
        {timeSlots.map((time, timeIndex) => (
          <React.Fragment key={timeIndex}>
            <Grid.Col span={1}>
              <Box p="xs" sx={{height: '120px', borderTop: '1px solid #eee'}}>
                <Text size="xs" color="dimmed">{formatTime(time)}</Text>
              </Box>
            </Grid.Col>

            {weekDates.map((date, dateIndex) => {
              const dateTime = new Date(date);
              dateTime.setHours(time.getHours(), 0, 0, 0);

              const nextHour = new Date(dateTime);
              nextHour.setHours(dateTime.getHours() + 1);

              const dayEvents = events.filter(event => {
                const eventDate = new Date(event.start);
                return areDatesOnSameDay(eventDate, date) &&
                  isEventInTimeSlot(event, dateTime, nextHour);
              });

              // Group overlapping events
              const groupedEvents = groupOverlappingEvents(dayEvents);

              return (
                <Grid.Col span={1} key={dateIndex}>
                  <Box
                    p="xs"
                    sx={{
                      height: '120px',
                      border: '1px solid #eee',
                      '&:hover': {backgroundColor: '#f9f9f9'},
                      cursor: 'pointer'
                    }}
                    onClick={() => onTimeClick(dateTime)}
                  >
                    <Stack spacing={5}>
                      {groupedEvents.map((group, groupIndex) => (
                        <Box key={groupIndex} sx={{width: `${100 / groupedEvents.length}%`, marginLeft: `${(groupIndex * 100) / groupedEvents.length}%`}}>
                          {group.map(event => (
                            <EventItem
                              key={event.id}
                              event={event}
                              onEdit={onEditEvent}
                              onDelete={onDeleteEvent}
                            />
                          ))}
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                </Grid.Col>
              );
            })}
          </React.Fragment>
        ))}
      </Grid>
    </Box>
  );
};

// Helper function to group overlapping events
const groupOverlappingEvents = (events: Event[]): Event[][] => {
  if (events.length <= 1) return events.map(event => [event]);

  // Sort events by start time
  const sortedEvents = [...events].sort((a, b) =>
    new Date(a.start).getTime() - new Date(b.start).getTime()
  );

  const groups: Event[][] = [];
  let currentGroup: Event[] = [];

  sortedEvents.forEach(event => {
    // Check if event overlaps with any event in current group
    const overlaps = currentGroup.some(groupEvent => {
      const eventStart = new Date(event.start);
      const eventEnd = new Date(event.end);
      const groupEventStart = new Date(groupEvent.start);
      const groupEventEnd = new Date(groupEvent.end);

      return (eventStart < groupEventEnd && eventEnd > groupEventStart);
    });

    if (overlaps || currentGroup.length === 0) {
      currentGroup.push(event);
    } else {
      groups.push([...currentGroup]);
      currentGroup = [event];
    }
  });

  if (currentGroup.length > 0) {
    groups.push(currentGroup);
  }

  return groups;
};

export default WeekGrid;