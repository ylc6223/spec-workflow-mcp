import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './modules/app/App';
import './modules/theme/tailwind.css';
import './modules/theme/theme.css';
import './modules/i18n/i18n';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <HashRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <App />
      </HashRouter>
    </React.StrictMode>
  );
}


