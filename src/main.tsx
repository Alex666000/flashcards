import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { createRoot } from 'react-dom/client'

// подключаем шрифты и стили в проект
import './app/styles/index.scss'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'

import { App } from './app/App'
import { ErrorBoundary, store } from './app/providers/index'
import { Toast } from './shared/ui/toast'

createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Provider store={store}>
      <ErrorBoundary>
        <Toast />
        <StrictMode>
          <App />
        </StrictMode>
      </ErrorBoundary>
    </Provider>
  </BrowserRouter>
)

/*
- Toast - всплавышка уведомление
- оборачивать браузерами и тд лучше всего в main чтобы не было не предвиденных ошибок
 */
