import {fireEvent, screen} from '@testing-library/react';
import {beforeAll, beforeEach, describe, expect, it, vi} from 'vitest';
import EventModal from '../components/Events/EventModal';
import {render} from './render';

// vi.mock('../utils/dateUtils.ts', () => ({
//   addOneHour: vi.fn((time) => {
//     if (!time) return '';
//     const [hours, minutes] = time.split(':').map(Number);
//     const newHours = (hours + 1) % 24;
//     return `${newHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
//   }),
//   getTimeFromDate: vi.fn((date) => {
//     const hours = date.getHours();
//     const minutes = date.getMinutes();
//     return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
//   })
// }));

describe('EventModal Component', () => {
  const mockOnClose = vi.fn();
  const mockOnSave = vi.fn();

  beforeAll(() => {
    const mockDate = new Date('2023-09-15T10:00:00');
    vi.setSystemTime(mockDate);
  });

  beforeEach(() => {
    mockOnClose.mockReset();
    mockOnSave.mockReset();
    vi.clearAllMocks();
  });

  const renderEventModal = (props = {}) => {
    const defaultProps = {
      open: true,
      onClose: mockOnClose,
      event: null,
      onSave: mockOnSave
    };

    return render(
      <EventModal
        {...defaultProps}
        {...props}
      />
    );
  };

  it('should render modal with correct title for new event', () => {
    renderEventModal();

    expect(screen.getByText('Create New Event')).toBeInTheDocument();
  });

  it('should render modal with correct title for editing event', () => {
    const mockEvent = {
      id: '123',
      title: 'Test Event',
      description: 'Test Description',
      start: new Date('2023-09-15T10:00:00'),
      end: new Date('2023-09-15T11:00:00'),
      color: '#4dabf7'
    };

    renderEventModal({event: mockEvent});

    expect(screen.getByText('Edit Event')).toBeInTheDocument();
  });

  it('should initialize form fields with provided event data', () => {
    const mockEvent = {
      id: '123',
      title: 'Test Event',
      description: 'Test Description',
      start: new Date('2023-09-15T10:00:00'),
      end: new Date('2023-09-15T11:00:00'),
      color: '#4dabf7'
    };

    renderEventModal({event: mockEvent});

    expect(screen.getByLabelText(/Event Title/i)).toHaveValue('Test Event');
    expect(screen.getByLabelText(/Description/i)).toHaveValue('Test Description');
    expect(screen.getByLabelText(/Start Time/i)).toHaveValue('10:00');
    expect(screen.getByLabelText(/End Time/i)).toHaveValue('11:00');
  });

  it('should initialize form fields with default values for new event', () => {
    renderEventModal();

    expect(screen.getByLabelText(/Event Title/i)).toHaveValue('');
    expect(screen.getByLabelText(/Description/i)).toHaveValue('');
    expect(screen.getByLabelText(/Start Time/i)).toHaveValue('10:00');
    expect(screen.getByLabelText(/End Time/i)).toHaveValue('11:00');
  });

  it('should call onClose when Cancel button is clicked', () => {
    renderEventModal();

    fireEvent.click(screen.getByText('Cancel'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should validate if end time is after start time', async () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {
    });

    renderEventModal();

    const titleInput = screen.getByLabelText(/Event Title/i);
    fireEvent.change(titleInput, {target: {value: 'Test Event'}});

    const startTimeInput = screen.getByLabelText(/Start Time/i);
    fireEvent.change(startTimeInput, {target: {value: '10:00'}});

    const endTimeInput = screen.getByLabelText(/End Time/i);
    fireEvent.change(endTimeInput, {target: {value: '09:00'}});

    fireEvent.click(screen.getByText('Save Event'));

    expect(alertMock).toHaveBeenCalledWith('End time must be after start time');
    expect(mockOnSave).not.toHaveBeenCalled();

    alertMock.mockRestore();
  });

  it('should submit the modal form with valid data', async () => {
    renderEventModal();

    const titleInput = screen.getByLabelText(/Event Title/i);
    fireEvent.change(titleInput, {target: {value: 'Test Event'}});

    const descriptionInput = screen.getByLabelText(/Description/i);
    fireEvent.change(descriptionInput, {target: {value: 'Test Description'}});

    const startTimeInput = screen.getByLabelText(/Start Time/i);
    fireEvent.change(startTimeInput, {target: {value: '10:00'}});

    const endTimeInput = screen.getByLabelText(/End Time/i);
    fireEvent.change(endTimeInput, {target: {value: '11:00'}});

    fireEvent.click(screen.getByText('Save Event'));

    expect(mockOnSave).toHaveBeenCalledTimes(1);
    expect(mockOnSave).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Test Event',
      description: 'Test Description',
    }));
  });

  // it('should update color when color picker is used', () => {
  //   render(
  //     <EventModal 
  //       open={true}
  //       onClose={mockOnClose}
  //       event={null}
  //       onSave={mockOnSave}
  //     />
  //   );
  //
  //   const colorSwatches = screen.getAllByRole('button', { name: /select color/i });
  //   if (colorSwatches.length > 1) {
  //     fireEvent.click(colorSwatches[1]);
  //   }
  //
  //   fireEvent.click(screen.getByText('Save Event'));
  //
  //   expect(mockOnSave).toHaveBeenCalledTimes(1);
  // });

  it('should handle date changes correctly', () => {
    renderEventModal();

    const titleInput = screen.getByLabelText(/Event Title/i);
    fireEvent.change(titleInput, {target: {value: 'Date Test Event'}});

    const startTimeInput = screen.getByLabelText(/Start Time/i);
    fireEvent.change(startTimeInput, {target: {value: '14:30'}});

    const endTimeInput = screen.getByLabelText(/End Time/i);
    fireEvent.change(endTimeInput, {target: {value: '16:45'}});

    fireEvent.click(screen.getByText('Save Event'));

    expect(mockOnSave).toHaveBeenCalledTimes(1);

    const savedEvent = mockOnSave.mock.calls[0][0];

    expect(mockOnSave).toHaveBeenCalledWith({
      title: expect.any(String),
      start: {
        min,
      },
    });

    expect(savedEvent.start.getHours()).toBe(14);
    expect(savedEvent.start.getMinutes()).toBe(30);
    expect(savedEvent.end.getHours()).toBe(16);
    expect(savedEvent.end.getMinutes()).toBe(45);
  });

  // it('preserves event ID when editing existing event', () => {
  //   const mockEvent = {
  //     id: 'event-123',
  //     title: 'Existing Event',
  //     description: 'Existing Description',
  //     start: new Date('2023-09-15T10:00:00'),
  //     end: new Date('2023-09-15T11:00:00'),
  //     color: '#4dabf7'
  //   };
  //  
  //   render(
  //     <EventModal 
  //       open={true}
  //       onClose={mockOnClose}
  //       event={mockEvent}
  //       onSave={mockOnSave}
  //     />
  //   );
  //  
  //   // Make some changes
  //   const titleInput = screen.getByLabelText(/Event Title/i);
  //   fireEvent.change(titleInput, { target: { value: 'Updated Event' } });
  //  
  //   fireEvent.click(screen.getByText('Save Event'));
  //  
  //   // Check that the ID was preserved in the saved event
  //   expect(mockOnSave).toHaveBeenCalledWith(expect.objectContaining({
  //     id: 'event-123',
  //     title: 'Updated Event'
  //   }));
  // });
  //
  // it('does not include ID when creating a new event', () => {
  //   render(
  //     <EventModal 
  //       open={true}
  //       onClose={mockOnClose}
  //       event={null}
  //       onSave={mockOnSave}
  //     />
  //   );
  //  
  //   // Fill required fields
  //   const titleInput = screen.getByLabelText(/Event Title/i);
  //   fireEvent.change(titleInput, { target: { value: 'New Event' } });
  //  
  //   // End time needs to be later than start time
  //   const endTimeInput = screen.getByLabelText(/End Time/i);
  //   fireEvent.change(endTimeInput, { target: { value: '12:00' } });
  //  
  //   fireEvent.click(screen.getByText('Save Event'));
  //  
  //   // Verify that the saved event doesn't have an ID property
  //   const savedEvent = mockOnSave.mock.calls[0][0];
  //   expect(savedEvent).not.toHaveProperty('id');
  // });
}); 