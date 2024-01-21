import { Navigate, Outlet } from 'react-router-dom'

import { PATH } from '@/shared/common/constants'

export const PrivateRoute = () => {
    // const { data, isLoading } = useGetMeQuery()
    // const isAuthenticated = !!data && !('success' in data)

    // if (isLoading) {
    //     return <InitLoading />
    // }
    const auth = true

    return auth ? <Outlet /> : <Navigate to={PATH.LOGIN} />
}
