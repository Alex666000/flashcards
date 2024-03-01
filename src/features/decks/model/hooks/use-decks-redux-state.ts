import { useCallback, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useMeQuery } from '@/features/auth/api/auth.api'
import {
  currentPageSelector,
  pageSizeSelector,
  searchNameSelector,
  sliderValueSelector,
  tabValueSelector,
} from '@/features/decks'
import { decksActions } from '@/features/decks/model/slice/decks.slice'
import { useAppDispatch, useAppSelector } from '@/shared/lib'

// Логика searchParams (HW15 DZ-auto + тут) + храним бизнес-данные Redux
export const useDecksReduxState = () => {
  const dispatch = useAppDispatch()

  // searchParams
  const [searchParams, setSearchParams]: [URLSearchParams, Function] = useSearchParams()
  const params = Object.fromEntries(searchParams)

  // constants
  const currentPage = useAppSelector(currentPageSelector)
  const pageSize = useAppSelector(pageSizeSelector)
  const searchName = useAppSelector(searchNameSelector)
  const tabValue = useAppSelector(tabValueSelector)
  const sliderValue = useAppSelector(sliderValueSelector)

  // handlers:
  const setCurrentPage = useCallback(
    (page: number) => {
      setSearchParams({ ...params, page: page })
      dispatch(decksActions.setCurrentPage({ page }))
    },
    [dispatch, params, setSearchParams]
  )

  const setPageSize = useCallback(
    (pageSize: number) => {
      setSearchParams({ ...params, pageSize })
      dispatch(decksActions.setPageSize({ pageSize }))
    },
    [dispatch, params, setSearchParams]
  )

  // устанавливаем в редюсер новый ТЕКСТ что ввел пользователь в инпут
  const setSearchName = useCallback(
    (search: string) => {
      setSearchParams({ ...params, search: search })
      dispatch(decksActions.setSearchName({ search }))
    },
    [dispatch, params, setSearchParams]
  )

  // устанавливаем выбранный Таб
  const setTabValue = useCallback(
    (tabValue: string) => {
      setSearchParams({ ...params, tabValue })
      dispatch(decksActions.setTabValue({ tabValue }))
    },
    [dispatch, params, setSearchParams]
  )

  // сеттаем выбранное значение СЛАЙДЕРА
  const setSliderValue = useCallback(
    (sliderValue: number[]) => {
      // устанавили значения слайдера в URL - заводим для этого поля: max, min т.к
      // в редаксе мы храним массив sliderValue: [0, 65]
      setSearchParams({ ...params, max: sliderValue[1], min: sliderValue[0] })
      dispatch(decksActions.setSliderValue({ sliderValue }))
    },
    [dispatch, params, setSearchParams]
  )

  // сбрасываем значения фильтров
  const clearSearchParamsFilter = useCallback(() => {
    setSearchParams(new URLSearchParams()) // Очищаем все параметры поиска в URL
    dispatch(decksActions.clearFilters()) // Очищаем параметры фильтрации в Redux
  }, [dispatch, setSearchParams])

  // в useEffect всегда делать проверку if-ами..
  useEffect(() => {
    // Достаём с урла значения что ранее установили - выше..
    const search = searchParams.get('search') || ''
    const page = searchParams.get('page') || ''
    const sliderValueMin = searchParams.get('min') || ''
    const sliderValueMax = searchParams.get('max') || ''
    const tabValue = searchParams.get('tabValue') || ''
    const pageSize = searchParams.get('pageSize') || ''

    if (page) {
      dispatch(decksActions.setCurrentPage({ page: Number(page) ?? null }))
    }

    if (pageSize) {
      dispatch(decksActions.setPageSize({ pageSize: Number(pageSize) ?? null }))
    }
    dispatch(decksActions.setSearchName({ search: search ?? '' }))
    dispatch(decksActions.setTabValue({ tabValue: tabValue ?? '' }))

    const newSliderValue = [
      sliderValueMin ? Number(sliderValueMin) : 0,
      sliderValueMax ? Number(sliderValueMax) : 65,
    ]

    dispatch(
      decksActions.setSliderValue({
        sliderValue: newSliderValue,
      })
    )
  }, [dispatch, searchParams])

  return {
    clearSearchParamsFilter,
    currentPage,
    pageSize,
    searchName,
    setCurrentPage,
    setPageSize,
    setSearchName,
    setSliderValue,
    setTabValue,
    sliderValue,
    tabValue,
  }
}
