import { RootState } from '@/app/providers/store/store'

export const loadingSelector = (state: RootState): boolean => state.loading.queryInProgress

/*
- Второй параметр всегда подключаем в store - в configureStore()
 */
