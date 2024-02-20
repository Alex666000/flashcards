import { useCallback } from 'react'
import { useParams } from 'react-router-dom'

import { deckCurrentPageSelector } from '@/features/deck/model/selectors/deck-current-page-selector'
import { deckPageSizeSelector } from '@/features/deck/model/selectors/deck-page-size-selector'
import { deckSearchNameSelector } from '@/features/deck/model/selectors/deck-search-name-selector'
import { deckActions } from '@/features/deck/model/slice/pack.sliece'
import { useAppDispatch } from '@/shared/lib/hooks/use-app-dispatch'
import { useAppSelector } from '@/shared/lib/hooks/use-app-selector'

export const useDeckLocalStateData = () => {
  const currentPage = useAppSelector(deckCurrentPageSelector)
  const pageSize = useAppSelector(deckPageSizeSelector)
  const searchName = useAppSelector(deckSearchNameSelector)

  // для извлечения параметров из URL
  //  извлекает параметр id из URL
  const { id } = useParams()
  const deckId = id as string

  const dispatch = useAppDispatch()

  const setCurrentPage = useCallback(
    (newPage: number) => {
      dispatch(deckActions.setCurrentPage({ newPage }))
    },
    [dispatch]
  )

  const setPageSize = useCallback(
    (newPageSize: number) => {
      dispatch(deckActions.setPageSize({ newPageSize }))
    },
    [dispatch]
  )

  const setSearchName = useCallback(
    (newSearchName: string) => {
      dispatch(deckActions.setSearchName({ newSearchName }))
    },
    [dispatch]
  )

  return {
    currentPage,
    deckId,
    pageSize,
    searchName,
    setCurrentPage,
    setPageSize,
    setSearchName,
  }
}
