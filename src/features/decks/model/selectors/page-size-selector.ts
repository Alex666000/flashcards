import { RootState } from '@/app/providers/store/store'

export const pageSizeSelector = (state: RootState) => state.decks.pagination.pageSize
export const currentPageSelector = (state: RootState) => state.decks.pagination.currentPage
export const searchNameSelector = (state: RootState) => state.decks.searchParams.searchName
export const sliderValueSelector = (state: RootState) => state.decks.searchParams.sliderValue
export const tabValueSelector = (state: RootState) => state.decks.searchParams.tabValue
export const cardsCountSelector = (state: RootState) => state.decks.searchParams.cardsCount
export const authorIdSelector = (state: RootState) => state.decks.searchParams.authorId
export const sortOptionsSelector = (state: RootState) => state.decks.searchParams.sortOptions
/*
- Селектор достает из инишл стейта значение - особенно при его изменении на новое чтобы в UI
отрисовать актуальные данные: стейт - подстейт (редюсер) - инишлстейт - свойство + его значение
 */
