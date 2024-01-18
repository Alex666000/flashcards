import { FC } from 'react'

import { NavigateButton } from '@/shared/ui/pagination/navigate-button/navigate-button'

import s from '../pagination.module.scss'

import { PaginationProps } from '../pagination'

type Props = {
    // Массив, представляющий диапазон страниц для отображения
    paginationRange: (number | string)[]
} & Pick<PaginationProps, 'currentPage' | 'onPageChange'> // onPageChange- Функция обратного вызова при изменении страницы

/**
 * NavigationBlock:
 * Отображает кнопки навигации (предыдущая, следующая) и числовые кнопки страниц.
 * Использует компонент NavigateButton для создания кнопок навигации.
 */
export const NavigationBlock: FC<Props> = ({ currentPage, onPageChange, paginationRange }) => {
    return (
        // кнопки навигации (предыдущая)
        <div className={s.buttons}>
            <NavigateButton
                active={false}
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                {'❮'}
            </NavigateButton>

            {/*данный участок кода отвечает за создание компонентов "КНОПОК СТРАНИЦ И МНОГОТОЧИЯ"*/}
            {/*НАВИГАЦИИ, а также за обработку событий клика по этим кнопкам*/}
            {paginationRange.map((btn, index) => {
                const onPageClick = (btn: number) => () => {
                    onPageChange(btn)
                }

                if (typeof btn !== 'number') {
                    return (
                        <div className={s.dots} key={index}>
                            ...
                        </div>
                    )
                }

                return (
                    <NavigateButton
                        active={btn === currentPage}
                        key={index}
                        onClick={onPageClick(btn)}
                    >
                        {btn}
                    </NavigateButton>
                )
            })}
            {/* кнопки навигации (следующая) */}
            <NavigateButton
                active={false}
                disabled={currentPage === paginationRange[paginationRange.length - 1]}
                onClick={() => onPageChange(currentPage + 1)}
            >
                {'❯'}
            </NavigateButton>
        </div>
    )
}
