import { Suspense, memo } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import {
  CheckEmailPage,
  CreateNewPasswordPage,
  DeckPage,
  DecksPage,
  ErrorPage,
  ForgotPasswordPage,
  LearnCardPage,
  ProfilePage,
  SingInPage,
  SingUpPage,
  VerifyEmailPage,
} from '@/pages'
import { ROUTES } from '@/shared/lib'
import { Loader } from '@/shared/ui/loaders-components/loaders'

import { PrivateRoute } from './private-route'

/**
 * AppRouter (всё равно что Pages назвать..)  - отрисовывает все пути проекта
 */

export const AppRouter = memo(() => {
  return (
    // Loader или LeanerProgress в Suspense - пока страница грузится - "видим крутилку"
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Общедоступные-публичные пути */}
        <Route element={<SingUpPage />} path={ROUTES.singUp} />
        <Route element={<SingInPage />} path={ROUTES.signIn} />
        <Route element={<ForgotPasswordPage />} path={ROUTES.recoverPassword} />
        <Route element={<CheckEmailPage />} path={`${ROUTES.checkEmail}/:email`} />
        <Route element={<CreateNewPasswordPage />} path={`${ROUTES.createNewPassword}/:token`} />
        <Route element={<VerifyEmailPage />} path={ROUTES.verifyEmail} />
        <Route element={<ErrorPage />} path={ROUTES.notFoundPage} />
        <Route element={<Navigate to={ROUTES.notFoundPage} />} path={'*'} />
        {/*-------------------------------------- */}
        {/* Приватные пути */}
        <Route element={<PrivateRoute />}>
          {/* вложенные пути в PrivateRoute */}
          <Route element={<DecksPage />} index path={'/'} />
          <Route element={<DecksPage />} path={ROUTES.decks} />
          <Route element={<ProfilePage />} path={ROUTES.profile} />
          <Route element={<DeckPage />} path={`${ROUTES.decks}/:id`} />
          <Route element={<LearnCardPage />} path={`${ROUTES.decks}/:id${ROUTES.learn}`} />
        </Route>
      </Routes>
    </Suspense>
  )
})

/*
- Layout - макет всего проекта - тут из Header и Аутлета - всего остального
- SING_IN - логинизация, SING_UP - регистрация
- re-export - значит напрямую из папки паблик апи заимпортит: import { SingInPage, SingUpPage }
from '@/pages'
- делаем пути асинхронными компоненты с Suspense (показать крутилку пока компонент не загрузился) +
lazy импорт страниц в слое pages
- в Suspense оборачивает роуты для lazy loading, асинхронной подгрузки страниц по мере необходимости
 */
