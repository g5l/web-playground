import {ActionIcon, Box, Button, Group, Title} from '@mantine/core';
import {IconChevronLeft, IconChevronRight} from '@tabler/icons-react';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {nextWeek, prevWeek, setCurrentDate} from '../redux/calendarSlice';
import {RootState} from '../redux/store';
import {formatDate} from '../utils/dateUtils';

const CalendarHeader = () => {
  const dispatch = useDispatch();
  const {currentDate} = useSelector((state: RootState) => state.calendar);
  const date = new Date(currentDate);

  return (
    <Box p="md">
      <Group mb="md">
        <Title order={2}>{formatDate(date)}</Title>
        <Group>
          <ActionIcon size="lg" variant="light" onClick={() => dispatch(prevWeek())}>
            <IconChevronLeft size={18}/>
          </ActionIcon>
          <Button variant="subtle" onClick={() => dispatch(setCurrentDate(new Date().toISOString()))}>
            Today
          </Button>
          <ActionIcon size="lg" variant="light" onClick={() => dispatch(nextWeek())}>
            <IconChevronRight size={18}/>
          </ActionIcon>
        </Group>
      </Group>
    </Box>
  );
};

export default CalendarHeader;