import { Navigate, Outlet } from 'react-router-dom'

import { useMeQuery } from '@/features/auth/rtk-api/auth.api'
import { ROUTES } from '@/shared/lib'
import { Loader } from '@/shared/ui/loaders-components'

/**
 * Тут всегда достаём data me() запроса
 * с помощью него определяем попадём на приватные маршруты или публичные
 */

export const PrivateRoute = () => {
  const { isError, isLoading } = useMeQuery()

  if (isLoading) {
    return <Loader />
  }

  return !isError ? <Outlet /> : <Navigate to={ROUTES.signIn} />
}

/*
- если const auth = false, то увижу форму Логинизации
 */
