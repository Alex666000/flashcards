import { flashCardsAPI } from '@/app'
import { appReducer } from '@/app/model/slice/app.slice'
import { authAPI } from '@/features/auth'
import { deckReducer } from '@/features/deck/model/slice/deck.slice'
import { decksReducer } from '@/features/decks/model/slice/decks.slice'
import { loadingReducer } from '@/shared/ui/loaders-components/loaders/model/slice'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  middleware: (gDM) => gDM().concat(flashCardsAPI.middleware),
  reducer: {
    appReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    deck: deckReducer,
    decks: decksReducer,
    loading: loadingReducer,
  },
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
