import {
    Navigate,
    Outlet,
    RouteObject,
    RouterProvider,
    createBrowserRouter,
} from 'react-router-dom'

import { Decks } from '@/entities'
import { Deck } from '@/entities/decks/ui/deck-detail/deck'
import { News } from '@/entities/news/ui/news'

// Но можно константу не писать как удобнее тебе
const PATH = {
    deckId: '/:deckId',
    login: '/login',
    news: '/news',
} as const

// Массив публичных роутов
const publicRoutes: RouteObject[] = [
    {
        element: <div>login</div>,
        path: PATH.login,
    },
]

// Массив зазищенных роутов
const privateRoutes: RouteObject[] = [
    {
        element: <Decks />, // Есть много: decks
        path: '/', // На пустом слеше отрисуй <decks />
    },
    {
        element: <Deck />, // А есть один детальный просмотр одной конкрентно колоды по её id: Deck
        path: PATH.deckId,
    },
    {
        element: <News />,
        path: PATH.news,
    },
]

const router = createBrowserRouter([
    {
        children: privateRoutes, // массив путей с компонентами - которые по этим путям отрисовываются
        element: <PrivateRoutes />, // Приватные - защищенные
    },
    ...publicRoutes, // Публичные в них не прокидываем children - необорачиваются никаким компонентом
    // как приватные оборачиваются PrivateRoutes - ...publicRoutes - они всегда доступны
])

export const Router = () => {
    return <RouterProvider router={router} /> // сюда передаем массив с роутами - потом отрисовываем наш компонент Router
}

function PrivateRoutes() {
    // Для защиты авторизации - вместо true false реальные данные будем вставлять..
    // Если user залогинен его пропускаем на наши роуты
    // в дальнеишем true меняем этот флаг получаем из хука РТК и на основе хука будем решать вернуть приватный путь или нет
    const isAuthenticated = true

    return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}

/*
- <Outlet /> -- рендерит children-ы которые есть в текущем роуте: PrivateRoutes, компоненты что сидят тут в router: children: privateRoutes
рендерит в роутветствии с адресом путей что сидят в массиве: privateRoutes, например: path: '/',
пример: если в урле браузера впишем путь из children: privateRoutes те из массива путей
(любой путь из массива) privateRoutes то отрендерится компонент PrivateRoutes
 */
