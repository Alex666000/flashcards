import { RootState } from '@/app/providers/store/store'

export const pageSizeSelector = (state: RootState) => state.decks.pagination.pageSize
export const currentPageSelector = (state: RootState) => state.decks.pagination.currentPage
export const searchNameSelector = (state: RootState) => state.decks.filter.searchName
export const sliderValueSelector = (state: RootState) => state.decks.filter.sliderValue
export const tabValueSelector = (state: RootState) => state.decks.filter.tabValue

/*
- Селектор достает из инишл стейта значение - особенно при его изменении на новое чтобы в UI
отрисовать актуальные данные: стейт - подстейт (редюсер) - инишлстейт - свойство + его значение
 */
