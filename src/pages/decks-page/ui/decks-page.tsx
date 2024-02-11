import { useEffect, useState } from 'react'

import { useMeQuery } from '@/features/auth/api/auth.api'
import { UserResponse } from '@/features/auth/api/auth.types'
import { useDecksPagination } from '@/pages/decks-page/lib/hooks/use-decks-pagination'
import { Pagination } from '@/shared/ui/pagination'
import { Sort } from '@/shared/ui/table-header'
import { Typography } from '@/shared/ui/typography'

import s from './decks.module.scss'

import { useDecksFilter } from '../lib/hooks/use-decks-filter'

export const Decks = () => {
  const { currentPage, pageSize, setCurrentPage, setPageSize } = useDecksPagination()
  const { searchName, setSearchName, setSliderValue, setTabValue, sliderValue, tabValue } =
    useDecksFilter()

  const [sort, setSort] = useState<Sort>({ direction: 'desc', key: 'updated' })
  const sortedString = getSortedString(sort)

  const debouncedSearchName = useDebounce(searchName)
  const debouncedSliderValue = useDebounce(sliderValue)

  const { data } = useMeQuery()
  const userId = (data as UserResponse).id

  const packs = useGetDecksQuery({
    authorId: tabValue,
    currentPage,
    itemsPerPage: pageSize,
    maxCardsCount: debouncedSliderValue[1],
    minCardsCount: debouncedSliderValue[0],
    name: debouncedSearchName,
    orderBy: sortedString,
  })

  const totalCards = packs?.data?.maxCardsCount

  useEffect(() => {
    if ((totalCards && totalCards / pageSize < currentPage) || tabValue) {
      setCurrentPage(1)
    }
  }, [debouncedSearchName, debouncedSliderValue, pageSize, tabValue])

  return (
    <section className={s.root}>
      <div className={s.header}>
        <div className={s.top}>
          <Typography as={'h1'} variant={'large'}>
            Packs list
          </Typography>
          <CreateControl />
        </div>
        <FilterControls
          authUserId={userId}
          searchName={searchName}
          setSearchName={setSearchName}
          setSliderValue={setSliderValue}
          setTabValue={setTabValue}
          sliderMaxValue={packs?.data?.maxCardsCount}
          sliderValue={sliderValue}
          tabValue={tabValue}
        />
      </div>
      {packs?.data?.items && (
        <DecksTable authUserId={userId} items={packs.data.items} onSort={setSort} sort={sort} />
      )}
      <Pagination
        className={s.pagination}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
        pageSize={pageSize}
        totalCount={packs?.data?.pagination.totalItems}
      />
    </section>
  )
}
