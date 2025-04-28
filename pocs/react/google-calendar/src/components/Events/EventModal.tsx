import {useState, useEffect} from 'react';
import {
  Modal,
  TextInput,
  Textarea,
  Button,
  Group,
  Stack,
  Flex,
  ColorPicker
} from '@mantine/core';
import {TimeInput, DatePicker} from '@mantine/dates';
import {addOneHour, getTimeFromDate} from "../../utils/dateUtils.ts";
import colors from "../../assets/colors";
import {CalendarEvent} from '../../types';

interface EventModalProps {
  open: boolean;
  onClose: () => void;
  event: CalendarEvent | null;
  onSave: (event: CalendarEvent | Omit<CalendarEvent, 'id'>) => void;
}

export default function EventModal({open, onClose, event, onSave}: EventModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>(addOneHour(startTime));
  const [color, setColor] = useState(colors.blue);

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDescription(event.description || '');
      setStartDate(event.start);
      setEndDate(event.end);
      setStartTime(getTimeFromDate(event.start));
      setEndTime(getTimeFromDate(event.end));
      setColor(event.color || colors.blue);
    } else {
      const now = new Date();
      const oneHourLater = new Date(now);
      oneHourLater.setHours(now.getHours() + 1);

      setTitle('');
      setDescription('');
      setStartDate(now);
      setEndDate(now);
      setStartTime(getTimeFromDate(now));
      setEndTime(getTimeFromDate(oneHourLater));
      setColor(colors.blue);
    }
  }, [event, open]);

  const handleSave = () => {
    const start = new Date(startDate);
    const t = startTime.split(":");
    start.setHours(parseInt(t[0]), parseInt(t[1]), 0, 0);

    const end = new Date(endDate);
    const tt = endTime.split(":");
    end.setHours(parseInt(tt[0]), parseInt(tt[1]), 0, 0);

    console.log({start, end});
    
    if (end <= start) {
      alert('End time must be after start time');
      return;
    }

    const eventData = {
      title,
      description: description || undefined,
      start,
      end,
      color,
      ...(event ? {id: event.id} : {})
    };

    onSave(eventData);
  };
  
  console.log({startDate});

  return (
    <Modal
      opened={open}
      onClose={onClose}
      title={event ? 'Edit Event' : 'Create New Event'}
      size="md"
    >
      <Stack spacing="md">
        <TextInput
          label="Event Title"
          placeholder="Enter event title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <Textarea
          label="Description"
          placeholder="Add details about the event"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          minRows={3}
        />

        <Flex direction="column">
          <DatePicker
            label="Start Date"
            allowDeselect
            placeholder="Select date"
            value={startDate}
            onChange={(date) => date && setStartDate(date)}
          />
          <TimeInput
            label="Start Time"
            format="12"
            value={startTime}
            onChange={(event) => setStartTime(event.currentTarget.value)}
          />
        </Flex>

        <Flex direction="column">
          <DatePicker
            label="End Date"
            placeholder="Select date"
            value={endDate}
            onChange={(date) => date && setEndDate(date)}
          />
          <TimeInput
            label="End Time"
            format="12"
            value={endTime}
            onChange={(event) => setEndTime(event.currentTarget.value)}
          />
        </Flex>

        <Stack spacing="xs">
          <ColorPicker
            label="Event Color"
            format="hex"
            value={color}
            onChange={setColor}
            withPicker={false}
            swatches={Object.values(colors)}
          />
        </Stack>

        <Group position="right" mt="md">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save Event</Button>
        </Group>
      </Stack>
    </Modal>
  );
}