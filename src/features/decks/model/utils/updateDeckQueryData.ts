import { RootState } from '@/app/providers/store/store'
import { getSortedString, useDebounce } from '@/shared/lib'

export const updateDecksQueryData = (state: RootState) => {
  // из стейта вытягиваем что захотим - надо достать то, что есть в методе
  // 1 параметра decksAPI.util.updateQueryData( 'getDecks' ) :
  const {
    pagination: { currentPage, pageSize },
    searchParams: { authorId, searchName, sliderValue, sortOptions },
  } = state.decks

  const sortedString = getSortedString(sortOptions)

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const debouncedSliderValue = useDebounce(sliderValue)

  return {
    authorId,
    currentPage,
    itemsPerPage: pageSize,
    maxCardsCount: debouncedSliderValue[1],
    minCardsCount: debouncedSliderValue[0],
    name: searchName,
    orderBy: sortedString,
  }
}
