import { StrictMode } from 'react'

import { App } from '@/app/App'
import { ErrorBoundary } from '@/app/providers/error-boundary'
import { StoreProvider } from '@/app/providers/store'
import { createRoot } from 'react-dom/client'

// подключаем шрифты и стили в Проект
import './app/styles/index.scss'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'

createRoot(document.getElementById('root') as HTMLElement).render(
    <StoreProvider>
        <ErrorBoundary>
            {/*<ForceUpdateProvider>*/}
            <StrictMode>
                <App />
            </StrictMode>
            {/*</ForceUpdateProvider>*/}
        </ErrorBoundary>
    </StoreProvider>
)
