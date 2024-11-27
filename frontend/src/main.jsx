import React from 'react';
import ReactDOM from 'react-dom/client'; // Corrected import for createRoot
import { Provider } from 'react-redux';
import App from './App.jsx';
import store from './store/store.js';

// Create the root and render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <Provider store={store}>
    <App />
  </Provider></>
);
