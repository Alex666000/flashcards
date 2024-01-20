import { Navigate, Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'

import { privateRoutes, publicRoutes } from '@/app/providers/router/routes'
import { Layout } from '@/shared/layout/layout'
import { ROUTES } from '@/shared/lib/router-common/routes'

// Ленивая загрузка для защищенных маршрутов
// const LazyPrivateRoutes = lazy(() => import('./path-to-PrivateRoutes'))

/**
 * PrivateRoutes предназначен для отображения защищенных маршрутов.
 * Внутри компонента определена переменная isAuth, которая указывает, авторизован ли пользователь
 * В данном случае true - пользователь авторизован.
 * Если пользователь авторизован (isAuth === true), компонент <Outlet /> отображает вложенные
 * защищенные маршруты (privateRoutes), иначе происходит перенаправление на маршрут входа (ROUTES.signIn)
 */
function PrivateRoutes() {
    const isAuth = false

    // если isAuth отрисуем privateRoutes пути
    return isAuth ? <Outlet /> : <Navigate to={ROUTES.signUp} />
}

// Отрисовывает массив объектов путей публичных или приватных
const router = createBrowserRouter([
    {
        children: [
            {
                children: privateRoutes,
                element: <PrivateRoutes />,
            },
        ],
        element: <Layout />, // Рисуется всегда
        path: ROUTES.base,
    },
    ...publicRoutes,
])

// Отрисовываем в Арр
export const Router = () => {
    return <RouterProvider router={router} /> // сюда передаем массив с роутами - потом отрисовываем наш компонент Router
}

/*
- <Outlet /> -- рендерит children-ы которые есть в текущем роуте: PrivateRoutes, компоненты что сидят тут в routerConfig: children: privateRoutes
рендерит в роутветствии с адресом путей что сидят в массиве: privateRoutes, например: path: '/',
пример: если в урле браузера впишем путь из children: privateRoutes те из массива путей
(любой путь из массива) privateRoutes то отрендерится компонент PrivateRoutes
- каждую страницу в Suspense и lazy импорт- чтобы при переходе на одну страницу не все грузились а та на которую перешли - 6 ВИДЕО УЛЬБИ
- Layout -- повторяющуяся чать хедер выносим чтобы он оставался а в аутлете менялись страницы которые разные
 */
