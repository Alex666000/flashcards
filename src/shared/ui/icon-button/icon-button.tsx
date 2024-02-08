import { ComponentPropsWithoutRef, ComponentRef, ReactNode, forwardRef } from 'react'

import { clsx } from 'clsx'

import s from './icon-button.module.scss'

export type IconButtonProps = {
  icon: ReactNode
  small?: boolean // Флаг, указывающий, следует ли использовать маленький размер кнопки
} & Omit<ComponentPropsWithoutRef<'button'>, 'children'>

/**
 - IconButton, предназначенный для отображения кнопки с иконкой
 */
export const IconButton = forwardRef<ComponentRef<'button'>, IconButtonProps>(
  ({ className, icon, small, ...props }, ref) => {
    const classes = clsx(s.button, small && s.small, className)

    return (
      <button ref={ref} {...props} className={classes}>
        {icon}
      </button>
    )
  }
)
