import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useMeQuery } from '@/features/auth/api/auth.api'
import {
  currentPageSelector,
  searchNameSelector,
  sliderValueSelector,
  tabValueSelector,
} from '@/features/decks'
import { Sort, useAppDispatch, useAppSelector } from '@/shared/lib'

import { decksActions } from '../../model/slice/decks.slice'

// получаем для квери-сёрч параметров значения из стейта
export const useDecksReduxStateFilterParams = () => {
  const dispatch = useAppDispatch()

  const [searchParams, setSearchParams]: [URLSearchParams, Function] = useSearchParams()
  const params = Object.fromEntries(searchParams)

  const { data: meData } = useMeQuery()

  const searchName = useAppSelector(searchNameSelector) //
  const tabValue = useAppSelector(tabValueSelector) //
  const sliderValue = useAppSelector(sliderValueSelector) //
  const currentPage = useAppSelector(currentPageSelector)

  const onSetCurrentPageChange = useCallback(() => {
    return (newPage: number) => {
      setSearchParams({ ...params, newPage })
      dispatch(decksActions.setCurrentPage({ newPage }))
    }
  }, [dispatch, params, setSearchParams])

  const onSetPageSizeChange = useCallback(() => {
    return (newPageSize: string) => {
      setSearchParams({ ...params, newPageSize })
      dispatch(decksActions.setPageSize({ newPageSize: Number(newPageSize) }))
    }
  }, [dispatch, params, setSearchParams])

  // устанавливаем в редюсер новый ТЕКСТ что ввел пользователь в инпут
  const handleSetSearchNameChange = useCallback(
    (newSearchName: string) => {
      setSearchParams({ ...params, newSearchName })
      dispatch(decksActions.setSearchName({ newSearchName }))
    },
    [dispatch, params, setSearchParams]
  )

  // устанавливаем выбранный Таб юзером
  const handleSetTabValueChange = useCallback(
    (newUserTabValue: string) => {
      dispatch(decksActions.resetOnDefaultCurrentPage())
      setSearchParams({ ...params, newUserTabValue })
      dispatch(decksActions.setTabsValue({ newUserTabValue }))
      if (meData) {
        setSearchParams({ ...params, newUserTabValue: meData.id })
        dispatch(decksActions.setAuthorId({ newUserTabValue: meData.id }))
      }
      if (tabValue === 'my') {
        setSearchParams({ ...params, newUserTabValue: undefined })
        dispatch(decksActions.setAuthorId({ newUserTabValue: undefined }))
      }
    },
    [dispatch, meData, params, setSearchParams, tabValue]
  )

  // сеттаем выбранное значение СЛАЙДЕРА
  const handleSetSliderValueChange = useCallback(
    (newSliderValue: number[]) => {
      // сбрасываем страницы на 1
      dispatch(decksActions.resetOnDefaultCurrentPage())
      // ставим новые значения слайдера
      setSearchParams({ ...params, newSliderValue })
      dispatch(decksActions.setSliderValue({ newSliderValue }))
      setSearchParams({ ...params, max: newSliderValue[1], min: newSliderValue[0] })
      dispatch(
        decksActions.setCardsCount({
          cardsCount: { max: newSliderValue[1], min: newSliderValue[0] },
        })
      )
    },
    [dispatch, params, setSearchParams]
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
