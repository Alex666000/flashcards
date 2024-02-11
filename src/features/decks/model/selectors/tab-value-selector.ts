import { RootState } from '@/app/providers'

export const tabValueSelector = (state: RootState): string => state.decks.filter.tabValue
