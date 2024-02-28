import { memo, useCallback } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useLogoutMutation, useMeQuery, util } from '@/features/auth/api/auth.api'
import { errorNotification } from '@/shared/lib'
import { ROUTES } from '@/shared/lib/constants/route-path'
import { useAppDispatch } from '@/shared/lib/hooks/use-app-dispatch'
import { useAppSelector } from '@/shared/lib/hooks/use-app-selector'
import { loadingSelector } from '@/shared/ui/loaders-components/loaders/model/selectors/loading-selector'
import { Header } from '@/widgets'

/** Layout - убираем дублирующиеся слой - например Header, одинаковый на всех страницах он,
 только иконки у него меняются на др.страницах по макету смотри...
 ___________________________________________________________________________________________________
 * Layout -общая обёртка, главный карскас (макет) приложения, на котором будут основаны все страницы
 * (в других проетах состоит из страниц с Сайдбаром, Хедером, Контентом..см проект Ulbi_tv),
 * она будет отрисовываться
 * всегда, в рамках этой обёртки Outlet-а можем динамически, что-то менять:
 * _________________________________________________________________________________________________
 * Outlet - куда хочу вставить всё остальное кроме Хедера - т.к он одинаков на всех страницах,
 чтобы его не дублировать делаем Layout -- каркас всего приложения
 */

export const Layout = memo(() => {
  /* Для определения: загрузилось Арр или нет: или appStatus или isAppLoading?
  Глобальный статус всего Арр */
  const isAppLoading = useAppSelector(loadingSelector)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { data: meData } = useMeQuery() // авторизован ли я?
  const [logout] = useLogoutMutation()

  const handleLogoutUserClick = useCallback(() => {
    logout()
      .unwrap()
      .then(() => {
        toast.info('You are successfully logged out', { containerId: 'common' })
        dispatch(util?.resetApiState())
        // при нажатии на лагаут - редиректим на стр.Логиеа (паттерн)
        navigate(ROUTES.signIn)
      })
      .catch((error) => {
        errorNotification(error)
      })
  }, [dispatch, logout, navigate])

  const redirectToSingIn = useCallback(() => {
    navigate(ROUTES.signIn)
  }, [navigate])

  const redirectToProfile = useCallback(() => {
    navigate(ROUTES.profile)
  }, [navigate])

  return (
    <>
      {/* <Header отрисуется всегда на всех страницах /> */}
      <Header
        avatar={meData?.avatar}
        email={meData?.email}
        isAuth={!!meData}
        isLoading={isAppLoading}
        name={meData?.name}
        onLoginUserClick={redirectToSingIn}
        // Нейминг функций: onSetBookBlur={handleSetBookBlur}
        onLogoutUserClick={handleLogoutUserClick}
        onRedirectToProfileClick={redirectToProfile}
      />
      {/* В Outlet - пойдет все дочернее содержимое - в промежуток между хедером и футером*/}
      <Outlet />
      {/* <Footer /> */}
    </>
  )
})

/*
- Outlet - всегда оборачиваем в контейнер для контента всего проекта div className={s.outlet_content}
- Если не писать .unwrap() то в случае ошибки даже всегда в .then() попадем что нам не надо!!!
Это только у тулкита так...
- { containerId: 'common' } - тк указали в ToastContainer-e
 */
