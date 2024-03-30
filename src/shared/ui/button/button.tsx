import {
  ComponentPropsWithoutRef,
  ElementRef,
  ElementType,
  ForwardedRef,
  ReactNode,
  forwardRef,
} from 'react'

import { Mods, classNames } from '@/shared/lib/classNames-lib/classNames'
import { InferType } from '@/shared/types/infer-element.type'

import s from './button.module.scss'

export const ButtonVariant = [
  'primary',
  'secondary',
  'tertiary',
  'link',
  'clear',
  'outline',
] as const

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  children?: ReactNode
  className?: string
  color?: 'error' | 'normal' | 'success'
  disabled?: boolean
  fullWidth?: boolean
  size?: 'l' | 'm' | 'xl'
  variant?: (typeof ButtonVariant)[number]
} & ComponentPropsWithoutRef<T>

const ButtonPolymorph = <T extends ElementType = 'button'>(
  props: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>,
  ref: ForwardedRef<InferType<T>>
) => {
  const {
    as: Component = 'button',
    children,
    className,
    color = 'normal',
    disabled,
    fullWidth,
    size = 'm',
    variant = 'primary',
    ...buttonRestProps
  } = props

  const mods: Mods = {
    [s.fullWidth]: fullWidth,
  }

  const additionalClasses = [className, s[variant], s[size], s[color]]

  return (
    <Component
      className={classNames(s.button, mods, additionalClasses)}
      disabled={disabled}
      ref={ref}
      {...buttonRestProps}
    >
      {children}
    </Component>
  )
}

export const Button = forwardRef(ButtonPolymorph) as <T extends ElementType = 'button'>(
  props: ButtonProps<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>> & {
      ref?: ForwardedRef<ElementRef<T>>
    }
) => ReturnType<typeof ButtonPolymorph>
