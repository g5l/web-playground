import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useCalendar } from '../../context/CalendarContext';
import { CalendarEvent } from '../../types';

interface EventFormProps {
  event: CalendarEvent | null;
  onClose: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ event, onClose }) => {
  const { addEvent, updateEvent } = useCalendar();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    attendees: '',
    color: '#3182ce'
  });
  
  // Initialize form with event data if editing
  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        description: event.description || '',
        startDate: format(event.start, 'yyyy-MM-dd'),
        startTime: format(event.start, 'HH:mm'),
        endDate: format(event.end, 'yyyy-MM-dd'),
        endTime: format(event.end, 'HH:mm'),
        attendees: event.attendees.join(', '),
        color: event.color || '#3182ce'
      });
    } else {
      // Default time for new events: now rounded to the nearest half hour
      const now = new Date();
      const minutes = Math.round(now.getMinutes() / 30) * 30;
      now.setMinutes(minutes, 0, 0);
      
      const later = new Date(now);
      later.setMinutes(later.getMinutes() + 30);
      
      setFormData({
        title: '',
        description: '',
        startDate: format(now, 'yyyy-MM-dd'),
        startTime: format(now, 'HH:mm'),
        endDate: format(later, 'yyyy-MM-dd'),
        endTime: format(later, 'HH:mm'),
        attendees: '',
        color: '#3182ce'
      });
    }
  }, [event]);
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Parse dates from form data
      const start = new Date(`${formData.startDate}T${formData.startTime}`);
      const end = new Date(`${formData.endDate}T${formData.endTime}`);
      
      // Validate end time is after start time
      if (end <= start) {
        alert('End time must be after start time');
        return;
      }
      
      // Parse attendees
      const attendees = formData.attendees
        .split(',')
        .map(email => email.trim())
        .filter(email => email.length > 0);
      
      const eventData = {
        title: formData.title,
        description: formData.description,
        start,
        end,
        attendees,
        color: formData.color
      };
      
      if (event) {
        // Update existing event
        updateEvent({ ...eventData, id: event.id });
      } else {
        // Add new event
        addEvent(eventData);
      }
      
      onClose();
    } catch (error) {
      alert('Error processing form. Please check your inputs.');
      console.error(error);
    }
  };
  
  // Color options
  const colorOptions = [
    { value: '#3182ce', label: 'Blue' },
    { value: '#805ad5', label: 'Purple' },
    { value: '#dd6b20', label: 'Orange' },
    { value: '#38a169', label: 'Green' },
    { value: '#e53e3e', label: 'Red' }
  ];
  
  return (
    <div className="event-form-modal">
      <div className="event-form-content">
        <div className="event-form-header">
          <h3>{event ? 'Edit Event' : 'Create Event'}</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title*</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Event title"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Event description"
              rows={3}
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="startDate">Start Date*</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="startTime">Start Time*</label>
              <input
                type="time"
                id="startTime"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="endDate">End Date*</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="endTime">End Time*</label>
              <input
                type="time"
                id="endTime"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="attendees">Attendees</label>
            <input
              type="text"
              id="attendees"
              name="attendees"
              value={formData.attendees}
              onChange={handleChange}
              placeholder="Comma-separated emails"
            />
          </div>
          
          <div className="form-group">
            <label>Color</label>
            <div className="color-options">
              {colorOptions.map(color => (
                <div 
                  key={color.value}
                  className={`color-option ${formData.color === color.value ? 'selected' : ''}`}
                  style={{ backgroundColor: color.value }}
                  onClick={() => setFormData(prev => ({ ...prev, color: color.value }))}
                  title={color.label}
                />
              ))}
            </div>
          </div>
          
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              {event ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm; 