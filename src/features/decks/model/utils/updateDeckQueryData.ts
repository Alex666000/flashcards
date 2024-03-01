import { useState } from 'react'

import { RootState } from '@/app/providers/store/store'
import { Sort, getSortedString } from '@/shared/lib'

// вызываем её в decks.api в onQueryStarted для создания и удаления квери запросов:
export const updateDecksQueryData = (state: RootState) => {
  // из стейта вытягиваем что захотим - надо достать то, что есть в методе
  // 1 параметра decksAPI.util.updateQueryData( 'getDecks' ) - то есть все данные для запроса
  // за колодами, а именно квери параметры
  const {
    filter: { searchName, sliderValue, tabValue },
    pagination: { currentPage, pageSize },
  } = state.decks

  return {
    currentPage,
    itemsPerPage: pageSize,
    maxCardsCount: sliderValue[1],
    minCardsCount: sliderValue[0],
    name: searchName,
    orderBy: 'sortedString',
  }
}
