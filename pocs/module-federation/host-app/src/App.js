import React, { Suspense, useState } from 'react';

// Lazy load the remote component
const RemoteButton = React.lazy(() => import('remote/Button'));

const App = () => {
  const [clickCount, setClickCount] = useState(0);

  return (
    <div style={{
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h1 style={{ color: '#333', borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>
        Host Application - Module Federation Demo
      </h1>

      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h2>Local Content</h2>
        <p>This content is served from the host application running on port 3000.</p>
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: '#17a2b8',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
          onClick={() => setClickCount(clickCount + 1)}
        >
          Local Button (Clicked {clickCount} times)
        </button>
      </div>

      <div style={{
        backgroundColor: '#e7f3ff',
        padding: '20px',
        borderRadius: '8px',
        border: '2px dashed #007bff'
      }}>
        <h2>Remote Component</h2>
        <p>The buttons below are loaded from the remote application (port 3001) at runtime:</p>

        <Suspense fallback={<div>Loading remote component...</div>}>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <RemoteButton
              variant="primary"
              onClick={() => alert(`Remote button clicked! Host click count: ${clickCount}`)}
            >
              Remote Primary Button
            </RemoteButton>

            <RemoteButton
              variant="secondary"
              onClick={() => setClickCount(clickCount + 5)}
            >
              Remote Button (+5 to counter)
            </RemoteButton>

            <RemoteButton
              variant="success"
              onClick={() => alert('This is a remote success button!')}
            >
              Remote Success Button
            </RemoteButton>
          </div>
        </Suspense>
      </div>

      <div style={{
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#fff3cd',
        borderRadius: '5px',
        fontSize: '14px'
      }}>
        <strong>Note:</strong> The remote buttons are dynamically loaded from http://localhost:3001
        and share React dependencies with the host application.
      </div>
    </div>
  );
};

export default App;