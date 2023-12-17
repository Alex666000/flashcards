import {
    ComponentPropsWithoutRef,
    ElementRef,
    ElementType,
    ForwardedRef,
    ReactNode,
    forwardRef,
} from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './card.module.scss'

export type CardVariant = 'light' | 'normal' | 'outlined'
export type CardBorder = 'partial' | 'round' | 'standard'
export type CardPadding = '0' | '8' | '16' | '24'

const mapPaddingToClass: Record<CardPadding, string> = {
    '0': 'padding_0',
    '8': 'padding_8',
    '16': 'padding_16',
    '24': 'padding_24',
}

// props types
export type CardProps<T extends ElementType = 'div'> = {
    as?: T // Любой компонент или тэг
    border?: CardBorder
    children: ReactNode
    className?: string
    fullHeight?: boolean
    fullWidth?: boolean
    padding?: CardPadding
    variant?: CardVariant
} & ComponentPropsWithoutRef<T>

// Polymorph component
const CardPolymorph = <T extends ElementType = 'div'>(
    props: CardProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof CardProps<T>>,
    ref: ForwardedRef<any>
) => {
    const {
        as: Component = 'div',
        border = 'standard',
        children,
        className,
        fullHeight,
        fullWidth,
        padding = '8',
        variant = 'normal',
        ...rest
    } = props

    const paddingClass = mapPaddingToClass[padding]

    return (
        <Component
            className={classNames(
                cls.card,
                {
                    [cls.fullHeight]: fullHeight,
                    [cls.fullWidth]: fullWidth,
                },
                [className, cls[variant], cls[paddingClass], cls[border]]
            )}
            ref={ref}
            {...rest}
        >
            {children}
        </Component>
    )
}

// Первый параметр props - потом ref
export const Card = forwardRef(CardPolymorph) as <T extends ElementType = 'div'>(
    props: CardProps<T> &
        Omit<ComponentPropsWithoutRef<T>, keyof CardProps<T>> & {
            ref?: ForwardedRef<ElementRef<T>>
        }
) => ReturnType<typeof Polymorph>
