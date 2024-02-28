import { useCallback } from 'react'
import { toast } from 'react-toastify'

import { useMeQuery } from '@/features/auth/api/auth.api'
import {
  authorIdSelector,
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

  const { data: meData } = useMeQuery()

  const searchName = useAppSelector(searchNameSelector) //
  const tabValue = useAppSelector(tabValueSelector) //
  const sliderValue = useAppSelector(sliderValueSelector) //
  const authorId = useAppSelector(authorIdSelector)
  const sortOptions = useAppSelector(sortOptionsSelector)
  const currentPage = useAppSelector(currentPageSelector)

  // устанавливаю сортировку выбранную юзером
  const onSetSortChange = (orderBy: Sort) => {
    // orderBy - с сервера получим
    dispatch(decksActions.setSortedString({ sortOptions: orderBy }))
  }

  const onClearFilterParamsChange = () => {
    dispatch(decksActions.clearFilterParams())
    dispatch(decksActions.setSliderValue({ newSliderValue: [] }))
    toast.info('Filters reset', { containerId: 'common' })
  }

  const onSetCurrentPageChange = (newPage: number) => {
    dispatch(decksActions.setCurrentPage({ newPage }))
  }

  const onSetPageSizeChange = (newPageSize: string) => {
    dispatch(decksActions.setPageSize({ newPageSize: Number(newPageSize) }))
  }

  // устанавливаем в редюсер новый ТЕКСТ что ввел пользователь в инпут
  const handleSetSearchNameChange = useCallback(
    (newSearchName: string) => {
      dispatch(decksActions.setSearchName({ newSearchName }))
    },
    [dispatch]
  )

  // устанавливаем выбранный Таб юзером
  const handleSetTabValueChange = useCallback(
    (newUserTabValue: string) => {
      dispatch(decksActions.resetOnDefaultCurrentPage())
      dispatch(decksActions.setTabsValue({ newUserTabValue }))
      if (meData) {
        dispatch(decksActions.setAuthorId({ newUserTabValue: meData.id }))
      }
      if (tabValue === 'my') {
        dispatch(decksActions.setAuthorId({ newUserTabValue: undefined }))
      }
    },
    [dispatch, meData, tabValue]
  )

  // сеттаем выбранное значение СЛАЙДЕРА
  const handleSetSliderValueChange = useCallback(
    (newSliderValue: number[]) => {
      // сьрасываем страницы на 1
      dispatch(decksActions.resetOnDefaultCurrentPage())
      // ставим новые значения слайдера
      dispatch(decksActions.setSliderValue({ newSliderValue }))
      dispatch(
        decksActions.setCardsCount({
          cardsCount: { max: newSliderValue[1], min: newSliderValue[0] },
        })
      )
    },
    [dispatch]
  )

  // возвращаем значения чтобы пользоваться на UI
  return {
    authorId,
    currentPage,
    handleSetSearchNameChange,
    handleSetSliderValueChange,
    handleSetTabValueChange,
    onClearFilterParamsChange,
    onSetCurrentPageChange,
    onSetPageSizeChange,
    onSetSortChange,
    searchName,
    sliderValue,
    sortOptions,
    tabValue,
  }
}
