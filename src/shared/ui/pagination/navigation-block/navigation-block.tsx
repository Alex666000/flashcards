import { FC } from 'react'

import { NavigateButton } from '@/shared/ui/pagination/navigate-button/navigate-button'

import s from '../pagination.module.scss'

import { PaginationProps } from '../pagination'

type Props = {
  paginationRange: (number | string)[]
} & Pick<PaginationProps, 'currentPage' | 'onSetPageChange'> // onPageChange- Функция обратного вызова при изменении страницы

export const NavigationBlock: FC<Props> = ({ currentPage, onSetPageChange, paginationRange }) => {
  return (
    <div className={s.buttons}>
      <NavigateButton
        active={false}
        disabled={currentPage === 1}
        onClick={() => onSetPageChange(currentPage - 1)}
      >
        {'❮'}
      </NavigateButton>
      {paginationRange.map((btn, index) => {
        const onPageClick = (btn: number) => () => {
          onSetPageChange(btn)
        }

        if (typeof btn !== 'number') {
          return (
            <div className={s.dots} key={index}>
              ...
            </div>
          )
        }

        return (
          <NavigateButton active={btn === currentPage} key={index} onClick={onPageClick(btn)}>
            {btn}
          </NavigateButton>
        )
      })}
      <NavigateButton
        active={false}
        disabled={currentPage === paginationRange[paginationRange.length - 1]}
        onClick={() => onSetPageChange(currentPage + 1)}
      >
        {'❯'}
      </NavigateButton>
    </div>
  )
}
