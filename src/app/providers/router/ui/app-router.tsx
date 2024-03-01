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

export const AppRouter = () => {
  return (
    // Loader или LeanerProgress в Suspense - пока страница грузится - "видим крутилку"
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Общедоступные-публичные пути */}
        <Route element={<SingUpPage />} path={ROUTES.singUp} />
        <Route element={<SingInPage />} path={ROUTES.signIn} />
        <Route element={<ForgotPasswordPage />} path={ROUTES.recoverPassword} />
        {/*УРИ параметр часть урла, не путать с квери где квери: ?ключ-значение*/}
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
          {/*УРИ параметр часть урла, не путать с квери где квери: ?ключ-значение*/}
          <Route element={<DeckPage />} path={`${ROUTES.decks}/:id`} />
          <Route element={<LearnCardPage />} path={`${ROUTES.decks}/:id${ROUTES.learn}`} />
        </Route>
      </Routes>
    </Suspense>
  )
}

/*
- квери нужны чтобы ограничить выдачу с бэкенда данных,
на их основе бэк выдает нам ответ в зависимости
от параметров с get запросм отправляем) -- не путать с телом запроса body при мутациях — квери
и ури отправляем параметры в урле при get запросе, а тело запроса body – это отправляем данные
на сервер -- например:
в post, put, patch запросе когда отправляем body (это данные которые хотим сохранить на
бэкенде — отправляем часто в виде объекта, эти данные бэк будет обрабатывать и сохранять у себя)
там все типы сохраняются, а квери и ури параметры которые идут в урле самом они всегда будут строкой
квери и ури параметры по сети по нетворку идут в качестве строк: когда отправляем на бэк
- Layout - макет всего проекта - тут из Header и Аутлета - всего остального
- SING_IN - логинизация, SING_UP - регистрация
- re-export - значит напрямую из папки паблик апи заимпортит: import { SingInPage, SingUpPage }
from '@/pages'
- делаем пути асинхронными компоненты с Suspense (показать крутилку пока компонент не загрузился) +
lazy импорт страниц в слое pages
- в Suspense оборачивает роуты для lazy loading, асинхронной подгрузки страниц по мере необходимости
 */
