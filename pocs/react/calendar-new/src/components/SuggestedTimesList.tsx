import {Badge, Button, Card, Group, Paper, Stack, Text, Title} from '@mantine/core';
import React from 'react';
import {TimeSlot} from '../types/event';
import {formatTime} from '../utils/dateUtils';

interface SuggestedTimesListProps {
  slots: TimeSlot[];
  onSelectSlot: (slot: TimeSlot) => void;
}

const SuggestedTimesList = ({slots, onSelectSlot}: SuggestedTimesListProps) => {
  if (slots.length === 0) {
    return null;
  }

  return (
    <Paper p="md" mt="lg" shadow="sm" radius="md" withBorder>
      <Title order={3} mb="md">Suggested Meeting Times</Title>

      {slots.length === 0 ? (
        <Text color="dimmed">No available time slots found for the selected criteria.</Text>
      ) : (
        <Stack spacing="md">
          {slots.map((slot, index) => {
            const startTime = new Date(slot.start);
            const endTime = new Date(slot.end);
            const duration = (endTime.getTime() - startTime.getTime()) / (1000 * 60); // in minutes

            return (
              <Card key={index} p="sm" withBorder>
                <Group position="apart">
                  <div>
                    <Text weight={500}>
                      {startTime.toLocaleDateString()} • {formatTime(startTime)} - {formatTime(endTime)}
                    </Text>
                    <Group spacing="xs" mt={5}>
                      <Badge size="sm">{duration} minutes</Badge>
                    </Group>
                  </div>
                  <Button size="sm" onClick={() => onSelectSlot(slot)}>
                    Schedule
                  </Button>
                </Group>
              </Card>
            );
          })}
        </Stack>
      )}
    </Paper>
  );
};

export default SuggestedTimesList;