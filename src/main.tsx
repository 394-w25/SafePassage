import { HealthHistoryProvider } from '@/context'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'

import './index.css'

createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <HealthHistoryProvider>
      <App />
    </HealthHistoryProvider>
  </StrictMode>,
)
