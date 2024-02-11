import { useCallback } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/providers'
import { currentPageSelector, pageSizeSelector } from '@/pages/decks-page/model/selectors'
import { decksActions } from '@/pages/decks-page/model/slice/decks.slice'

/**
 * Хук для управления пагинацией колод (decks) в приложении
 * Хук возвращает объект, содержащий текущую страницу, размер страницы,
 а также функции для обновления текущей страницы и размера страницы.
 */

export const useDecksPagination = () => {
  const dispatch = useAppDispatch()

  const currentPage = useAppSelector(currentPageSelector)
  const pageSize = useAppSelector(pageSizeSelector)

  // отправляет действие Redux для обновления текущей страницы колод
  const setCurrentPage = useCallback(
    (newPage: number) => {
      dispatch(decksActions.setCurrentPage({ newPage }))
    },
    [dispatch]
  )

  // отправляет действие Redux для обновления размера страницы колод
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
