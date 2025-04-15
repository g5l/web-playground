import {Button, Group, Modal, Stack, Textarea, TextInput} from '@mantine/core';
import {DateTimePicker} from '@mantine/dates';
import React, {useEffect, useState} from 'react';
import {Event} from '../types/event';

interface EventFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (event: Partial<Event>) => void;
  initialValues?: Event;
  title: string;
}

const EventForm = ({open, onClose, onSubmit, initialValues, title}: EventFormProps) => {
  const [formValues, setFormValues] = useState<Partial<Event>>({
    title: '',
    description: '',
    start: new Date().toISOString(),
    end: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    userId: 'user1',
  });

  useEffect(() => {
    if (initialValues) {
      setFormValues(initialValues);
    }
  }, [initialValues]);

  const handleChange = (field: keyof Event, value: any) => {
    setFormValues(prev => ({...prev, [field]: value}));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formValues);
    onClose();
  };

  return (
    <Modal opened={open} onClose={onClose} title={title} size="md">
      <form onSubmit={handleSubmit}>
        <Stack>
          <TextInput
            label="Title"
            placeholder="Event title"
            value={formValues.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
            required
          />

          <Textarea
            label="Description"
            placeholder="Event description"
            value={formValues.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            minRows={3}
          />

          <DateTimePicker
            label="Start Date & Time"
            placeholder="Select start date and time"
            value={formValues.start ? new Date(formValues.start) : null}
            onChange={(value) => handleChange('start', value?.toISOString())}
            required
          />

          <DateTimePicker
            label="End Date & Time"
            placeholder="Select end date and time"
            value={formValues.end ? new Date(formValues.end) : null}
            onChange={(value) => handleChange('end', value?.toISOString())}
            required
          />

          <Group justify="end" mt="md">
            <Button variant="subtle" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};

export default EventForm;
