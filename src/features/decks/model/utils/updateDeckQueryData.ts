import { RootState } from '@/app/providers/store/store'
import { getSortedString } from '@/shared/lib'

export const updateDecksQueryData = (state: RootState) => {
  // из стейта вытягиваем что захотим:
  const {
    pagination: { currentPage, pageSize },
    searchParams: { authorId, cardsCount, searchName, sortOptions },
  } = state.decks

  const sortedString = getSortedString(sortOptions)

  return {
    authorId,
    currentPage,
    itemsPerPage: pageSize,
    maxCardsCount: cardsCount.maxCardsCount,
    minCardsCount: cardsCount.minCardsCount,
    name: searchName,
    orderBy: sortedString,
  }
}
