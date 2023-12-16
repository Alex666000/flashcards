import {
    ComponentPropsWithoutRef,
    ElementRef,
    ElementType,
    ForwardedRef,
    ReactNode,
    forwardRef,
} from 'react'

import cls from './button.module.scss'

import { Mods, classNames } from '../../lib/classNames/classNames'

export const ButtonVariant = [
    'primary',
    'secondary',
    'tertiary',
    'link',
    'clear',
    'outline',
] as const

export type ButtonSize = 'l' | 'm' | 'xl'
export type ButtonColor = 'error' | 'normal' | 'success'

// props types
export type ButtonProps<T extends ElementType = 'button'> = {
    as?: T // Любой компонент или тэг
    children?: ReactNode
    className?: string
    color?: ButtonColor
    fullWidth?: boolean
    size?: ButtonSize
    variant?: (typeof ButtonVariant)[number]
} & ComponentPropsWithoutRef<T>

// Polymorph component
const ButtonPolymorph = <T extends ElementType = 'button'>(
    props: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>,
    ref: ForwardedRef<any>
) => {
    const {
        as: Component = 'button',
        className,
        color = 'normal',
        fullWidth,
        size = 'm',
        variant = 'primary',
        ...rest
    } = props

    // props-классы по условию - когда Boolean
    const mods: Mods = {
        [cls.fullWidth]: fullWidth,
    }

    // additional классы - не по условию, а просто пропсы с разными значениями
    const buttonClasses = [className, cls[variant], cls[size], cls[color]]

    return <Component className={classNames(cls.button, mods, buttonClasses)} ref={ref} {...rest} />
}

// Первый параметр props - потом ref
export const Button = forwardRef(ButtonPolymorph) as <T extends ElementType = 'button'>(
    props: ButtonProps<T> &
        Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>> & {
            ref?: ForwardedRef<ElementRef<T>>
        }
) => ReturnType<typeof ButtonPolymorph>

/*
clsx:
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
