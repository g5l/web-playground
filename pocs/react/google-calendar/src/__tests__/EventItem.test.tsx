import { screen } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import EventItem from '../components/Events/EventItem';
import colors from '../assets/colors';
import { render } from './render';

describe('EventItem Component', () => {
  const mockOnEdit = vi.fn();
  const mockOnDelete = vi.fn();
  
  const mockEvent = {
    id: '123',
    title: 'Test Event',
    description: 'Test Description',
    start: new Date('2023-09-15T10:00:00'),
    end: new Date('2023-09-15T11:30:00'),
    color: colors.blue
  };

  const mockEventNoDescription = {
    id: '124',
    title: 'No Description Event',
    start: new Date('2023-09-15T14:00:00'),
    end: new Date('2023-09-15T15:00:00'),
    color: colors.green
  };

  const mockEventNoColor = {
    id: '125',
    title: 'No Color Event',
    description: 'Event with no color specified',
    start: new Date('2023-09-15T16:00:00'),
    end: new Date('2023-09-15T17:00:00')
  };
  

  const renderEventItem = (props = {}) => {
    const defaultProps = {
      event: mockEvent,
      onEdit: mockOnEdit,
      onDelete: mockOnDelete
    };

    return render(
      <EventItem
        {...defaultProps}
        {...props}
      />
    );
  };

  beforeEach(() => {
    mockOnEdit.mockReset();
    mockOnDelete.mockReset();
  });

  it('should render the event title and description', () => {
    renderEventItem();
    expect(screen.getByText('Test Event')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('should render the event time range correctly', () => {
    renderEventItem();
    expect(screen.getByText(/10:00.*11:30/i)).toBeInTheDocument();
  });

  it('should not render description when not provided', () => {
    renderEventItem({ event: mockEventNoDescription });
    expect(screen.queryByText('Test Description')).not.toBeInTheDocument();
    expect(screen.getByText('No Description Event')).toBeInTheDocument();
  });

  it('should use default blue color when color is not provided', () => {
    renderEventItem({ event: mockEventNoColor });
    
    const eventItem = screen.getByText('No Color Event').closest('.mantine-Paper-root');
    expect(eventItem).toHaveAttribute('style', expect.stringContaining('background-color: rgb(77, 171, 247)'));
  });

  it('should use the provided color for the background', () => {
    renderEventItem({ event: { ...mockEvent, color: colors.red } });
    
    const eventItem = screen.getByText('Test Event').closest('.mantine-Paper-root');
    expect(eventItem).toHaveAttribute('style', expect.stringContaining('background-color: rgb(250, 82, 82)'));
  });

  it('should not show control buttons by default (when not hovered)', () => {
    renderEventItem();
    expect(screen.queryByTitle('Edit')).not.toBeInTheDocument();
    expect(screen.queryByTitle('Delete')).not.toBeInTheDocument();
    expect(document.querySelector('.controlsContainer')).not.toBeInTheDocument();
  });
}); 