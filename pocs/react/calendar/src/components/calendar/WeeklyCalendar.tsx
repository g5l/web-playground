import React, { useMemo } from 'react';
import { Box, Grid, Heading, Text, Flex, Button, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { addDays, subDays, startOfWeek, format } from 'date-fns';

import { useCalendar } from '../../context/CalendarContext';
import { generateTimeSlots, getWeekDays, formatDate, getDayOfWeek } from '../../utils/dateUtils';
import { DayColumn as DayColumnType } from '../../types';
import DayColumn from './DayColumn';

const WeeklyCalendar: React.FC = () => {
  const { events, currentDate, setCurrentDate, moveEvent } = useCalendar();

  // Get the days for the current week
  const weekDays = useMemo(() => getWeekDays(currentDate), [currentDate]);

  // Generate day columns with time slots
  const dayColumns: DayColumnType[] = useMemo(() => {
    return weekDays.map(day => ({
      date: day,
      dayOfWeek: getDayOfWeek(day),
      timeSlots: generateTimeSlots(day, events)
    }));
  }, [weekDays, events]);

  // Navigate to previous week
  const handlePreviousWeek = () => {
    setCurrentDate(subDays(currentDate, 7));
  };

  // Navigate to next week
  const handleNextWeek = () => {
    setCurrentDate(addDays(currentDate, 7));
  };

  // Set current date to today
  const handleToday = () => {
    setCurrentDate(new Date());
  };

  // Get the week range for display (e.g., "May 1 - May 7, 2023")
  const weekRange = useMemo(() => {
    const start = startOfWeek(currentDate, { weekStartsOn: 0 });
    const end = addDays(start, 6);
    return `${format(start, 'MMM d')} - ${format(end, 'MMM d, yyyy')}`;
  }, [currentDate]);

  return (
    <Box>
      {/* Calendar Header */}
      <Flex justifyContent="space-between" alignItems="center" mb={4} p={2}>
        <Flex align="center">
          <Heading size="lg">Calendar</Heading>
          <Button ml={4} size="sm" onClick={handleToday}>
            Today
          </Button>
        </Flex>
        
        <Flex align="center">
          <IconButton
            aria-label="Previous week"
            icon={<ChevronLeftIcon />}
            onClick={handlePreviousWeek}
            size="sm"
            mr={2}
          />
          <Heading size="md">{weekRange}</Heading>
          <IconButton
            aria-label="Next week"
            icon={<ChevronRightIcon />}
            onClick={handleNextWeek}
            size="sm"
            ml={2}
          />
        </Flex>
      </Flex>

      {/* Calendar Grid */}
      <Grid templateColumns={`70px repeat(${weekDays.length}, 1fr)`} w="100%" overflowX="auto">
        {/* Time column header */}
        <Box borderBottom="1px" borderRight="1px" borderColor="gray.200" p={2}>
          <Text fontWeight="bold" textAlign="center">Time</Text>
        </Box>
        
        {/* Day column headers */}
        {dayColumns.map((column, index) => (
          <Box 
            key={`header-${index}`} 
            borderBottom="1px" 
            borderRight="1px" 
            borderColor="gray.200" 
            p={2}
            bg={format(column.date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd') ? "blue.50" : ""}
          >
            <Text fontWeight="bold" textAlign="center">{column.dayOfWeek}</Text>
            <Text fontSize="sm" textAlign="center">{formatDate(column.date)}</Text>
          </Box>
        ))}
        
        {/* Time labels */}
        <Box>
          {Array.from({ length: 11 }, (_, i) => i + 8).map(hour => (
            <Flex 
              key={`time-${hour}`} 
              height="100px" 
              alignItems="center" 
              justifyContent="center"
              borderBottom="1px"
              borderRight="1px"
              borderColor="gray.200"
              p={2}
              position="relative"
            >
              <Text fontSize="sm">{hour % 12 || 12}{hour < 12 ? 'am' : 'pm'}</Text>
            </Flex>
          ))}
        </Box>
        
        {/* Day columns with events */}
        {dayColumns.map((column, index) => (
          <DayColumn 
            key={`column-${index}`} 
            column={column} 
            columnIndex={index} 
          />
        ))}
      </Grid>
    </Box>
  );
};

export default WeeklyCalendar; 