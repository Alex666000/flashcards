import { RootState } from '@/app/providers/store/store'

export const deckPageSizeSelector = (state: RootState): number => state.deck.pagination.pageSize
