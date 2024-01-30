import { Navigate, Outlet } from 'react-router-dom'

import { ROUTES } from '@/shared/common/constants'

/**
 * Тут всегда достаём data me() запроса
 * с помощью него определяем попадём на приватные маршруты или публичные
 */
export const PrivateRoute = () => {
    // const { data, isLoading } = useGetMeQuery()
    // const isAuthenticated = !!data && !('success' in data)

    // if (isLoading) {
    //     return <Loader />
    // }

    const auth = false

    return auth ? <Outlet /> : <Navigate to={ROUTES.signIn} />
}

/*
- если const auth = false, то увижу форму Логинизации
 */
