import React from 'react';
import ReactGA from 'react-ga4';

import * as Sentry from '@sentry/react';
import ReactDOM from 'react-dom/client';

import App from './App';

import './styles/font.css';
import { worker } from '@/mock/browser';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
    tracesSampleRate: 1.0,
    tracePropagationTargets: ['localhost:3001', 'https://coduo.site', /^\/api\//],
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
  if (process.env.GA_TRACKING_ID) ReactGA.initialize(process.env.GA_TRACKING_ID);
}
if (process.env.NODE_ENV === 'development') {
  worker.start();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
