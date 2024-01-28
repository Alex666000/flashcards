import { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { SingInPage, SingUpPage } from '@/pages'
import { Decks } from '@/pages/decks-page/ui/decks'
import { ErrorPage } from '@/pages/error-page/ui/error-page'
import { PATH } from '@/shared/common/constants'
import { Loader } from '@/shared/ui/loaders-components'

import { PrivateRoute } from './private-route'

/**
 * AppRouter - отрисовывает все пути проекта
 */
export const AppRouter = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route element={<SingInPage />} path={PATH.SING_IN} />
                <Route element={<SingUpPage />} path={PATH.SING_UP} />
                {/*<Route element={<ForgotPasswordPage />} path={PATH.PASSWORD_RECOVERY} />*/}
                {/*<Route element={<CheckEmailPage />} path={PATH.CHECK_EMAIL} />*/}
                {/*<Route element={<NewPasswordPage />} path={PATH.NEW_PASSWORD} />*/}
                <Route element={<ErrorPage />} path={PATH.ERROR} />
                {/*<Route element={<VerifyMail />} path={PATH.VERIFY} />*/}
                <Route element={<Navigate to={PATH.ERROR} />} path={'*'} />

                <Route element={<PrivateRoute />}>
                    <Route element={<Decks />} index path={PATH.MAIN} />
                    <Route element={<Decks />} path={PATH.DECKS} />
                    {/*<Route element={<Profile />} path={PATH.PROFILE} />*/}
                    {/*<Route element={<Cards />} path={PATH.PACKS + PATH.CARDS + PATH.ID} />*/}
                    {/*<Route element={<Learn />} path={PATH.LEARN + PATH.ID} />*/}
                </Route>
            </Routes>
        </Suspense>
    )
}

/*
- SING_IN - логинизация, SING_UP - регистрация
- re-export - значит напрямую из папки паблика заимпортит: import { SingInPage, SingUpPage } from '@/pages'
- делаем пути асинхронными компоненты с Suspense (показать крутилку пока компонент не загрузился)
+ lazy импорт страниц в слое pages
- в Suspense оборачивает роуты для lazy loading code-spliting, асинхронной подгрузки страниц по мере
необходимости
 */
