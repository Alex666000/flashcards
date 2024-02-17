import { memo } from 'react'

import { Layout } from '@/shared/layout'

import { AppRouter } from './providers/index'

export const App = memo(() => {
  return (
    <>
      <Layout />
      <AppRouter />
    </>
  )
})

/*
- Внутри всего Арр отрисовываем страницы проекта: <AppRouter />
- <AppRouter /> отрисует все страницы проекта - назвать как угодно можем
 */
