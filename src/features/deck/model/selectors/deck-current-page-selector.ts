import { RootState } from '@/app/providers'

export const deckCurrentPageSelector = (state: RootState): number =>
  state.deck.pagination.currentPage
