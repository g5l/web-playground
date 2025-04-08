import React from 'react';
import { Box, Text, Flex, IconButton, useDisclosure } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { formatTime } from '../../utils/dateUtils';
import { CalendarEvent as CalendarEventType } from '../../types';
import EventModal from './EventModal';
import { useCalendar } from '../../context/CalendarContext';

interface CalendarEventProps {
  event: CalendarEventType;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>, eventId: string) => void;
  onDragEnd?: (e: React.DragEvent<HTMLDivElement>) => void;
}

const CalendarEvent: React.FC<CalendarEventProps> = ({ 
  event,
  onDragStart,
  onDragEnd
}) => {
  const { deleteEvent } = useCalendar();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  // Calculate the display height based on event duration (in minutes)
  const durationMinutes = (event.end.getTime() - event.start.getTime()) / (60 * 1000);
  const heightPercentage = Math.min(100, (durationMinutes / 30) * 100); // 30 min = 100% of a slot
  
  // Handle edit button click
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering drag
    onOpen();
  };
  
  // Handle delete button click
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering drag
    if (window.confirm(`Are you sure you want to delete "${event.title}"?`)) {
      deleteEvent(event.id);
    }
  };

  // Handle drag start
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    // Set the data that will be transferred during the drag
    e.dataTransfer.setData('application/json', JSON.stringify({
      eventId: event.id,
      eventTitle: event.title
    }));
    // Set the drag image/effect
    e.dataTransfer.effectAllowed = 'move';
    
    // Call the parent's onDragStart handler if provided
    if (onDragStart) {
      onDragStart(e, event.id);
    }
  };
  
  // Handle drag end
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    if (onDragEnd) {
      onDragEnd(e);
    }
  };
  
  return (
    <>
      <Box
        height={`${heightPercentage}%`}
        minHeight="25px"
        bg={event.color || 'blue.400'}
        color="white"
        p={1}
        borderRadius="sm"
        mb={1}
        position="relative"
        cursor="grab"
        _hover={{ 
          boxShadow: 'md',
          '& .event-actions': { display: 'flex' } 
        }}
        overflow="hidden"
        zIndex={2}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        data-event-id={event.id}
      >
        <Flex 
          height="100%" 
          direction="column"
          justify="space-between"
        >
          <Box>
            <Text fontSize="xs" fontWeight="bold" noOfLines={1}>
              {event.title}
            </Text>
            <Text fontSize="xs" noOfLines={1}>
              {formatTime(event.start)} - {formatTime(event.end)}
            </Text>
          </Box>
          
          {/* Actions (show on hover) */}
          <Flex 
            className="event-actions" 
            position="absolute" 
            top={0} 
            right={0} 
            bg="rgba(0,0,0,0.3)" 
            borderRadius="sm"
            display="none"
          >
            <IconButton
              aria-label="Edit event"
              icon={<EditIcon />}
              size="xs"
              variant="ghost"
              color="white"
              onClick={handleEdit}
            />
            <IconButton
              aria-label="Delete event"
              icon={<DeleteIcon />}
              size="xs"
              variant="ghost"
              color="white"
              onClick={handleDelete}
            />
          </Flex>
        </Flex>
      </Box>
      
      {/* Edit Modal */}
      <EventModal isOpen={isOpen} onClose={onClose} eventToEdit={event} />
    </>
  );
};

export default CalendarEvent; 