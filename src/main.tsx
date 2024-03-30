import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { store } from '@/app/providers/store/store'
import { createRoot } from 'react-dom/client'

import './app/styles/index.scss'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'

import { App } from './app/App'
import ErrorBoundary from './app/providers/error-boundary/ui/error-boundary'
import { Toast } from './shared/ui/toast'

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <ErrorBoundary>
      <BrowserRouter>
        <Toast />
        <StrictMode>
          <App />
        </StrictMode>
      </BrowserRouter>
    </ErrorBoundary>
  </Provider>
)
