import { useCallback } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/providers'
import {
  searchNameSelector,
  sliderValueSelector,
  tabValueSelector,
} from '@/pages/decks-page/model/selectors'
import { decksActions } from '@/pages/decks-page/model/slice/decks.slice'

/**
 *  useDecksFilter, используется для управления фильтрами колод (decks) в приложении
 *  setSearchName, setTabValue, setSliderValue: Эти функции отправляют действия Redux для обновления
 соответствующих фильтров в хранилище
 * Хук возвращает объект, содержащий текущие значения фильтров и функции для их обновления
 * хук полезен для компонентов, которые должны применять фильтры к данным колод и требуют управления
 * параметрами поиска, выбранной вкладкой и значением слайдера
 */

export const useDecksFilter = () => {
  const searchName = useAppSelector(searchNameSelector)
  const tabValue = useAppSelector(tabValueSelector)
  const sliderValue = useAppSelector(sliderValueSelector)
  const dispatch = useAppDispatch()

  const setSearchName = useCallback(
    (newSearchName: string) => {
      dispatch(decksActions.setSearchName({ newSearchName }))
    },
    [dispatch]
  )

  const setTabValue = useCallback(
    (newTabValue: string) => {
      dispatch(decksActions.setTabValue({ newTabValue }))
    },
    [dispatch]
  )

  const setSliderValue = useCallback(
    (newSliderValue: number[]) => {
      dispatch(decksActions.setSliderValue({ newSliderValue }))
    },
    [dispatch]
  )

  return { searchName, setSearchName, setSliderValue, setTabValue, sliderValue, tabValue }
}
