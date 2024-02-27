import { useCallback } from 'react'
import { toast } from 'react-toastify'

import {
  authorIdSelector,
  cardsCountSelector,
  currentPageSelector,
  searchNameSelector,
  sliderValueSelector,
  tabValueSelector,
} from '@/features/decks'
import { sortOptionsSelector } from '@/features/decks/model/selectors/page-size-selector'
import { Sort, useAppDispatch, useAppSelector } from '@/shared/lib'

import { decksActions } from '../../model/slice/decks.slice'

// получаем для квери-сёрч параметров значения из стейта
export const useDecksReduxStateFilterParams = () => {
  const dispatch = useAppDispatch()

  const searchName = useAppSelector(searchNameSelector) //
  const tabValue = useAppSelector(tabValueSelector) //
  const sliderValue = useAppSelector(sliderValueSelector) //

  const cardsCount = useAppSelector(cardsCountSelector)
  const authorId = useAppSelector(authorIdSelector)
  const sortOptions = useAppSelector(sortOptionsSelector)
  const currentPage = useAppSelector(currentPageSelector)
  const sliderValues = useAppSelector(sliderValueSelector)
  const setCardsCount = useAppSelector(cardsCountSelector)

  // устанавливаю сортировку выбранную юзером
  const onSetSortChange = (orderBy: Sort) => {
    // orderBy - с сервера получим
    dispatch(decksActions.setSort({ sortOptions: orderBy }))
  }

  const onClearFilterParamsChange = () => {
    dispatch(decksActions.clearFilterParams())
    dispatch(decksActions.setSliderValue({ newSliderValue: [] }))
    toast.info('Filters reset')
  }

  const onSetCurrentPageChange = (newPage: number) => {
    dispatch(decksActions.setCurrentPage({ newPage }))
  }

  const onSetPageSizeChange = (newPageSize: string) => {
    dispatch(decksActions.setPageSize({ newPageSize: Number(newPageSize) }))
  }

  // устанавливаем в редюсер новый текст что ввел пользователь в инпут
  const onSetSearchNameChange = useCallback(
    (newSearchName: string) => {
      dispatch(decksActions.setSearchName({ newSearchName }))
    },
    [dispatch]
  )

  // устанавливаем выбранный Таб юзером
  const onSetTabValueChange = useCallback(
    (newUserTabValue: string) => {
      dispatch(decksActions.resetOnDefaultCurrentPage())
      dispatch(decksActions.setTabsValue({ newUserTabValue }))
    },
    [dispatch]
  )

  // сеттаем выбранное значение слайдера
  const onSetSliderValueChange = useCallback(
    (newSliderValue: number[]) => {
      // сьрасываем страницы на 1
      dispatch(decksActions.resetOnDefaultCurrentPage())
      // ставим новые значения слайдера
      dispatch(decksActions.setSliderValue({ newSliderValue }))
      dispatch(
        decksActions.setCardsCount({
          cardsCount: { maxCardsCount: sliderValues[1], minCardsCount: sliderValues[0] },
        })
      )
    },
    [dispatch, sliderValues]
  )

  // возвращаем значения чтобы пользоваться на UI
  return {
    authorId,
    cardsCount,
    currentPage,
    onClearFilterParamsChange,
    onSetCurrentPageChange,
    onSetPageSizeChange,
    onSetSearchNameChange,
    onSetSliderValueChange,
    onSetSortChange,
    onSetTabValueChange,
    searchName,
    setCardsCount,
    sliderValue,
    sortOptions,
    tabValue,
  }
}
