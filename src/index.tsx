import { createRoot } from 'react-dom/client';
import React from 'react';
import '@app/common.css';
import { App } from '@app/components/App/App';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from '@app/store';
import { Provider } from 'react-redux';
import { initI18n } from '@features/locale/utils';
import { NetworkStatusContextProvider } from '@features/networkStatus/NetworkStatusContextProvider';
import { Error } from '@components/Error/Error';
import * as Sentry from '@sentry/react';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(() => console.log('sw register success'))
    .catch((e) => console.log(`sw register error => ${e}`));
}

declare global {
  interface Window {
    SENTRY_RELEASE: string;
  }
}

if (process.env.SENTRY_RELEASE) {
  Sentry.init({
    dsn: 'https://5a0a8c4a0078468c837cf2cbec39b108@o4504298120937472.ingest.sentry.io/4504298126114816',
  });
}

const root = createRoot(document.getElementById('root') as HTMLElement);

initI18n(() => {
  root.render(
    <Sentry.ErrorBoundary fallback={<Error />}>
      <Provider store={store}>
        <NetworkStatusContextProvider>
          <Router>
            <App />
          </Router>
        </NetworkStatusContextProvider>
      </Provider>
    </Sentry.ErrorBoundary>
  );
});
