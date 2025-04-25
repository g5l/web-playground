import { useState } from 'react';
import { Paper, Text, ActionIcon, Group, Box, Tooltip } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import colors from "../../assets/colors";
import { CalendarEvent } from '../../types';
import styles from './EventItem.module.css';


interface EventItemProps {
  event: CalendarEvent;
  style: React.CSSProperties;
  onEdit: () => void;
  onDelete: () => void;
}

export default function EventItem({ event, style, onEdit, onDelete }: EventItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const formatEventTime = (event: CalendarEvent) => {
    const formatTime = (date: Date) => {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return `${formatTime(event.start)} - ${formatTime(event.end)}`;
  };

  return (
    <Paper
      className={styles.eventItem}
      style={{
        backgroundColor: event.color || colors.blue,
        ...style,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Box>
        <Text size="xs" w={500}>{event.title}</Text>
        <Text size="xs">{formatEventTime(event)}</Text>
        {event.description && (
          <Text size="xs" lineClamp={1}>{event.description}</Text>
        )}
      </Box>

      {isHovered && (
        <Box className={styles.controlsContainer}>
          <Group spacing={0}>
            <Tooltip label="Edit">
              <ActionIcon size="sm" variant="transparent" color="white" onClick={onEdit}>
                <IconEdit size={14} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Delete">
              <ActionIcon size="sm" variant="transparent" color="white" onClick={onDelete}>
                <IconTrash size={14} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Box>
      )}
    </Paper>
  );
}