import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import {
  selectCurrentPage,
  selectPageSize,
  selectSearchName,
  selectSliderValue,
  selectSortOptions,
  selectTabValue,
} from '@/features/decks'
import { clearLocalStorage } from '@/features/decks/model/hooks/use-clear-local-storage'
import { decksActions } from '@/features/decks/model/slice/decks.slice'
import { Sort, useAppDispatch, useAppSelector } from '@/shared/lib'

// Логика searchParams (HW15 DZ-auto) + храним бизнес-данные Redux
export const useDecksReduxState = () => {
  const dispatch = useAppDispatch()

  // Флаг для предотвращения лишнего рендера из-за выбранного квери параметра
  const [isFirstRender, setIsFirstRender] = useState(true)

  // searchParams
  const [searchParams, setSearchParams]: [URLSearchParams, Function] = useSearchParams()
  const params = Object.fromEntries(searchParams)

  // constants
  const currentPage = useAppSelector(selectCurrentPage)
  const pageSize = useAppSelector(selectPageSize)
  const searchName = useAppSelector(selectSearchName)
  const tabValue = useAppSelector(selectTabValue)
  const sliderValue = useAppSelector(selectSliderValue)
  const sort = useAppSelector(selectSortOptions)

  // handlers:
  const setCurrentPage = useCallback(
    (page: number) => {
      if (page !== currentPage) {
        setSearchParams({ ...params, page: page.toString() })
      }
      dispatch(decksActions.setCurrentPage({ page }))
      localStorage.setItem('currentPage', JSON.stringify(page))
    },
    [currentPage, dispatch, params, setSearchParams]
  )

  const setPageSize = useCallback(
    (pageSize: number) => {
      setSearchParams({ ...params, pageSize: pageSize.toString() })
      dispatch(decksActions.setPageSize({ pageSize }))
      localStorage.setItem('pageSize', JSON.stringify(pageSize))
    },
    [dispatch, params, setSearchParams]
  )

  // устанавливаем в редюсер новый ТЕКСТ что ввел пользователь в инпут
  const setSearchName = useCallback(
    (search: string) => {
      setSearchParams({ ...params, search: search })
      dispatch(decksActions.setSearchName({ search }))
      localStorage.setItem('searchName', JSON.stringify(search))
    },
    [dispatch, params, setSearchParams]
  )

  // устанавливаем выбранный Таб
  const setTabValue = useCallback(
    (tabValue: string) => {
      dispatch(decksActions.setSearchName({ search: '' }))
      setSearchParams({ ...params, tabValue })
      dispatch(decksActions.setTabValue({ tabValue }))
      localStorage.setItem('tabValue', JSON.stringify(tabValue))
    },
    [dispatch, params, setSearchParams]
  )

  // сеттаем выбранное значение СЛАЙДЕРА
  const setSliderValue = useCallback(
    (sliderValue: number[]) => {
      // устанавили значения слайдера в URL - заводим для этого поля: max, min т.к
      // в редаксе мы храним массив sliderValue: [0, 65]
      setSearchParams({ ...params, max: sliderValue[1].toString(), min: sliderValue[0].toString() })
      dispatch(decksActions.setSliderValue({ sliderValue }))
      localStorage.setItem('sliderValue', JSON.stringify(sliderValue))
    },
    [dispatch, params, setSearchParams]
  )

  const setSort = useCallback(
    (sort: Sort | undefined) => {
      if (sort) {
        setSearchParams({ ...params, sort: `${sort.direction}_${sort.key}` })
      } else {
        setSearchParams({ ...params, sort: '' })
      }
      dispatch(decksActions.setSortOptions({ sort }))
      localStorage.setItem('sortOptions', JSON.stringify(sort))
    },
    [dispatch, params, setSearchParams]
  )

  // сбрасываем значения фильтров
  const clearSearchParamsFilter = useCallback(() => {
    dispatch(decksActions.clearFilters()) // Очищаем параметры фильтрации в Redux
    dispatch(decksActions.setSliderValue({ sliderValue: [0, 65] }))
    setSearchParams({}) // Очищаем все параметры поиска в URL
    // Очищаем с ЛС
    clearLocalStorage()
  }, [dispatch, setSearchParams])

  // в useEffect всегда делать проверку if
  useEffect(() => {
    // Достаём с урла значения что ранее установили setSearchParams
    const search = searchParams.get('search') || ''
    const page = searchParams.get('page') || ''
    const sliderValueMin = searchParams.get('min') || ''
    const sliderValueMax = searchParams.get('max') || ''
    const tabValue = searchParams.get('tabValue') || ''
    const pageSize = searchParams.get('pageSize') || ''
    const sort = searchParams.get('sort') || ''

    if (sort) {
      const [direction, key] = sort.split('_')

      dispatch(
        decksActions.setSortOptions({ sort: { direction: direction as 'asc' | 'desc', key } })
      )
    }

    if (page) {
      dispatch(decksActions.setCurrentPage({ page: Number(page) ?? null }))
    }

    if (pageSize) {
      dispatch(decksActions.setPageSize({ pageSize: Number(pageSize) ?? null }))
    }

    dispatch(decksActions.setSearchName({ search: search ?? '' }))

    if (tabValue) {
      // если не первый рендер, только в этом случае
      if (!isFirstRender) {
        dispatch(decksActions.setTabValue({ tabValue: tabValue ?? '' }))
      } else {
        setIsFirstRender(false)
      }
    }

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

  // в useEffect всегда делать проверку c if
  useEffect(() => {
    // достаем из ЛС при загрузке страницы decks-page:
    const searchNameValue = localStorage.getItem('searchName')
    const currentPageValue = localStorage.getItem('currentPage')
    const pageSizeValue = localStorage.getItem('pageSize')
    const tabValue = localStorage.getItem('tabValue')
    const sliderValue = localStorage.getItem('sliderValue')

    // устанавливаем в стейт редакса (Арр) значения что достали с ЛС:
    if (searchNameValue) {
      dispatch(decksActions.setSearchName({ search: JSON.parse(searchNameValue) }))
    }
    if (currentPageValue) {
      dispatch(decksActions.setCurrentPage({ page: JSON.parse(currentPageValue) }))
    }
    if (pageSizeValue) {
      dispatch(decksActions.setPageSize({ pageSize: JSON.parse(pageSizeValue) }))
    }
    if (tabValue) {
      if (!isFirstRender) {
        dispatch(decksActions.setTabValue({ tabValue: JSON.parse(tabValue) }))
      } else {
        setIsFirstRender(false)
      }
    }
    if (sliderValue) {
      dispatch(decksActions.setSliderValue({ sliderValue: JSON.parse(sliderValue) }))
    }
  }, [dispatch])

  return {
    clearSearchParamsFilter,
    currentPage,
    pageSize,
    searchName,
    setCurrentPage,
    setPageSize,
    setSearchName,
    setSliderValue,
    setSort,
    setTabValue,
    sliderValue,
    sort,
    tabValue,
  }
}
