import React, { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  SimpleGrid,
  Alert,
  AlertIcon,
  Flex
} from '@chakra-ui/react';
import { format, addDays, setHours, setMinutes } from 'date-fns';
import { useCalendar } from '../../context/CalendarContext';
import { UserAvailability, MeetingSuggestion } from '../../types';

const MeetingSuggester: React.FC = () => {
  const { suggestMeetingTimes, addEvent } = useCalendar();
  const [suggestions, setSuggestions] = useState<MeetingSuggestion[]>([]);
  const [duration, setDuration] = useState(30); // Meeting duration in minutes
  
  // Generate sample availability data
  const generateAvailability = (userId: string, name: string): UserAvailability => {
    const today = new Date();
    const availableSlots = [];
    
    // Add some sample available slots for the next 3 days
    for (let day = 0; day < 3; day++) {
      const date = addDays(today, day);
      
      // Morning slot (9 AM - 12 PM)
      availableSlots.push({
        start: setMinutes(setHours(date, 9), 0),
        end: setMinutes(setHours(date, 12), 0)
      });
      
      // Afternoon slot (1 PM - 5 PM)
      availableSlots.push({
        start: setMinutes(setHours(date, 13), 0),
        end: setMinutes(setHours(date, 17), 0)
      });
    }
    
    return {
      userId,
      name,
      availableSlots
    };
  };
  
  // Handle suggestion generation
  const handleGenerateSuggestions = () => {
    // Generate sample availability for two users
    const user1 = generateAvailability('user1', 'User 1');
    const user2 = generateAvailability('user2', 'User 2');
    
    // Get meeting suggestions
    const meetingSuggestions = suggestMeetingTimes(user1, user2, duration);
    setSuggestions(meetingSuggestions);
  };
  
  // Handle scheduling a meeting at the suggested time
  const handleScheduleMeeting = (suggestion: MeetingSuggestion) => {
    // Create a new event with the suggested time
    addEvent({
      title: 'Meeting',
      start: suggestion.start,
      end: suggestion.end,
      description: 'Automatically scheduled meeting',
      attendees: ['user1@example.com', 'user2@example.com'],
      color: '#48BB78' // Green
    });
    
    // Clear suggestions after scheduling
    setSuggestions([]);
  };
  
  return (
    <Box>
      <Heading size="md" mb={4}>Meeting Time Suggester</Heading>
      
      <Stack spacing={4} mb={6}>
        <FormControl>
          <FormLabel>Meeting Duration (minutes)</FormLabel>
          <Input
            type="number"
            min={15}
            step={15}
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            width="150px"
          />
        </FormControl>
        
        <Button
          colorScheme="purple"
          onClick={handleGenerateSuggestions}
          width="fit-content"
        >
          Find Best Meeting Times
        </Button>
      </Stack>
      
      {suggestions.length > 0 ? (
        <Box>
          <Text fontWeight="bold" mb={2}>
            Suggested meeting times (based on availability):
          </Text>
          
          <SimpleGrid columns={[1, 2, 3]} spacing={4}>
            {suggestions.slice(0, 6).map((suggestion, index) => (
              <Box 
                key={index}
                borderWidth="1px"
                borderRadius="md"
                p={3}
                _hover={{ bg: 'gray.50' }}
              >
                <Text fontWeight="bold">
                  {format(suggestion.start, 'EEEE, MMMM d')}
                </Text>
                <Text mb={2}>
                  {format(suggestion.start, 'h:mm a')} - {format(suggestion.end, 'h:mm a')}
                </Text>
                <Flex justify="space-between" align="center">
                  <Text fontSize="sm" color="green.500">
                    Score: {suggestion.score}
                  </Text>
                  <Button
                    size="sm"
                    colorScheme="green"
                    onClick={() => handleScheduleMeeting(suggestion)}
                  >
                    Schedule
                  </Button>
                </Flex>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      ) : (
        <Alert status="info" borderRadius="md">
          <AlertIcon />
          Click "Find Best Meeting Times" to generate scheduling suggestions.
        </Alert>
      )}
    </Box>
  );
};

export default MeetingSuggester; 