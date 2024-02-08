import { Layout } from '@/shared/layout'

import { AppRouter } from './providers/index'

// const user = {
//     email: 'bogdanov777000@mail.ru',
//     photo: { alt: 'userPhoto', src: 'src/shared/assets/images/user.png' },
//     userName: 'Sasha',
// }

export function App() {
  return (
    <>
      <Layout />
      <AppRouter />
    </>
  )
}

/*
- Внутри всего Арр отрисовываем страницы проекта: <AppRouter />
- <AppRouter /> отрисует все страницы проекта - назвать как угодно можем
 */
