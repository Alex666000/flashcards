import { ReactNode } from 'react'
import { Provider } from 'react-redux'

import { flashCardsAPI } from '@/app/api/flash-cards.api'
import { configureStore } from '@reduxjs/toolkit'

export const storyBookStore = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(flashCardsAPI.middleware),
  reducer: {
    [flashCardsAPI.reducerPath]: flashCardsAPI.reducer,
  },
})

export const StoreDecorator = (storyFn: () => ReactNode) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
