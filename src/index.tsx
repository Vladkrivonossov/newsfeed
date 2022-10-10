import ReactDOM from 'react-dom';
import React from 'react';
import '@app/common.css';
import { App } from '@app/components/App/App';
import { initializeAPI } from '@app/api';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContextProvider } from '@features/auth/AuthContextProvider';
import { store } from '@app/store';
import { Provider } from 'react-redux';

const app = initializeAPI();

ReactDOM.render(
  <Provider store={store}>
    <AuthContextProvider firebaseApp={app}>
      <Router>
        <App />
      </Router>
    </AuthContextProvider>
  </Provider>,
  document.getElementById('root')
);
