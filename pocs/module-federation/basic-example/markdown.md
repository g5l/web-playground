## What is Module Federation?
Module Federation is a revolutionary architecture pattern that enables:

Micro-frontends - Split large applications into smaller, manageable pieces
Runtime code sharing - Load modules from other applications dynamically
Independent deployment - Deploy parts of your application separately
Team autonomy - Different teams can work on different parts independently

## Demo Overview
This POC consists of two applications:

Host App (localhost:3000) - Main application that consumes remote components
Remote App (localhost:3001) - Standalone app that exposes reusable components

## Quick Start

### 1. Clone and Setup
```bash
# Create project directory
mkdir module-federation-poc
cd module-federation-poc

# Setup both applications following the structure above
# ... (create files as shown in project structure)
```

### 2. Install Dependencies
```bash
# Install remote app dependencies
cd remote-app
npm install

# Install host app dependencies  
cd ../host-app
npm install
```

### 3. Start Development Servers
```bash
# Terminal 1 - Start remote app FIRST (required)
cd remote-app
npm start
# ✅ Remote app running on http://localhost:3001

# Terminal 2 - Start host app
cd ../host-app  
npm start
# ✅ Host app running on http://localhost:3000
```

### 4. View the Applications
- **🏠 Host Application**: http://localhost:3000
- **📦 Remote Application**: http://localhost:3001
- **🔧 Remote Entry Point**: http://localhost:3001/remoteEntry.js

## 📱 What You'll See

### Host App (Port 3000)
- Local content and buttons from the host application
- **Remote buttons dynamically loaded** from the remote app
- Shared state interaction between local and remote components
- Loading states while fetching remote modules

### Remote App (Port 3001)
- Standalone React application
- Button component that can be consumed by other apps
- Can run completely independently

## 🔧 Key Configuration Explained

### Module Federation Plugin (Remote)
```javascript
new ModuleFederationPlugin({
  name: 'remote',              // Unique name for this app
  filename: 'remoteEntry.js',  // Entry file for federation
  exposes: {
    './Button': './src/Button.js',  // Expose Button component
  },
  shared: {
    react: { singleton: true },     // Share React instance
    'react-dom': { singleton: true }
  }
})
```

### Module Federation Plugin (Host)
```javascript
new ModuleFederationPlugin({
  name: 'host',
  remotes: {
    remote: 'remote@http://localhost:3001/remoteEntry.js'  // Consume remote
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true }
  }
})
```

### Why Bootstrap Pattern?
```javascript
// index.js - Creates async boundary
import('./bootstrap');

// bootstrap.js - Actual app code after MF initialization
import React from 'react';
import ReactDOM from 'react-dom/client';
```

The bootstrap pattern ensures Module Federation has time to:
1. Download remote entry points
2. Initialize shared dependencies
3. Resolve module graphs
4. **Then** start your React application