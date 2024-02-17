import { RootState } from '@/app/providers'

export const deckSearchNameSelector = (state: RootState): string => state.deck.searchName
