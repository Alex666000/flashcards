import { memo } from 'react'

import { ThemeToggle } from '@/app/providers/theme-toogle/theme-toogle'
import { Layout } from '@/shared/layout'

import { AppRouter } from './providers/index'

console.log('App')
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
