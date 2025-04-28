// client/src/App.tsx
import React, { useEffect, useState } from 'react';
import { MantineProvider, AppShell, Center, Container, Group, Button } from '@mantine/core';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store, RootState } from './redux/store';
import { fetchUserEvents, createNewEvent, updateExistingEvent, removeEvent, getSuggestedTimes } from './redux/eventsSlice';
import CalendarHeader from './components/CalendarHeader';
import WeekGrid from './components/WeekGrid';
import EventForm from './components/EventForm';
import SuggestTimeForm from './components/SuggestTimeForm';
import SuggestedTimesList from './components/SuggestedTimesList';
import { Event } from './types/event';

const AppContent = () => {
  const dispatch = useDispatch();
  const [createEventModal, setCreateEventModal] = useState(false);
  const [editEventModal, setEditEventModal] = useState(false);
  const [suggestTimeModal, setSuggestTimeModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const { currentDate } = useSelector((state: RootState) => state.calendar);
  const { loading, suggestedTimeSlots } = useSelector((state: RootState) => state.events);

  useEffect(() => {
    // Fetch events for the current week
    const currentDateObj = new Date(currentDate);
    const startOfWeek = new Date(currentDateObj);
    startOfWeek.setDate(currentDateObj.getDate() - currentDateObj.getDay());

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    dispatch(fetchUserEvents({
      userId: 'user1',
      startDate: startOfWeek.toISOString(),
      endDate: endOfWeek.toISOString()
    }));
  }, [dispatch, currentDate]);

  const handleCreateEvent = (event: Partial<Event>) => {
    if (!event.userId) event.userId = 'user1';
    dispatch(createNewEvent(event as Omit<Event, 'id' | 'createdAt' | 'updatedAt'>));
  };

  const handleUpdateEvent = (event: Partial<Event>) => {
    if (selectedEvent) {
      dispatch(updateExistingEvent({ id: selectedEvent.id, event }));
    }
  };

  const handleDeleteEvent = (id: string) => {
    dispatch(removeEvent(id));
  };

  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event);
    setEditEventModal(true);
  };

  const handleTimeClick = (date: Date) => {
    const endDate = new Date(date);
    endDate.setHours(date.getHours() + 1);

    const newEvent = {
      title: '',
      description: '',
      start: date.toISOString(),
      end: endDate.toISOString(),
      userId: 'user1'
    };

    setSelectedEvent(newEvent as Event);
    setCreateEventModal(true);
  };

  const handleSuggestTime = (data: { userIds: string[], date: string, duration: number }) => {
    dispatch(getSuggestedTimes(data));
  };

  return (
    <>
      <Center h={70} p="md">
        <Group>
          <Button onClick={() => setCreateEventModal(true)}>Create Event</Button>
          <Button variant="outline" onClick={() => setSuggestTimeModal(true)}>Suggest Time</Button>
        </Group>
      </Center>

      <Container fluid>
        <CalendarHeader />
        <WeekGrid
          onEditEvent={handleEditEvent}
          onDeleteEvent={handleDeleteEvent}
          onTimeClick={handleTimeClick}
        />

        {suggestedTimeSlots.length > 0 && (
          <SuggestedTimesList
            slots={suggestedTimeSlots}
            onSelectSlot={(slot) => {
              setCreateEventModal(true);
              setSelectedEvent({
                ...selectedEvent,
                start: slot.start,
                end: slot.end
              } as Event);
            }}
          />
        )}
      </Container>

      <EventForm
        open={createEventModal}
        onClose={() => setCreateEventModal(false)}
        onSubmit={handleCreateEvent}
        initialValues={selectedEvent || undefined}
        title="Create Event"
      />

      <EventForm
        open={editEventModal}
        onClose={() => setEditEventModal(false)}
        onSubmit={handleUpdateEvent}
        initialValues={selectedEvent || undefined}
        title="Edit Event"
      />

      <SuggestTimeForm
        open={suggestTimeModal}
        onClose={() => setSuggestTimeModal(false)}
        onSubmit={handleSuggestTime}
      />
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <AppShell
          padding="md"
          header={<Center height={70} p="md" />}
        >
          <AppContent />
        </AppShell>
      </MantineProvider>
    </Provider>
  );
};

export default App;