import {
    Navigate,
    Outlet,
    RouteObject,
    RouterProvider,
    createBrowserRouter,
} from 'react-router-dom'

const publicRoutes: RouteObject[] = [
    {
        element: <div>login</div>,
        path: '/login',
    },
]

const privateRoutes: RouteObject[] = [
    {
        element: <div>Home</div>,
        path: '/',
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
