import {
    ComponentPropsWithoutRef,
    ElementRef,
    ElementType,
    ForwardedRef,
    ReactNode,
    forwardRef,
} from 'react'

import { InferType } from '@/shared/types/infer-element-type'

import s from './card.module.scss'

import { classNames } from '../../lib/classNames/classNames'

export type CardPadding = '0' | '8' | '16' | '24'
export type CardBorder = 'normal' | 'partial' | 'round'

const mapPaddingToClass: Record<CardPadding, string> = {
    '0': 'gap_0',
    '8': 'gap_8',
    '16': 'gap_16',
    '24': 'gap_24',
}

type Props<T extends ElementType> = {
    as?: T // Любой компонент или тэг
    border?: CardBorder
    children?: ReactNode
    className?: string
    contentClassName?: string
    fullWidth?: boolean
    iconComponent?: ReactNode
    max?: boolean
    padding?: CardPadding
    title?: string
    variant?: 'info' | 'primary'
}

// Polymorph component
export const CardPolymorph = <T extends ElementType = 'div'>(
    props: Props<T>,
    ref: ForwardedRef<InferType<T>>
) => {
    const {
        as: Component = 'div',
        border = 'normal',
        children,
        className,
        contentClassName,
        fullWidth,
        iconComponent,
        padding = '8',
        title,
        variant = 'primary',
        ...rest
    } = props
    const isInfo = variant === 'info'
    const paddingClass = mapPaddingToClass[padding]

    const classes = {
        box: classNames(s.box, { [s.fullWidth]: fullWidth, [s.info]: isInfo }, [
            className,
            s[paddingClass],
        ]),
        content: classNames(s.content, {}, [className, contentClassName]),
        icon: s.icon,
        title: s.title,
    }

    return (
        <Component className={classes.box} ref={ref} {...rest}>
            {title && (
                <h3 className={classes.title}>
                    {iconComponent}
                    {title}
                </h3>
            )}
            <div className={classes.content} ref={ref}>
                {children}
            </div>
        </Component>
    )
}

// Первый параметр props - потом ref
export const Card = forwardRef(CardPolymorph) as <T extends ElementType = 'button'>(
    props: Props<T> &
        Omit<ComponentPropsWithoutRef<T>, keyof Props<T>> & {
            ref?: ForwardedRef<ElementRef<T>>
        }
) => ReturnType<typeof CardPolymorph>
