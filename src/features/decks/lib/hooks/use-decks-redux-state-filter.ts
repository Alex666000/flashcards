import { useCallback } from 'react'

import { searchNameSelector, sliderValueSelector, tabValueSelector } from '@/features/decks'
import { useAppDispatch, useAppSelector } from '@/shared/lib'

import { decksActions } from '../../model/slice/decks.slice'

// получаем для квери-сёрч параметров значения из стейта
export const useDecksReduxStateFilter = () => {
  const searchName = useAppSelector(searchNameSelector)
  const tabValue = useAppSelector(tabValueSelector)
  const sliderValue = useAppSelector(sliderValueSelector)

  const dispatch = useAppDispatch()

  // устанавливаем в редюсер новый текст что ввел пользователь в инпут
  const setSearchName = useCallback(
    (newSearchName: string) => {
      dispatch(decksActions.setSearchName({ newSearchName }))
    },
    [dispatch]
  )

  // устанавливаем выбранный Таб юзером
  const setTabValue = useCallback(
    (newTabValue: string) => {
      dispatch(decksActions.setTabValue({ newTabValue }))
    },
    [dispatch]
  )
  // сеттаем выбранное значение слайдера
  const setSliderValue = useCallback(
    (newSliderValue: number[]) => {
      dispatch(decksActions.setSliderValue({ newSliderValue }))
    },
    [dispatch]
  )

  // возвращаем чтобы пользоваться на UI
  return { searchName, setSearchName, setSliderValue, setTabValue, sliderValue, tabValue }
}
