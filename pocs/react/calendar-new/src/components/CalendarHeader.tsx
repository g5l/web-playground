import React from 'react';
import { Group, Button, Title, ActionIcon, Box } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { formatDate } from '../utils/dateUtils';

const CalendarHeader = () => {
  const date = new Date();

  return (
    <Box p="md">
      <Group mb="md">
        <Title order={2}>{formatDate(date)}</Title>
        <Group>
          <ActionIcon size="lg" variant="light">
            <IconChevronLeft size={18} />
          </ActionIcon>
          <Button variant="subtle">
            Today
          </Button>
          <ActionIcon size="lg" variant="light">
            <IconChevronRight size={18} />
          </ActionIcon>
        </Group>
      </Group>
    </Box>
  );
};

export default CalendarHeader;