import React from 'react';
import Button from './Button';

const App = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Remote Application</h1>
      <p>This is the remote application running independently on port 3001</p>
      <div style={{ marginTop: '20px' }}>
        <Button
          onClick={() => alert('Remote button clicked!')}
          variant="primary"
        >
          Remote Button (Primary)
        </Button>
        <Button
          onClick={() => alert('Secondary button clicked!')}
          variant="secondary"
          style={{ marginLeft: '10px' }}
        >
          Remote Button (Secondary)
        </Button>
      </div>
    </div>
  );
};

export default App;