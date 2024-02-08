import { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { SingInPage, SingUpPage } from '@/pages'
import { Decks } from '@/pages/decks-page/ui/decks'
import { ErrorPage } from '@/pages/error-page/ui/error-page'
import { ROUTES } from '@/shared/common/constants'
import { Loader } from '@/shared/ui/loaders-components'

import { PrivateRoute } from './private-route'

/**
 * AppRouter - отрисовывает все пути проекта
 */
export const AppRouter = () => {
  return (
    // Loader или LeanerProgress в Suspense
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* ------------------------------------------------------- */}
        {/* Общедоступные-публичные пути */}
        <Route element={<SingInPage />} path={ROUTES.signIn} />
        <Route element={<SingUpPage />} path={ROUTES.singUp} />
        {/*<Route element={<ForgotPasswordPage />} path={ROUTES.PASSWORD_RECOVERY} />*/}
        {/*<Route element={<CheckEmailPage />} path={ROUTES.CHECK_EMAIL} />*/}
        {/*<Route element={<NewPasswordPage />} path={ROUTES.NEW_PASSWORD} />*/}
        <Route element={<ErrorPage />} path={ROUTES.error} />
        {/*<Route element={<VerifyMail />} path={ROUTES.VERIFY} />*/}
        <Route element={<Navigate to={ROUTES.error} />} path={'*'} />

        {/*------------------------------------------------------- */}
        {/* Приватные пути */}
        <Route element={<PrivateRoute />}>
          {/* вложенные пути в PrivateRoute */}
          <Route element={<Decks />} index path={ROUTES.main} />
          <Route element={<Decks />} path={ROUTES.decks} />
          {/*<Route element={<Profile />} path={ROUTES.PROFILE} />*/}
          {/*<Route element={<Cards />} path={ROUTES.DECKS + ROUTES.CARDS + ROUTES.ID} />*/}
          {/*<Route element={<Learn />} path={ROUTES.LEARN + ROUTES.ID} />*/}
        </Route>
      </Routes>
    </Suspense>
  )
}

/*
- Layout - макет всего проекта - тут из Header и Аутлета - всего остального
- SING_IN - логинизация, SING_UP - регистрация
- re-export - значит напрямую из папки паблик апи заимпортит: import { SingInPage, SingUpPage }
from '@/pages'
- делаем пути асинхронными компоненты с Suspense (показать крутилку пока компонент не загрузился) +
lazy импорт страниц в слое pages
- в Suspense оборачивает роуты для lazy loading, асинхронной подгрузки страниц по мере необходимости
 */
