import { FC, memo } from 'react'

import { NavigationBlock } from '@/shared/ui/pagination/navigation-block/navigation-block'
import { PageSizeSelect } from '@/shared/ui/pagination/page-size-select/page-size-select'
import { usePagination } from '@/shared/ui/pagination/usePagination'
import { Typography } from '@/shared/ui/typography'
import { clsx } from 'clsx'

import s from './pagination.module.scss'

export type PaginationProps = {
    className?: string // Дополнительные классы для стилизации
    currentPage: number // Текущая страница
    onPageChange: (newPage: number) => void // Колбэк при изменении страницы
    onPageSizeChange: (newPageSize: number) => void // Колбэк при изменении размера страницы: newPageSize
    pageSize: number // Размер страницы (количество элементов на странице)
    siblingCount?: number // Количество "соседних" кнопок для отображения в пагинации
    totalCount?: number // Общее количество элементов
}
/**
 * Pagination:
 * Использует хук usePagination - для генерации массива, представляющего диапазон страниц для отображения.
 * Отображает компонент NavigationBlock для кнопок навигации и блока выбора размера страницы.
 */
export const Pagination: FC<PaginationProps> = memo(
    ({
        className,
        currentPage,
        onPageChange,
        onPageSizeChange,
        pageSize,
        siblingCount,
        totalCount = 10,
    }) => {
        // usePagination - для генерации массива, страниц пагинации на экране
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
                {/* блок с кнопками навигации */}
                <NavigationBlock
                    currentPage={currentPage}
                    onPageChange={onPageChange}
                    paginationRange={paginationRange}
                />
                <div className={s.selectBlock}>
                    <Typography variant={'body2'}>Show</Typography>
                    <PageSizeSelect onPageSizeChange={onPageSizeChange} pageSize={pageSize} />
                    <Typography variant={'body2'}>on the page</Typography>
                </div>
            </div>
        )
    }
)
