import { ComponentProps, ComponentPropsWithoutRef, ElementRef, FC, forwardRef } from 'react'

import { Typography } from '@/shared/ui/typography'
import { clsx } from 'clsx'

import s from './table.module.scss'

// Таблица - кастомный -- не Радикс компонент
export const Table = forwardRef<HTMLTableElement, ComponentPropsWithoutRef<'table'>>(
    ({ className, ...rest }, ref) => {
        return <table className={clsx(s.table, className)} {...rest} ref={ref} />
    }
)

// Шапка таблицы
export const TableHead = forwardRef<ElementRef<'thead'>, ComponentPropsWithoutRef<'thead'>>(
    ({ ...rest }, ref) => {
        return <thead {...rest} ref={ref} />
    }
)

// Ряды - колонки
export const TableRow = forwardRef<ElementRef<'tr'>, ComponentPropsWithoutRef<'tr'>>(
    ({ ...rest }, ref) => {
        return <tr {...rest} ref={ref} />
    }
)

// Основная инфа таблицы - data по которым мапинся...
export const TableBody = forwardRef<ElementRef<'tbody'>, ComponentPropsWithoutRef<'tbody'>>(
    ({ ...rest }, ref) => {
        return <tbody {...rest} ref={ref} />
    }
)

// Названия рядов (колонок)
export const TableHeadCell = forwardRef<ElementRef<'th'>, ComponentPropsWithoutRef<'th'>>(
    ({ children, className, ...rest }, ref) => {
        return (
            <th className={clsx(className, s.headCell)} {...rest} ref={ref}>
                <span>{children}</span>
            </th>
        )
    }
)

// Ячейка в строках - Сюда выводится информация из таблицы в своих рядах
export const TableCell = forwardRef<ElementRef<'td'>, ComponentPropsWithoutRef<'td'>>(
    ({ className, ...rest }, ref) => {
        return <td className={clsx(className, s.tableCell)} {...rest} ref={ref} />
    }
)

export const TableEmpty: FC<ComponentProps<'div'> & { mb?: string; mt?: string }> = ({
    className,
    mb,
    mt = '89px',
}) => {
    return (
        <Typography
            className={clsx(className, s.empty)}
            style={{ marginBottom: mb, marginTop: mt }}
            variant={'h2'}
        >
            Пока тут еще нет данных! :(
        </Typography>
    )
}
export type Column = {
    key: string
    sortable?: boolean
    title: string
}
export type Sort = {
    direction: 'asc' | 'desc'
    key: string
} | null

export const TableHeader: FC<
    Omit<
        ComponentPropsWithoutRef<'thead'> & {
            columns: Column[]
            onSort?: (sort: Sort) => void
            sort?: Sort
        },
        'children'
    >
> = ({ columns, onSort, sort, ...restProps }) => {
    const handleSort = (key: string, sortable?: boolean) => () => {
        if (!onSort || !sortable) {
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
        <TableHead {...restProps}>
            <TableRow>
                {columns.map(({ key, sortable = true, title }) => (
                    <TableHeadCell key={key} onClick={handleSort(key, sortable)}>
                        {title}
                        {sort && sort.key === key && (
                            <span>{sort.direction === 'asc' ? '▲' : '▼'}</span>
                        )}
                    </TableHeadCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

/*
 <Table>
                <TableHead>
                    <TableRow>
                        <TableHeadCell>Name</TableHeadCell>
                        <TableHeadCell>Cards</TableHeadCell>
                        <TableHeadCell>Last Updated</TableHeadCell>
                        <TableHeadCell>Created by</TableHeadCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.items.map((deck) => {
                        return (
                            <TableRow key={deck.id}>
                                <TableCell>{deck?.name}</TableCell>
                                <TableCell>{deck?.cardsCount}</TableCell>
                                <TableCell>
                                    {new Date(deck?.updated).toLocaleDateString()}
                                </TableCell>
                                <TableCell>{deck?.author?.name}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
 */
