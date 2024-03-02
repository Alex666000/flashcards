import { useCallback, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useMeQuery } from '@/features/auth/api/auth.api'
import {
  selectCurrentPage,
  selectPageSize,
  selectSearchName,
  selectSliderValue,
  selectTabValue,
} from '@/features/decks'
import { decksActions } from '@/features/decks/model/slice/decks.slice'
import { useAppDispatch, useAppSelector } from '@/shared/lib'

export const useDecks = () => {
  const dispatch = useAppDispatch()
  const { data: meData } = useMeQuery()

  const [searchParams, setSearchParams]: [URLSearchParams, Function] = useSearchParams()
  const params = Object.fromEntries(searchParams)

  // constants
  const currentPage = useAppSelector(selectCurrentPage)
  const pageSize = useAppSelector(selectPageSize)
  const searchName = useAppSelector(selectSearchName)
  const tabValue = useAppSelector(selectTabValue)
  const sliderValue = useAppSelector(selectSliderValue)

  // handlers
  const setCurrentPage = useCallback((newPage: number) => {
    setSearchParams({ ...params, newPage })
    dispatch(decksActions.setCurrentPage({ newPage }))
  }, [])

  const setPageSize = useCallback((newPageSize: number) => {
    setSearchParams({ ...params, newPageSize })
    dispatch(decksActions.setPageSize({ newPageSize }))
  }, [])

  // устанавливаем в редюсер новый ТЕКСТ что ввел пользователь в инпут
  const setSearchName = useCallback((newSearchName: string) => {
    setSearchParams({ ...params, newSearchName })
    dispatch(decksActions.setSearchName({ newSearchName }))
  }, [])

  // устанавливаем выбранный Таб
  const setTabValue = useCallback((newTabValue: string) => {
    setSearchParams({ ...params, newTabValue })
    dispatch(decksActions.setTabValue({ newTabValue }))
  }, [])

  // сеттаем выбранное значение СЛАЙДЕРА
  const setSliderValue = useCallback((newSliderValue: number[]) => {
    setSearchParams({ ...params, newSliderValue })
    dispatch(decksActions.setSliderValue({ newSliderValue }))
  }, [])

  console.log(searchName)

  useEffect(() => {
    const search = searchParams.get('newSearchName') || ''

    dispatch(decksActions.setSearchName({ newSearchName: search }))
  }, [])

  return {
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
