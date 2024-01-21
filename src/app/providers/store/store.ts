import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { baseApi } from '@/shared/api/base-api'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { StateSchema } from './state-schema'

export function createReduxStore(initialState?: StateSchema) {
    const store = configureStore({
        // для РТК мидлвейр: его регистрируем тут и в reducer
        middleware: (gDM) => gDM().concat(baseApi.middleware),
        preloadedState: initialState,
        // обычные редюсеры для редакс-локального стейта - например packs: packsReducer
        reducer: {
            [baseApi.reducerPath]: baseApi.reducer,
            // packs: packsReducer,
        },
    })

    return store
}

const store = createReduxStore()

// Метод setupListeners, подключает слушатели событий фокуса (refetchOnFocus) и повторного подключения (refetchOnReconnect ),
// чтобы автоматически перезагружать данные при возвращении на страницу или восстановлении подключения
setupListeners(store.dispatch) // всегда прописываем его

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

/*
- gDM -- вместо getDefaultMiddleware
 */
