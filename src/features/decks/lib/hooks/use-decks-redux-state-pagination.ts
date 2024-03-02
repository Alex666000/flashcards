/**
 * Хук для управления пагинацией колод (decks) в приложении
 * Хук возвращает объект, содержащий текущую страницу, размер страницы,
 а также функции для обновления текущей страницы и размера страницы.
 */
import { useCallback } from 'react'

import { selectCurrentPage, selectPageSize } from '@/features/decks'
import { useAppDispatch, useAppSelector } from '@/shared/lib'

import { decksActions } from '../../model/slice/decks.slice'

// Состояния поисковых параметров (фильтров) и "ПАГИНАЦИИ":
// храним в локальном стейте-редакса состояния пагинации
export const useDecksReduxStatePagination = () => {
  const dispatch = useAppDispatch()

  // селкторы для "ПАГИНАЦИИ": достают обновленные значения из стейта для перерисовки
  // на UI актуальных данных - подписка на изменения, чтобы отрисовывать актуальные данные всегда
  const currentPage = useAppSelector(selectCurrentPage)
  const pageSize = useAppSelector(selectPageSize)

  // диспатчим страницу которую нажал юзер
  // "Все что не делай - в конечном итоге всегда сеттаем.."
  const setCurrentPage = useCallback(
    (newPage: number) => {
      dispatch(decksActions.setCurrentPage({ newPage }))
    },
    [dispatch]
  )

  const setPageSize = useCallback(
    (newPageSize: number) => {
      dispatch(decksActions.setPageSize({ newPageSize }))
    },
    [dispatch]
  )

  return { currentPage, pageSize, setCurrentPage, setPageSize }
}

/*
- текущая страница - это состояние "локального редакса"
- чтобы получить значение селектора: currentPageSelector - надо сделать редюсер и его подключить в стор
 */
