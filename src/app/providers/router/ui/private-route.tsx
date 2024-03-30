import { Navigate, Outlet } from 'react-router-dom'

import { useMeQuery } from '@/features/auth/api/auth.api'
import { ROUTES } from '@/shared/lib'
import { Loader } from '@/shared/ui/loaders-components/loaders'

export const PrivateRoute = () => {
  const { data, isLoading } = useMeQuery()
  const isAuthenticated = !!data && !('success' in data)

  if (isLoading) {
    return <Loader />
  }

  return isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.signIn} />
}
