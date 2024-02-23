import { memo } from 'react'

import { Layout } from '@/shared/layout'

import { AppRouter } from './providers/index'
import { ThemeToggle } from './providers/theme-toggle/theme-toggle'

export const App = memo(() => {
  return (
    <>
      <Layout />
      <AppRouter />
      <ThemeToggle />
    </>
  )
})

/*
- Внутри всего Арр отрисовываем страницы проекта: <AppRouter />
- <AppRouter /> отрисует все страницы проекта - назвать как угодно можем
 */
