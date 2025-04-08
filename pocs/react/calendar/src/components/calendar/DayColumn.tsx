import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { format } from 'date-fns';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { DayColumn as DayColumnType } from '../../types';
import CalendarEvent from './CalendarEvent';
import { useCalendar } from '../../context/CalendarContext';

interface DayColumnProps {
  column: DayColumnType;
  columnIndex: number;
}

const DayColumn: React.FC<DayColumnProps> = ({ column, columnIndex }) => {
  const { moveEvent } = useCalendar();
  const isToday = format(column.date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
  
  // Group time slots by hour for display
  const hourSlots: Record<string, React.ReactNode> = {};
  
  // Handle drop event
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, hour: number, minute: number) => {
    e.preventDefault();
    
    try {
      // Get the dragged event data
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      const eventId = data.eventId;
      
      if (eventId) {
        // Create new date for the event based on drop location
        const newStart = new Date(column.date);
        newStart.setHours(hour, minute, 0, 0);
        
        // Update the event with the new start time
        moveEvent(eventId, newStart);
      }
    } catch (error) {
      console.error('Error parsing drag data:', error);
    }
  };
  
  // Handle drag over (prevent default to allow drop)
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
  };
  
  // Handle drag leave
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('drag-over');
  };
  
  // Process time slots (every 30 min) and organize them by hour
  column.timeSlots.forEach((slot, slotIndex) => {
    const hour = slot.time.getHours();
    const minute = slot.time.getMinutes();
    const hourKey = `${hour}`;
    
    // Find events that start at this exact time slot
    const startingEvents = slot.events.filter(event => 
      format(event.start, 'HH:mm') === format(slot.time, 'HH:mm')
    );
    
    // Create event elements that start at this time
    const eventElements = startingEvents.map((event, eventIndex) => (
      <CalendarEvent 
        key={event.id}
        event={event}
      />
    ));
    
    // For the first slot of each hour (e.g., XX:00), create the hour cell
    if (minute === 0) {
      hourSlots[hourKey] = (
        <Box 
          key={`hour-${hour}`}
          height="100px"
          borderBottom="1px"
          borderRight="1px"
          borderColor="gray.200"
          position="relative"
          bg={isToday ? "blue.50" : "white"}
        >
          {/* Droppable area for XX:00 */}
          <Box
            height="50%"
            width="100%"
            position="relative"
            borderBottom="1px dashed"
            borderColor="gray.200"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, hour, 0)}
            data-droppable-id={`timeslot-${columnIndex}-${hour}-0`}
          >
            {eventElements}
          </Box>
          
          {/* Droppable area for XX:30 */}
          <Box
            height="50%"
            width="100%"
            position="relative"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, hour, 30)}
            data-droppable-id={`timeslot-${columnIndex}-${hour}-30`}
          >
            {column.timeSlots[slotIndex + 1]?.events
              .filter(event => format(event.start, 'HH:mm') === format(new Date().setHours(hour, 30), 'HH:mm'))
              .map((event) => (
                <CalendarEvent 
                  key={event.id}
                  event={event}
                />
              ))}
          </Box>
        </Box>
      );
    }
  });
  
  // Render hour slots from 8 AM to 6 PM
  return (
    <Box>
      {Array.from({ length: 11 }, (_, i) => i + 8).map(hour => (
        <React.Fragment key={hour}>
          {hourSlots[hour.toString()]}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default DayColumn; 