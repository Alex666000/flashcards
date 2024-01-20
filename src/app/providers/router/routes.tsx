import { Navigate, RouteObject } from 'react-router-dom'

import { SingUpPage } from '@/pages/sing-up-page'
import { ROUTES } from '@/shared/lib/router-common/routes'

export const publicRoutes: RouteObject[] = [
    {
        element: <SingUpPage />, // Register
        path: ROUTES.signUp,
    },
]

export const privateRoutes: RouteObject[] = [
    {
        element: <Navigate to={ROUTES.decks} />, // если залогинен редиректим на список колод
        path: ROUTES.decks, // '/decks'
    },
]

/*
         <Suspense fallback={<div>Loading...</div>} key={route.path}>
                {route.element}
            </Suspense>
 */
