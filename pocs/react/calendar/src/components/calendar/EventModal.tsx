import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Stack,
  HStack,
  Box,
  useToast
} from '@chakra-ui/react';
import { CalendarEvent } from '../../types';
import { useCalendar } from '../../context/CalendarContext';
import { format, setHours, setMinutes, parseISO } from 'date-fns';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventToEdit?: CalendarEvent;
  initialDate?: Date;
}

const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  eventToEdit,
  initialDate = new Date()
}) => {
  const { addEvent, updateEvent } = useCalendar();
  const toast = useToast();
  const isEditing = !!eventToEdit;

  // Form state
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    attendees: string;
    color: string;
  }>({
    title: '',
    description: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    attendees: '',
    color: '#4299E1' // Default blue
  });

  // Initialize form with event data if editing
  useEffect(() => {
    if (eventToEdit) {
      setFormData({
        title: eventToEdit.title,
        description: eventToEdit.description || '',
        startDate: format(eventToEdit.start, 'yyyy-MM-dd'),
        startTime: format(eventToEdit.start, 'HH:mm'),
        endDate: format(eventToEdit.end, 'yyyy-MM-dd'),
        endTime: format(eventToEdit.end, 'HH:mm'),
        attendees: eventToEdit.attendees.join(', '),
        color: eventToEdit.color || '#4299E1'
      });
    } else if (initialDate) {
      // If creating a new event, use the provided initialDate or default to now
      setFormData({
        title: '',
        description: '',
        startDate: format(initialDate, 'yyyy-MM-dd'),
        startTime: format(initialDate, 'HH:mm'),
        endDate: format(initialDate, 'yyyy-MM-dd'),
        endTime: format(addMinutes(initialDate, 30), 'HH:mm'),
        attendees: '',
        color: '#4299E1'
      });
    }
  }, [eventToEdit, initialDate, isOpen]);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Parse form data into a CalendarEvent object
  const parseFormData = (): Omit<CalendarEvent, 'id'> | null => {
    try {
      // Parse dates from form inputs
      const startDate = parseISO(`${formData.startDate}T${formData.startTime}`);
      const endDate = parseISO(`${formData.endDate}T${formData.endTime}`);

      // Validate date logic
      if (endDate <= startDate) {
        toast({
          title: 'Invalid time range',
          description: 'End time must be after start time',
          status: 'error',
          duration: 3000,
          isClosable: true
        });
        return null;
      }

      // Parse attendees
      const attendees = formData.attendees
        .split(',')
        .map((email) => email.trim())
        .filter((email) => email.length > 0);

      return {
        title: formData.title,
        description: formData.description,
        start: startDate,
        end: endDate,
        attendees,
        color: formData.color
      };
    } catch (error) {
      toast({
        title: 'Invalid form data',
        description: 'Please check the form fields',
        status: 'error',
        duration: 3000,
        isClosable: true
      });
      return null;
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!formData.title) {
      toast({
        title: 'Title required',
        description: 'Please provide a title for the event',
        status: 'error',
        duration: 3000,
        isClosable: true
      });
      return;
    }

    const eventData = parseFormData();
    if (!eventData) return;

    if (isEditing && eventToEdit) {
      updateEvent({ ...eventData, id: eventToEdit.id });
      toast({
        title: 'Event updated',
        status: 'success',
        duration: 3000,
        isClosable: true
      });
    } else {
      addEvent(eventData);
      toast({
        title: 'Event created',
        status: 'success',
        duration: 3000,
        isClosable: true
      });
    }

    onClose();
  };

  // Helper function to add minutes to a date
  const addMinutes = (date: Date, minutes: number): Date => {
    const newDate = new Date(date);
    newDate.setMinutes(newDate.getMinutes() + minutes);
    return newDate;
  };

  // Available colors for events
  const colorOptions = [
    { value: '#4299E1', label: 'Blue' },
    { value: '#9F7AEA', label: 'Purple' },
    { value: '#ED8936', label: 'Orange' },
    { value: '#48BB78', label: 'Green' },
    { value: '#F56565', label: 'Red' }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isEditing ? 'Edit Event' : 'Create Event'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Event title"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Event description"
                resize="vertical"
              />
            </FormControl>

            <HStack>
              <FormControl isRequired>
                <FormLabel>Start Date</FormLabel>
                <Input
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Start Time</FormLabel>
                <Input
                  name="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={handleChange}
                />
              </FormControl>
            </HStack>

            <HStack>
              <FormControl isRequired>
                <FormLabel>End Date</FormLabel>
                <Input
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>End Time</FormLabel>
                <Input
                  name="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={handleChange}
                />
              </FormControl>
            </HStack>

            <FormControl>
              <FormLabel>Attendees</FormLabel>
              <Input
                name="attendees"
                value={formData.attendees}
                onChange={handleChange}
                placeholder="Comma-separated emails"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Color</FormLabel>
              <HStack spacing={2}>
                {colorOptions.map((color) => (
                  <Box
                    key={color.value}
                    w="30px"
                    h="30px"
                    bg={color.value}
                    borderRadius="md"
                    cursor="pointer"
                    onClick={() => setFormData((prev) => ({ ...prev, color: color.value }))}
                    border={formData.color === color.value ? '2px solid black' : 'none'}
                  />
                ))}
              </HStack>
            </FormControl>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit}>
            {isEditing ? 'Update' : 'Create'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EventModal; 