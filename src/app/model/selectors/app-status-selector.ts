import { RootState } from '@/app/providers/store/store'

export const appStatusSelector = (state: RootState) => state.appReducer.status
