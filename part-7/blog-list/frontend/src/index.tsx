import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { LoginProvider } from './tools/LoginContext';
import { NotificationProvider } from './tools/NotificationContext';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <LoginProvider>
      <NotificationProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </NotificationProvider>
    </LoginProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
