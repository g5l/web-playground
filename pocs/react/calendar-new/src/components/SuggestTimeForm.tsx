import {Button, Group, Modal, NumberInput, Select, Stack} from '@mantine/core';
import {DatePicker} from '@mantine/dates';
import React, {useState} from 'react';

interface SuggestTimeFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { userIds: string[], date: string, duration: number }) => void;
}

const SuggestTimeForm = ({open, onClose, onSubmit}: SuggestTimeFormProps) => {
  const [formValues, setFormValues] = useState({
    user1: 'user1',
    user2: 'user2',
    date: new Date(),
    duration: 30,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      userIds: [formValues.user1, formValues.user2],
      date: formValues.date.toISOString().split('T')[0],
      duration: formValues.duration
    });
    onClose();
  };

  return (
    <Modal opened={open} onClose={onClose} title="Suggest Meeting Time" size="md">
      <form onSubmit={handleSubmit}>
        <Stack spacing="md">
          <Select
            label="First User"
            value={formValues.user1}
            onChange={(value) => setFormValues(prev => ({...prev, user1: value || 'user1'}))}
            data={[
              {value: 'user1', label: 'User 1'},
              {value: 'user2', label: 'User 2'},
              {value: 'user3', label: 'User 3'}
            ]}
            required
          />

          <Select
            label="Second User"
            value={formValues.user2}
            onChange={(value) => setFormValues(prev => ({...prev, user2: value || 'user2'}))}
            data={[
              {value: 'user1', label: 'User 1'},
              {value: 'user2', label: 'User 2'},
              {value: 'user3', label: 'User 3'}
            ]}
            required
          />

          <DatePicker
            label="Date"
            placeholder="Select date"
            value={formValues.date}
            onChange={(value) => value && setFormValues(prev => ({...prev, date: value}))}
            required
          />

          <NumberInput
            label="Duration (minutes)"
            value={formValues.duration}
            onChange={(value) => setFormValues(prev => ({...prev, duration: value || 30}))}
            min={15}
            max={240}
            step={15}
            required
          />

          <Group position="right" mt="md">
            <Button variant="subtle" onClick={onClose}>Cancel</Button>
            <Button type="submit">Find Available Times</Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};

export default SuggestTimeForm;