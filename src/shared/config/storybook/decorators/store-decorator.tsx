import { ReactNode } from 'react'
import { Provider } from 'react-redux'

import { flashCardsAPI } from '@/shared/api/flash-cards.api'
import { configureStore } from '@reduxjs/toolkit'

export const storyBookStore = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(flashCardsAPI.middleware),
  reducer: {
    [flashCardsAPI.reducerPath]: flashCardsAPI.reducer,
  },
})

// декораторы - обертки над историеи с наделением ее доп своиствами
export const StoreDecorator = (storyFn: () => ReactNode) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
