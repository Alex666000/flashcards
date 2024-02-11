import { RootState } from '@/app/providers'

export const currentPageSelector = (state: RootState): number => state.decks.pagination.currentPage

/*
- Селектор достает из инишл стейта значение - особенно при его изменении на новое чтобы в UI
отрисовать актуальные данные: стейт - подстейт (редюсер) - инишлстейт - свойство + его значение
 */
