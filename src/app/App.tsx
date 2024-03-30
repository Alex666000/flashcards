import { Layout } from '@/shared/layout'

import { AppRouter } from './index'
import { ThemeToggle } from './providers/theme-toggle/theme-toggle'

export const App = () => {
  return (
    <>
      <Layout />
      <AppRouter />
      <ThemeToggle />
    </>
  )
}
