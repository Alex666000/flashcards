import { ComponentPropsWithoutRef, ElementRef, ElementType, ForwardedRef, forwardRef } from 'react'

import { clsx } from 'clsx'

import s from './button.module.scss'

export const ButtonVariant = ['primary', 'secondary', 'tertiary', 'link'] as const

// types
export type ButtonProps<T extends ElementType = 'button'> = {
    as?: T // Любой компонент или тэг
    className?: string
    fullWidth?: boolean
    variant?: (typeof ButtonVariant)[number]
} & ComponentPropsWithoutRef<T>

// Polymorph component
const ButtonPolymorph = <T extends ElementType = 'button'>(
    props: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>,
    ref: ForwardedRef<any>
) => {
    const { as: Component = 'button', className, fullWidth, variant = 'primary', ...rest } = props

    const ButtonClassName = clsx(s.button, s[variant], fullWidth && s.fullWidth, className)

    return <Component className={ButtonClassName} ref={ref} {...rest} />
}

// Первый параметр props - потом ref
export const Button = forwardRef(ButtonPolymorph) as <T extends ElementType = 'button'>(
    props: ButtonProps<T> &
        Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>> & {
            ref?: ForwardedRef<ElementRef<T>>
        }
) => ReturnType<typeof ButtonPolymorph>

/*
- as const применяется к массиву строк ['primary', 'secondary', 'tertiary', 'link'] и означает,
что каждый элемент этого массива будет иметь конкретный строковый литеральный тип, а не обобщенный тип строки.
- classNames: для склеивания классов: s - объект, к нему по ключу можем получить доступ: s[variant], вместо вариант какой класс будет, к примеру
s.primary, если нет класса то пустая строка,

const ButtonClassName = clsx(clsx(s.button, s[variant], fullWidth && s.fullWidth, className)): обязательный главный класс,
или так: clsx(s.button, className, {
        [s.fullWidth]: fullWidth,
        [s[variant]]: true,
      })

1 вариант: импортируем библу - вызываем функцию: const classNames = clsx(s.variant, className, fullWidth && s.fullWidth)
2 вариант: const classNames = clsx(s.variant, className, { [s.fullWidth]: fullWidth}) -- если значение будет true то класс применится
 */
