import { RootState } from '@/app/providers/store/store'

export const deckCurrentPageSelector = (state: RootState): number =>
  state.deck.pagination.currentPage
