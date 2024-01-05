import {
    Navigate,
    Outlet,
    RouteObject,
    RouterProvider,
    createBrowserRouter,
} from 'react-router-dom'

import { Decks } from '@/entities'
import { Deck } from '@/entities/DetailDeck/ui/Deck'
import { News } from '@/entities/News/ui/News'

const PATH = {
    login: '/login',
    news: '/news',
} as const

const publicRoutes: RouteObject[] = [
    {
        element: <div>login</div>,
        path: PATH.login,
    },
]

const privateRoutes: RouteObject[] = [
    {
        element: <Decks />, // Есть много: Decks
        path: '/',
    },
    {
        element: <Deck />, // А есть один детальный: Deck
        path: '/:deckId',
    },
    {
        element: <News />,
        path: PATH.news,
    },
]

const router = createBrowserRouter([
    {
        children: privateRoutes,
        element: <PrivateRoutes />,
    },
    ...publicRoutes,
])

export const Router = () => {
    return <RouterProvider router={router} /> // сюда передаем массив с роутами - потом отрисовываем наш компонент Router
}

function PrivateRoutes() {
    const isAuthenticated = true // вместо true false реальные данные будем вставлять

    return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}
