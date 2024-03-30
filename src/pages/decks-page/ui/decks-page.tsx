import { useEffect, useState } from 'react'

import { UserAuthDataResponse } from '@/features/auth'
import { useMeQuery } from '@/features/auth/api/auth.api'
import { DecksTable, FilterControls } from '@/features/decks'
import { useGetDecksQuery } from '@/features/decks/api'
import { useDecksReduxState } from '@/features/decks/lib/hooks/use-decks-redux-state'
import { getSortedString, useDebounce } from '@/shared/lib'
import { Container } from '@/shared/ui/container'
import { LeanerProgress } from '@/shared/ui/loaders-components/loaders'
import { Page } from '@/shared/ui/page'
import { Pagination } from '@/shared/ui/pagination'
import { Typography } from '@/shared/ui/typography'

import s from './decks.module.scss'

import { ControlForNewDeckHeader } from './control-for-new-deck-header/control-for-new-deck-header'

const DecksPage = () => {
  const [isInitPage, setIsInitPage] = useState(true)
  const {
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
  } = useDecksReduxState()

  const sortedString = getSortedString(sort)

  const debouncedSearchName = useDebounce(searchName)
  const debouncedSliderValue = useDebounce(sliderValue)

  const { data: meData } = useMeQuery()

  const {
    data: decksData,
    error,
    isFetching,
    isLoading,
  } = useGetDecksQuery({
    authorId: tabValue,
    currentPage: +currentPage,
    itemsPerPage: pageSize,
    maxCardsCount: debouncedSliderValue[1],
    minCardsCount: debouncedSliderValue[0],
    name: debouncedSearchName,
    orderBy: sortedString,
  })

  const totalCards = decksData?.maxCardsCount

  useEffect(() => {
    if (isInitPage) {
      if ((totalCards && totalCards / pageSize < currentPage) || tabValue) {
        setCurrentPage(1)
      }
    }

    return () => {
      setIsInitPage(false)
    }
  }, [currentPage, isInitPage, pageSize, setCurrentPage, tabValue, totalCards])

  if (error) {
    const err = error as any

    return (
      <Typography as={'h2'} variant={'error'}>
        {err.data.error}
      </Typography>
    )
  }

  const loadingStatus = isLoading || isFetching

  return (
    <>
      {loadingStatus && <LeanerProgress />}
      <Page className={s.decksPageBlock}>
        <Container className={s.header}>
          <ControlForNewDeckHeader />
          <FilterControls
            authUserId={(meData as UserAuthDataResponse)?.id}
            onClearFilter={clearSearchParamsFilter}
            onSearchNameChange={setSearchName}
            onSliderValueChange={setSliderValue}
            onTabValueChange={setTabValue}
            searchName={searchName}
            sliderMaxValue={decksData?.maxCardsCount}
            sliderValue={sliderValue}
            tabValue={tabValue}
          />
          {decksData?.items && (
            <DecksTable
              authUserId={(meData as UserAuthDataResponse)?.id}
              items={decksData?.items}
              onSort={setSort}
              sort={sort}
            />
          )}
          {decksData && decksData.items.length ? (
            <Pagination
              className={s.pagination}
              currentPage={currentPage}
              onSetPageChange={setCurrentPage}
              onSetPageSizeChange={setPageSize}
              pageSize={pageSize}
              totalCount={300}
            />
          ) : null}
        </Container>
      </Page>
    </>
  )
}

export default DecksPage
