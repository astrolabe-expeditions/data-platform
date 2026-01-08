import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@/global.css';

import { App } from '@/app';
import '@/core/utils/i18n';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
