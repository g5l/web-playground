import React from 'react';
import { render, screen } from '@testing-library/react';
import SimpleCalendar from './SimpleCalendar';
import { CalendarProvider } from '../../context/CalendarContext';

// Mock the calendar context
jest.mock('../../context/CalendarContext', () => ({
  useCalendar: () => ({
    events: [],
    currentDate: new Date('2023-01-01'),
    setCurrentDate: jest.fn(),
    deleteEvent: jest.fn(),
    addEvent: jest.fn(),
    updateEvent: jest.fn(),
    suggestMeetingTimes: jest.fn(),
    moveEvent: jest.fn(),
  }),
  CalendarProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('SimpleCalendar Component', () => {
  test('renders the calendar header', () => {
    render(
      <CalendarProvider>
        <SimpleCalendar />
      </CalendarProvider>
    );
    
    // Check that the calendar header elements are rendered
    expect(screen.getByText(/January 2023/i)).toBeInTheDocument();
    expect(screen.getByText(/Previous/i)).toBeInTheDocument();
    expect(screen.getByText(/Next/i)).toBeInTheDocument();
    expect(screen.getByText(/Today/i)).toBeInTheDocument();
    expect(screen.getByText(/\+ Add Event/i)).toBeInTheDocument();
  });
}); 