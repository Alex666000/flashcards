import { memo, useContext } from 'react'

import { ThemeToggle } from '@/app/providers/theme-toogle/theme-toogle'
import { Layout } from '@/shared/layout'

import { AppRouter } from './providers/index'

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
