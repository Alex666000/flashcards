import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { baseApi } from '@/shared/api/base-api'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { StateSchema } from './state-schema'

export function createReduxStore(initialState?: StateSchema) {
    const store = configureStore({
        devTools: true,
        // для РТК мидлвейр: его регистрируем тут и в reducer
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
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

export type AppDispatch = typeof store.dispatch

// State all App
export type RootState = ReturnType<typeof store.getState>

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
