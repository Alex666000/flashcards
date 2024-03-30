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

export const Layout = memo(() => {
  const isAppLoading = useAppSelector(loadingSelector)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { data: meData } = useMeQuery()
  const [logout] = useLogoutMutation()

  const handleLogoutUserClick = useCallback(() => {
    logout()
      .unwrap()
      .then(() => {
        toast.info('You are successfully logged out', { containerId: 'common' })
        dispatch(util?.resetApiState())
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
      <Header
        avatar={meData?.avatar}
        email={meData?.email}
        isAuth={!!meData}
        isLoading={isAppLoading}
        name={meData?.name}
        onLoginUserClick={redirectToSingIn}
        onLogoutUserClick={handleLogoutUserClick}
        onRedirectToProfileClick={redirectToProfile}
      />
      <Outlet />
    </>
  )
})
