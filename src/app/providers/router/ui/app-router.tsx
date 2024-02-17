import { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import {
  DecksPage,
  ForgotPasswordPage,
  NotFoundPage,
  ProfilePage,
  SingInPage,
  SingUpPage,
} from '@/pages'
import { ROUTES } from '@/shared/lib/constants/route-path'
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
        {/* Общедоступные-публичные пути */}
        <Route element={<SingInPage />} path={ROUTES.signIn} />
        <Route element={<SingUpPage />} path={ROUTES.singUp} />
        <Route element={<ForgotPasswordPage />} path={ROUTES.recoverPassword} />
        {/*<Route element={<CheckEmailPage />} path={ROUTES.CHECK_EMAIL} />*/}
        {/*<Route element={<NewPasswordPage />} path={ROUTES.NEW_PASSWORD} />*/}
        <Route element={<NotFoundPage />} path={ROUTES.error} />
        {/*<Route element={<VerifyMail />} path={ROUTES.VERIFY} />*/}
        <Route element={<Navigate to={ROUTES.error} />} path={'*'} />
        {/*------------------------------------------------------- */}
        {/* Приватные пути */}
        <Route element={<PrivateRoute />}>
          {/* вложенные пути в PrivateRoute */}
          <Route element={<DecksPage />} index path={'/'} />
          <Route element={<DecksPage />} path={ROUTES.decks} />
          <Route element={<ProfilePage />} path={ROUTES.profile} />
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
