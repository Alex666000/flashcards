import { RootState } from '@/app/providers'

export const appStatusSelector = (state: RootState) => state.appReducer.status
