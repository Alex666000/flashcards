import { appReducer } from '@/app/model/slice/app.slice'
import { authAPI } from '@/features/auth/rtk-api/auth.api'
import { deckReducer } from '@/features/deck/model/slice/deck.slice'
import { decksReducer } from '@/features/decks/model/slice/decks.slice'
import { flashCardsAPI } from '@/shared/api/flash-cards.api'
import { loadingReducer } from '@/shared/ui/loaders-components/app-loader/model/slice'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  // РТК апишка всего проекта - родитель для частных апишек проекта
  middleware: (gDM) => gDM().concat(flashCardsAPI.middleware),
  reducer: {
    appReducer, // обычный реюсер - для глобального статуса для глобального лоадера
    [authAPI.reducerPath]: authAPI.reducer, // RTK редюсер
    deck: deckReducer,
    decks: decksReducer, // обычный реюсер
    loading: loadingReducer, // обычный реюсер
  },
})

// Метод setupListeners, подключает слушатели событий фокуса (refetchOnFocus) и повторного подключения (refetchOnReconnect ),
// чтобы автоматически перезагружать данные при возвращении на страницу или восстановлении подключения
setupListeners(store.dispatch) // всегда прописываем его

// app common types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

/*
- gDM -- сокращение: вместо getDefaultMiddleware
- подключаем обучные редюсеры + РТК - родительский РТК редюсер: flashCardsAPI в middleware
если появятся еще родительские конкатенируем, см проект RTK Валера - отд папка в конспектах
 */
