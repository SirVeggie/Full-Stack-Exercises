import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { LoginProvider } from './tools/LoginContext';
import { NotificationProvider } from './tools/NotificationContext';

ReactDOM.render(
  <React.StrictMode>
    <LoginProvider>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </LoginProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
