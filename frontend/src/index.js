// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './Stores';
import App from './App'; // Import your main App component
import './index.css'; // Optional: Import your global CSS

// Create a root element for React 18
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component wrapped with the Redux Provider
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);



