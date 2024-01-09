import { baseApi } from '@/shared/api/base-api'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
    // в ртк мидлвеир обязателен
    // на каждый createApi что в файле base-api будет конкатенировать в мидлвейре например:.concat(baseApi.middleware)
    // и подключать в reducer: так: [baseApi.reducerPath]: baseApi.reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
    reducer: {
        // наш редюсер - слаис регистрируем - после каждого подключенного редюсера еще в мидлвеир его конкатинируем
        // создадим если новый редюсер то сюда подключаем и в concat плюсуем его
        [baseApi.reducerPath]: baseApi.reducer,
    },
})

// Метод setupListeners, подключает слушатели событий фокуса (refetchOnFocus) и повторного подключения (refetchOnReconnect ),
// чтобы автоматически перезагружать данные при возвращении на страницу или восстановлении подключения
setupListeners(store.dispatch) // всегда прописываем его

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
