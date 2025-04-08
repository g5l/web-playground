import React, { useState, useEffect, useRef, DragEvent } from 'react';
import { format, addDays, subDays, startOfWeek, endOfWeek, isSameDay, parseISO } from 'date-fns';
import { useCalendar } from '../../context/CalendarContext';
import { CalendarEvent } from '../../types';
import EventForm from './EventForm';

const SimpleCalendar: React.FC = () => {
  const { events, currentDate, setCurrentDate, deleteEvent, moveEvent } = useCalendar();
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [draggedEventId, setDraggedEventId] = useState<string | null>(null);
  
  // Get the days of the current week
  const weekDays = getWeekDays(currentDate);
  
  // Helper function to get week days
  function getWeekDays(date: Date): Date[] {
    const start = startOfWeek(date, { weekStartsOn: 0 });
    const end = endOfWeek(date, { weekStartsOn: 0 });
    
    const days = [];
    let day = start;
    
    while (day <= end) {
      days.push(day);
      day = addDays(day, 1);
    }
    
    return days;
  }
  
  // Navigate to previous week
  const goToPreviousWeek = () => {
    setCurrentDate(subDays(currentDate, 7));
  };
  
  // Navigate to next week
  const goToNextWeek = () => {
    setCurrentDate(addDays(currentDate, 7));
  };
  
  // Go to today
  const goToToday = () => {
    setCurrentDate(new Date());
  };
  
  // Calculate position and height for an event
  const getEventStyle = (event: CalendarEvent) => {
    const startHour = event.start.getHours();
    const startMinute = event.start.getMinutes();
    const endHour = event.end.getHours();
    const endMinute = event.end.getMinutes();
    
    // Calculate top position (60px per hour)
    const top = (startHour - 8) * 60 + startMinute;
    
    // Calculate height
    const durationMinutes = (endHour - startHour) * 60 + (endMinute - startMinute);
    const height = durationMinutes;
    
    return {
      top: `${top}px`,
      height: `${height}px`,
      backgroundColor: event.color || '#3182ce'
    };
  };
  
  // Open the event form for editing
  const handleEditEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setShowEventForm(true);
  };
  
  // Handle deleting an event
  const handleDeleteEvent = (event: CalendarEvent) => {
    if (window.confirm(`Are you sure you want to delete "${event.title}"?`)) {
      deleteEvent(event.id);
    }
  };
  
  // Close the event form
  const handleCloseEventForm = () => {
    setSelectedEvent(null);
    setShowEventForm(false);
  };
  
  // Open the event form for creating a new event
  const handleAddEvent = () => {
    setSelectedEvent(null);
    setShowEventForm(true);
  };
  
  // Handle event drag start
  const handleDragStart = (e: DragEvent<HTMLDivElement>, eventId: string) => {
    setDraggedEventId(eventId);
    // Set the drag data (required for Firefox)
    e.dataTransfer.setData('text/plain', eventId);
    // Add a class to the dragged element
    if (e.currentTarget) {
      e.currentTarget.classList.add('dragging');
    }
  };
  
  // Handle event drag end
  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    if (e.currentTarget) {
      e.currentTarget.classList.remove('dragging');
    }
    setDraggedEventId(null);
  };
  
  // Handle drop on time slot
  const handleDrop = (e: DragEvent<HTMLDivElement>, day: Date, hour: number, minute: number = 0) => {
    e.preventDefault();
    
    // Get the dropped event ID
    const eventId = draggedEventId || e.dataTransfer.getData('text/plain');
    
    if (!eventId) return;
    
    // Calculate the new start time
    const newStart = new Date(day);
    newStart.setHours(hour, minute, 0, 0);
    
    // Move the event
    moveEvent(eventId, newStart);
  };
  
  // Handle drag over (prevent default to allow drop)
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.currentTarget) {
      e.currentTarget.classList.add('drag-over');
    }
  };
  
  // Handle drag leave
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    if (e.currentTarget) {
      e.currentTarget.classList.remove('drag-over');
    }
  };
  
  // Time slots from 8 AM to 6 PM (each full hour)
  const timeSlots = Array.from({ length: 11 }, (_, i) => i + 8);
  
  return (
    <div className="simple-calendar">
      {/* Calendar header with navigation */}
      <div className="calendar-header">
        <div className="calendar-title">
          <h2>{format(currentDate, 'MMMM yyyy')}</h2>
          <div className="week-range">
            {format(weekDays[0], 'MMM d')} - {format(weekDays[6], 'MMM d, yyyy')}
          </div>
        </div>
        
        <div className="calendar-nav">
          <button onClick={goToPreviousWeek} className="nav-button">
            &lsaquo; Previous
          </button>
          <button onClick={goToToday} className="nav-button today">
            Today
          </button>
          <button onClick={goToNextWeek} className="nav-button">
            Next &rsaquo;
          </button>
        </div>
        
        <button onClick={handleAddEvent} className="event-form-button">
          + Add Event
        </button>
      </div>
      
      {/* Calendar grid */}
      <div className="calendar-grid">
        {/* Empty cell in the top-left corner */}
        <div className="calendar-grid-header">Time</div>
        
        {/* Day headers */}
        {weekDays.map((day, index) => (
          <div 
            key={index} 
            className={`calendar-grid-header ${isSameDay(day, new Date()) ? 'today' : ''}`}
          >
            <div>{format(day, 'EEE')}</div>
            <div>{format(day, 'MMM d')}</div>
          </div>
        ))}
        
        {/* Time slots */}
        {timeSlots.map(hour => (
          <React.Fragment key={hour}>
            {/* Time label */}
            <div className="time-column">
              {hour % 12 || 12}{hour < 12 ? 'am' : 'pm'}
            </div>
            
            {/* Day columns */}
            {weekDays.map((day, dayIndex) => (
              <div key={dayIndex} className="day-column">
                {/* Hour slot (XX:00) */}
                <div 
                  className="time-slot hour"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, day, hour, 0)}
                ></div>
                
                {/* Half-hour slot (XX:30) */}
                <div 
                  className="time-slot half-hour"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, day, hour, 30)}
                ></div>
                
                {/* Render events for this day and hour */}
                {events
                  .filter(event => 
                    isSameDay(event.start, day) && 
                    event.start.getHours() >= hour && 
                    event.start.getHours() < hour + 1
                  )
                  .map(event => (
                    <div 
                      key={event.id}
                      className="calendar-event"
                      style={getEventStyle(event)}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditEvent(event);
                      }}
                      draggable
                      onDragStart={(e) => handleDragStart(e, event.id)}
                      onDragEnd={handleDragEnd}
                    >
                      <div className="calendar-event-title">{event.title}</div>
                      <div className="calendar-event-time">
                        {format(event.start, 'h:mm a')} - {format(event.end, 'h:mm a')}
                      </div>
                      
                      <div className="event-actions">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteEvent(event);
                          }}
                          className="delete-button"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))
                }
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
      
      {/* Event form modal */}
      {showEventForm && (
        <EventForm 
          event={selectedEvent}
          onClose={handleCloseEventForm}
        />
      )}
    </div>
  );
};

export default SimpleCalendar; 