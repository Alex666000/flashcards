import { ReactNode } from 'react'
import { Provider } from 'react-redux'

import { StateSchema } from '@/app/providers/store/state-schema'

import { createReduxStore } from './store'

interface StoreProviderProps {
    children?: ReactNode
    initialState?: DeepPartial<StateSchema>
}

/**
- StoreProvider: обёртка над редаксовским <Provider store={store}>{children}</Provider> глобальным
провайдером чтобы связать реакт с редакс - чтобы в Реакт компонентах могли использовать редакс
- store - хранилище данных
- Обернуть приложение (Арр) в StoreProvider --> в файле main.ts
 */

export const StoreProvider = (props: StoreProviderProps) => {
    const { children, initialState } = props

    const store = createReduxStore(initialState as StateSchema)

    return <Provider store={store}>{children}</Provider>
}
