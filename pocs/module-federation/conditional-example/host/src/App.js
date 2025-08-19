import React, { useState, Suspense } from 'react';

// Mock user data
const USERS = {
  admin: { role: 'admin', permissions: ['admin'], features: { adminPanel: true } },
  user: { role: 'user', permissions: ['read'], features: { adminPanel: false } }
};

const App = () => {
  const [currentUser, setCurrentUser] = useState(USERS.user);
  const [showAdmin, setShowAdmin] = useState(false);

  const canAccessAdmin = () => {
    return currentUser.permissions.includes('admin') &&
      currentUser.features.adminPanel;
  };

  const AdminPanel = React.lazy(() => import('remote/AdminPanel'));

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🔐 Conditional Module Loading</h1>

      {/* User Switcher */}
      <div style={{
        background: '#f5f5f5',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3>Current User: {currentUser.role}</h3>
        <p>Permissions: {currentUser.permissions.join(', ')}</p>

        <button
          onClick={() => setCurrentUser(USERS.user)}
          style={{
            margin: '5px',
            padding: '8px 15px',
            background: currentUser.role === 'user' ? '#007bff' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Regular User
        </button>

        <button
          onClick={() => setCurrentUser(USERS.admin)}
          style={{
            margin: '5px',
            padding: '8px 15px',
            background: currentUser.role === 'admin' ? '#007bff' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Admin User
        </button>
      </div>

      {/* Admin Panel Section */}
      <div style={{
        border: '2px solid #ddd',
        borderRadius: '8px',
        padding: '20px'
      }}>
        <h2>Admin Panel Module</h2>

        {!canAccessAdmin() ? (
          // Access Denied
          <div style={{
            background: '#fff3cd',
            border: '1px solid #ffc107',
            padding: '15px',
            borderRadius: '5px',
            textAlign: 'center'
          }}>
            <h3>🔒 Access Denied</h3>
            <p>You need admin permissions to view this module.</p>
            <p><small>Switch to Admin User to see the module load</small></p>
          </div>
        ) : (
          // Access Granted
          <div>
            {!showAdmin ? (
              <div style={{
                background: '#d4edda',
                border: '1px solid #28a745',
                padding: '15px',
                borderRadius: '5px',
                textAlign: 'center'
              }}>
                <h3>✅ Access Granted</h3>
                <p>You have permission to load the admin module.</p>
                <button
                  onClick={() => setShowAdmin(true)}
                  style={{
                    padding: '10px 20px',
                    background: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  🚀 Load Admin Panel
                </button>
              </div>
            ) : (
              // Load Remote Component
              <div style={{ border: '2px dashed #007bff', borderRadius: '5px' }}>
                <div style={{
                  background: '#007bff',
                  color: 'white',
                  padding: '10px',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}>
                  🔗 Remote Module Loaded
                </div>
                <div style={{ padding: '15px' }}>
                  <Suspense fallback={<div>Loading admin panel...</div>}>
                    <AdminPanel />
                  </Suspense>
                </div>
                <div style={{ padding: '0 15px 15px' }}>
                  <button
                    onClick={() => setShowAdmin(false)}
                    style={{
                      padding: '5px 10px',
                      background: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '3px',
                      cursor: 'pointer'
                    }}
                  >
                    Unload Module
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Instructions */}
      <div style={{
        marginTop: '20px',
        padding: '15px',
        background: '#e7f3ff',
        borderRadius: '8px'
      }}>
        <h3>💡 How it works:</h3>
        <ul>
          <li>Switch between Regular User and Admin User</li>
          <li>Regular User: Cannot access admin module (no permissions)</li>
          <li>Admin User: Can load the module dynamically from remote app</li>
          <li>Module only loads when both permissions and feature flags allow it</li>
        </ul>
      </div>
    </div>
  );
};

export default App;