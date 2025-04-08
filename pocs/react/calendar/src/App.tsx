import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CalendarProvider } from './context/CalendarProvider';
import SimpleCalendar from './components/calendar/SimpleCalendar';
import './App.css';

// Initialize React Query client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CalendarProvider>
        <div className="app">
          <header className="app-header">
            <h1>Calendar App</h1>
          </header>
          <main className="app-main">
            <div className="calendar-container">
              <SimpleCalendar />
            </div>
          </main>
        </div>
      </CalendarProvider>
    </QueryClientProvider>
  );
}

export default App;
