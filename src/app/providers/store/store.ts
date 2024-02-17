import { appReducer } from '@/app/model/slice/app.slice'
import { authAPI } from '@/features/auth/api/auth.api'
import { decksReducer } from '@/features/decks/model/slice/decks.slice'
import { loadingReducer } from '@/features/loading/model/slice/loading.slice'
import { flashCardsAPI } from '@/shared/api/flash-cards.api'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  // РТК апишка всего проекта - родитель для частных апишек проекта
  middleware: (gDM) => gDM().concat(flashCardsAPI.middleware),
  reducer: {
    appReducer, // обычный реюсер
    [authAPI.reducerPath]: authAPI.reducer, // RTK редюсер
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
