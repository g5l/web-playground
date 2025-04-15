import React from 'react';
import CalendarHeader from "./components/CalendarHeader";
import EventForm from "./components/EventForm";
import './App.css';

function App() {
  return (
    <div className="App">
      <CalendarHeader/>
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
