import React from 'react';
import AdminPanel from './AdminPanel';

const App = () => (
  <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
    <h1>Remote Admin App</h1>
    <p>This app runs independently on port 3001</p>
    <AdminPanel />
  </div>
);

export default App;