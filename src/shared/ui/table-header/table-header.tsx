import { ComponentPropsWithoutRef, FC } from 'react'

import { Icon } from '@/shared/ui/icon'
import { clsx } from 'clsx'

import s from './table-header.module.scss'

import { Table } from '../table'

export type Column = {
  key: string
  sortable?: boolean
  title: string
}

export type Sort = {
  direction: 'asc' | 'desc'
  key: string
} | null

export type TableHeaderProps = Omit<
  ComponentPropsWithoutRef<'thead'> & {
    columns: Column[]
    onSort?: (sort: Sort) => void
    sort?: Sort
  },
  'children'
>

// шапка таблицы - серая.. в ней сортировка
export const TableHeader: FC<TableHeaderProps> = ({ columns, onSort, sort, ...restProps }) => {
  const handleSort = (key: string, sortable?: boolean) => () => {
    if (!onSort || sortable === false) {
      return
    }

    if (sort?.key !== key) {
      return onSort({ direction: 'asc', key })
    }
    if (sort.direction === 'desc') {
      return onSort(null)
    }

    return onSort({
      direction: sort?.direction === 'asc' ? 'desc' : 'asc',
      key,
    })
  }

  return (
    <Table.Head {...restProps}>
      <Table.Row>
        {columns.map(({ key, sortable, title }) => {
          const sortTerms = sort && sort.key === key

          return (
            <Table.HeadCell
              className={clsx(!(sortable === false) && s.hover)}
              key={key}
              onClick={handleSort(key, sortable)}
            >
              {title}
              {sortTerms && (
                <Icon
                  className={clsx(s.icon, sortTerms && sort.direction === 'desc' && s.down)}
                  name={'arrowDown'}
                />
              )}
            </Table.HeadCell>
          )
        })}
      </Table.Row>
    </Table.Head>
  )
}
