import { Layout } from '@/shared/layout'
import { Toast } from '@/shared/ui/toast'

import { AppRouter } from './providers/router'

// const user = {
//     email: 'bogdanov777000@mail.ru',
//     photo: { alt: 'userPhoto', src: 'src/shared/assets/images/user.png' },
//     userName: 'Sasha',
// }

export function App() {
    // Внутри всего Арр отрисовываем страницы проекта
    return (
        <>
            <Layout />
            <AppRouter />
            <Toast />
        </>
    )
}

/* - <AppRouter /> отрисует все страницы проекта - назвать как угодно можем
- Toast - всплавышка уведомление
 */
