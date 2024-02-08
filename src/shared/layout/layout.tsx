import { Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useAppDispatch, useAppSelector } from '@/app/providers'
import { useLogoutMutation, useMeQuery, util } from '@/features/auth/api/auth.api'
import { loadingSelector } from '@/features/loading/model/selectors/loading-selector'
import { ROUTES } from '@/shared/common/constants'
// eslint-disable-next-line import/namespace
import { Header } from '@/widgets/header/header'

/** Layout - убираем дублирующиеся слой - например Header, одинаковый на всех страницах,
 только иконки у него меняются на др.страницах по макету смотри...
 ___________________________________________________________________________________________________
 * Layout -общая обёртка, главный карскас (макет) приложения, на котором будут основаны все страницы
 * (в других проетах состоит из страниц с Сайдбаром, Хедером, Контентом..), она будет отрисовываться
 * всегда, в рамках этой обёртки Outlet-а можем динамически, что-то менять:
 * _________________________________________________________________________________________________
 * Outlet - куда хочу вставить всё остальное кроме Хедера - т.к он одинаков на всех страницах,
 чтобы его не дублировать делаем Layout -- каркас всего приложения
 */
export const Layout = () => {
  /* Для определения загрузилось или нет? */
  // const loadingStatus = useAppSelector(loadingSelector) см. quiz

  const status = useAppSelector((state) => state.appReducer.status)

  const { data } = useMeQuery() // авторизован ли я?
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [logout] = useLogoutMutation()

  const handleLogout = () => {
    logout()
      .unwrap()
      .then(() => {
        dispatch(util?.resetApiState())
        navigate(ROUTES.signIn)
      })
      .catch((error) => {
        toast(error)
      })
  }

  const redirectToProfile = () => {
    navigate(ROUTES.profile)
  }

  const redirectToSingIn = () => {
    navigate(ROUTES.signIn)
  }

  return (
    <>
      {/* <Header отрисуется всегда /> */}
      <Header
        avatar={data?.avatar}
        email={data?.email}
        isAuth={!!data}
        isLoading={status}
        name={data?.name}
        onProfileClick={redirectToProfile}
        onSignIn={redirectToSingIn}
        onSignOut={handleLogout}
      />
      {/* В Outlet - пойдет все дочернее содержимое - в промежуток между хедером и футером*/}
      <Outlet />
      {/* <Footer /> */}
    </>
  )
}

/*
- Outlet - всегда оборачиваем в контейнер для контента всего проекта div className={s.outlet_content}
 */
