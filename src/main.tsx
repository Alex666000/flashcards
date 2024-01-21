import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { ErrorBoundary } from '@/app/providers/error-boundary'
import { StoreProvider } from '@/app/providers/store'
import { createRoot } from 'react-dom/client'

// подключаем шрифты и стили в Проект
import './app/styles/index.scss'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'

import { App } from './app/App'
import { Toast } from './shared/ui/toast'

createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
        <StoreProvider>
            <ErrorBoundary>
                {/*<ForceUpdateProvider>*/}
                <StrictMode>
                    <Toast />
                    <App />
                </StrictMode>
                {/*</ForceUpdateProvider>*/}
            </ErrorBoundary>
        </StoreProvider>
    </BrowserRouter>
)
