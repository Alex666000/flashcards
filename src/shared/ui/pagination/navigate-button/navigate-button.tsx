import { ComponentPropsWithoutRef, FC } from 'react'

import { clsx } from 'clsx'

import s from './navigate-button.module.scss'

type Props = {
  active: boolean
} & ComponentPropsWithoutRef<'button'>

/**
 * NavigateButton: представляет собой кнопку для навигации в пагинации.
 * Пропсы:
 * active: Флаг активности кнопки.
 * disabled: Флаг, указывающий, отключена ли кнопка.
 * onClick: Функция обратного вызова при нажатии на кнопку.
 * Основной функционал:
 * Отображает символ стрелки или номер страницы в зависимости от типа кнопки.
 * Передает функцию обратного вызова onClick для обработки события нажатия.
 */
export const NavigateButton: FC<Props> = ({ active, children, className, ...rest }) => {
  const classes = clsx(s.button, active && s.active, className)

  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  )
}
