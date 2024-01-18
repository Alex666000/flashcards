import { ReactNode } from 'react'
import { Provider } from 'react-redux'

import { baseApi } from '@/shared/api/base-api'
import { configureStore } from '@reduxjs/toolkit'

export const storyBookStore = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
    },
})

export const StoreDecorator = (storyFn: () => ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
