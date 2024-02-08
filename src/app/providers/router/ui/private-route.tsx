import { Navigate, Outlet } from 'react-router-dom'

import { useMeQuery } from '@/features/auth/api/auth.api'
import { ROUTES } from '@/shared/common/constants'
import { Loader } from '@/shared/ui/loaders-components'

/**
 * Тут всегда достаём data me() запроса
 * с помощью него определяем попадём на приватные маршруты или публичные
 */

export const PrivateRoute = () => {
  const { data, isLoading } = useMeQuery()

  if (isLoading) {
    return <Loader />
  }

  return data ? <Outlet /> : <Navigate to={ROUTES.signIn} />
}

/*
- если const auth = false, то увижу форму Логинизации
 */
