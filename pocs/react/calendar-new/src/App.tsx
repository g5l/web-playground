import React from 'react';
import WeekGrid from "./components/WeekGrid";
import CalendarHeader from "./components/CalendarHeader";
import EventForm from "./components/EventForm";
import './App.css';

function App() {
  return (
    <div className="App">
      <CalendarHeader/>
      <WeekGrid/>
      <EventForm
        open={false}
        onClose={() => {
          console.log('close');
        }}
        onSubmit={(e) => console.log(e)}
        title="Create Event"
      />
    </div>
  );
}

export default App;
