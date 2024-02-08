import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { appReducer } from '@/app/model/slice/app.slice'
import { authAPI } from '@/features/auth/api/auth.api'
import { loadingReducer } from '@/features/loading/model/slice/loading.slice'
import { flashCardsAPI } from '@/shared/api/flash-cards.api'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  // апишка всего проекта
  middleware: (gDM) => gDM().concat(flashCardsAPI.middleware),
  reducer: {
    appReducer,
    // RTK редюсеры
    [authAPI.reducerPath]: authAPI.reducer,
    // обычные редюсеры для внутреннего стейта
    loading: loadingReducer,
  },
})

// Метод setupListeners, подключает слушатели событий фокуса (refetchOnFocus) и повторного подключения (refetchOnReconnect ),
// чтобы автоматически перезагружать данные при возвращении на страницу или восстановлении подключения
setupListeners(store.dispatch) // всегда прописываем его

// app common types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

/*
- gDM -- сокращение: вместо getDefaultMiddleware
 */
