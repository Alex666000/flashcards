import { decksApi } from '@/entities/Decks/services/decks-api'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
    // в ртк мидлвеир обязательно
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(decksApi.middleware),
    reducer: {
        // наш редюсер - слаис регистрируем - после каждого подключенного редюсера еще в мидлвеир его конкатинируем
        [decksApi.reducerPath]: decksApi.reducer,
    },
})

// Метод setupListeners, подключает слушатели событий фокуса (refetchOnFocus) и повторного подключения (refetchOnReconnect ),
// чтобы автоматически перезагружать данные при возвращении на страницу или восстановлении подключения
setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
