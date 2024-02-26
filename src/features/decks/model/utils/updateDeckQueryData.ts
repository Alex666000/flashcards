import { RootState } from '@/app/providers/store/store'

export const updateDecksQueryData = (state: RootState) => {
  // из стейта вытягиваем что захотим:
  const { authorId, cardsCount, currentPage, pageSize, searchName, sortOptions } = state.decks

  // const sortedString = getSortedString(sortOptions)

  return {
    // authorId,
    // currentPage,
    // itemsPerPage: pageSize,
    // maxCardsCount: cardsCount.max,
    // minCardsCount: cardsCount.min,
    // name: searchName,
    // orderBy: sortedString,
  }
}
