import { RootState } from '@/app/providers/store/store'

export const selectPageSize = (state: RootState) => state.decks.pagination.pageSize
export const selectCurrentPage = (state: RootState) => state.decks.pagination.currentPage
export const selectSearchName = (state: RootState) => state.decks.filter.searchName
export const selectSliderValue = (state: RootState) => state.decks.filter.sliderValue
export const selectTabValue = (state: RootState) => state.decks.filter.tabValue
export const selectSortOptions = (state: RootState) => state.decks.sort
/*
- Селектор достает из инишл стейта значение - особенно при его изменении на новое чтобы в UI
отрисовать актуальные данные: стейт - подстейт (редюсер) - инишлстейт - свойство + его значение
 */
