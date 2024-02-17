import { RootState } from '@/app/providers'

export const deckPageSizeSelector = (state: RootState): number => state.deck.pagination.pageSize
