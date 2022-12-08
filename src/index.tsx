import { createRoot } from 'react-dom/client';
import React from 'react';
import '@app/common.css';
import { App } from '@app/components/App/App';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from '@app/store';
import { Provider } from 'react-redux';
import { initI18n } from '@features/locale/utils';
import { NetworkStatusContextProvider } from '@features/networkStatus/NetworkStatusContextProvider';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(() => console.log('sw register success'))
    .catch((e) => console.log(`sw register error => ${e}`));
}

const root = createRoot(document.getElementById('root') as HTMLElement);

initI18n(() => {
  root.render(
    <Provider store={store}>
      <NetworkStatusContextProvider>
        <Router>
          <App />
        </Router>
      </NetworkStatusContextProvider>
    </Provider>
  );
});
