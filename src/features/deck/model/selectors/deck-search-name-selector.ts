import { RootState } from '@/app/providers/store/store'

export const deckSearchNameSelector = (state: RootState): string => state.deck.searchName
