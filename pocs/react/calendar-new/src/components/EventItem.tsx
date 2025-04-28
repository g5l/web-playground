import {ActionIcon, Box, Card, Group, Text} from '@mantine/core';
import {IconEdit, IconTrash} from '@tabler/icons-react';
import React from 'react';
import {Event} from '../types/event';
import {formatTime} from '../utils/dateUtils';

interface EventItemProps {
  event: Event;
  onEdit: (event: Event) => void;
  onDelete: (id: string) => void;
}

const EventItem = ({event, onEdit, onDelete}: EventItemProps) => {
  const startTime = formatTime(new Date(event.start));
  const endTime = formatTime(new Date(event.end));

  return (
    <Card p="xs" shadow="sm" radius="md" withBorder mb="xs">
      <Group position="apart" noWrap>
        <Box>
          <Text weight={500} size="sm" lineClamp={1}>
            {event.title}
          </Text>
          <Text size="xs" color="dimmed">
            {startTime} - {endTime}
          </Text>
        </Box>
        <Group spacing={5} noWrap>
          <ActionIcon size="sm" color="blue" onClick={() => onEdit(event)}>
            <IconEdit size={16}/>
          </ActionIcon>
          <ActionIcon size="sm" color="red" onClick={() => onDelete(event.id)}>
            <IconTrash size={16}/>
          </ActionIcon>
        </Group>
      </Group>
    </Card>
  );
};

export default EventItem;