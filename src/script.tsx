import ReactDOM from 'react-dom';
import React from 'react';
import './common.css';
import { App } from './Components/App/App';
import { initializeApi } from './api';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContextProvider } from './features/auth/AuthContextProvider';

const app = initializeApi();

ReactDOM.render(
  <AuthContextProvider app={app}>
    <Router>
      <App />
    </Router>
  </AuthContextProvider>,
  document.getElementById('root')
);
