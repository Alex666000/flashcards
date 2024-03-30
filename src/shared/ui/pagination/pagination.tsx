import { FC, memo } from 'react'

import { Typography } from '@/shared/ui/typography'
import { clsx } from 'clsx'

import s from './pagination.module.scss'

import { NavigationBlock } from './navigation-block/navigation-block'
import { PageSizeSelect } from './page-size-select/page-size-select'
import { usePagination } from './usePagination'

export type PaginationProps = {
  className?: string
  currentPage: number
  onSetPageChange: (newPage: number) => void
  onSetPageSizeChange: (newPageSize: number) => void
  pageSize: number
  siblingCount?: number
  totalCount?: number
}

export const Pagination: FC<PaginationProps> = memo(
  ({
    className,
    currentPage,
    onSetPageChange,
    onSetPageSizeChange,
    pageSize,
    siblingCount,
    totalCount = 10,
  }) => {
    const paginationRange = usePagination({
      currentPage,
      pageSize,
      siblingCount,
      totalCount,
    })

    if (currentPage === 0 || paginationRange.length < 2) {
      return null
    }

    return (
      <div className={clsx(s.root, className)}>
        <NavigationBlock
          currentPage={currentPage}
          onSetPageChange={onSetPageChange}
          paginationRange={paginationRange}
        />
        <div className={s.selectBlock}>
          <Typography variant={'body2'}>Show</Typography>
          <PageSizeSelect onPageSizeChange={onSetPageSizeChange} pageSize={pageSize} />
          <Typography className={s.ps} variant={'body2'}>
            on the page
          </Typography>
        </div>
      </div>
    )
  }
)
