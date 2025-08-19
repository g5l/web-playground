import React, { useState } from 'react';

const AdminPanel = () => {
  const [users] = useState([
    { id: 1, name: 'John Doe', role: 'admin' },
    { id: 2, name: 'Jane Smith', role: 'user' }
  ]);

  return (
    <div>
      <h2>👑 Admin Panel</h2>
      <p style={{ color: '#666' }}>
        This component was loaded dynamically from the remote app!
      </p>

      <div style={{
        background: '#f8f9fa',
        padding: '15px',
        borderRadius: '5px',
        marginTop: '15px'
      }}>
        <h3>User List</h3>
        {users.map(user => (
          <div key={user.id} style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '8px 0',
            borderBottom: '1px solid #ddd'
          }}>
            <span>{user.name}</span>
            <span style={{
              background: user.role === 'admin' ? '#dc3545' : '#28a745',
              color: 'white',
              padding: '2px 8px',
              borderRadius: '3px',
              fontSize: '12px'
            }}>
              {user.role}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={() => alert('Admin action executed!')}
        style={{
          marginTop: '15px',
          padding: '8px 15px',
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Execute Admin Action
      </button>
    </div>
  );
};

export default AdminPanel;