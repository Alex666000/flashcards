import { ComponentPropsWithoutRef, ElementType } from 'react'

import s from './button.module.scss'

export const ButtonVariant = ['primary', 'secondary', 'tertiary', 'link'] as const

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T // Тут любой компонент или тэг
  className?: string
  fullWidth?: boolean
  variant?: (typeof ButtonVariant)[number]
} & ComponentPropsWithoutRef<T>

export const Button = <T extends ElementType = 'button'>(props: ButtonProps<T>) => {
  const { as: Component = 'button', className, fullWidth, variant = 'primary', ...rest } = props

  return (
    <Component className={`${s[variant]} ${fullWidth ? s.fullWidth : ''} ${className}`} {...rest} />
  )
}

/*
- as const применяется к массиву строк ['primary', 'secondary', 'tertiary', 'link'] и означает,
что каждый элемент этого массива будет иметь конкретный строковый литеральный тип,а не обобщенный тип строки.
 */
