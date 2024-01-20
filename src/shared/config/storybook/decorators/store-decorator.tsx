import { StoreProvider } from '@/app/providers/store'
import { StateSchema } from '@/app/providers/store/state-schema'
import { baseApi } from '@/shared/api/base-api'
import { configureStore } from '@reduxjs/toolkit'
import { Story } from '@storybook/react'

export const storyBookStore = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
    },
})

// export const StoreDecorator = (storyFn: () => ReactNode) => {
//     return <Provider store={storyBookStore}>{storyFn()}</Provider>
// }

/**
 * StoreDecorator - обёртка над историей для наделения её стейтом
* Принимаем state - чтобы для каждой истории могли задавать дефолтное значение стейта - например ошибку отображать,
индикацию загрузки
 * Потом саму историю оборачиваем в StoreProvider внутри которого создается store и аргументом он принимает
 initialState
 */
export const StoreDecorator = (state: DeepPartial<StateSchema>) => (StoryComponent: Story) => (
    <StoreProvider initialState={state}>
        <StoryComponent />
    </StoreProvider>
)
