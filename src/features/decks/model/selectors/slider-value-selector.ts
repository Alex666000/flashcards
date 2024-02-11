import { RootState } from '@/app/providers'

export const sliderValueSelector = (state: RootState): number[] => state.decks.filter.sliderValue
