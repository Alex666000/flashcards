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

type OwnProps<T extends ElementType> = {
    as?: T // Любой компонент или тэг
    border?: CardBorder
    children: ReactNode
    className?: string
    contentClassName?: string
    fullWidth?: boolean
    max?: boolean
    padding?: CardPadding
}

// Для иконок в карточке
type ConditionalProps =
    | {
          iconComponent?: ReactNode
          title?: string
          variant?: 'primary'
      }
    | {
          iconComponent?: never
          title?: never
          variant?: 'info'
      }

// props types
export type CardProps<T extends ElementType> = OwnProps<T> &
    ConditionalProps &
    Omit<ComponentPropsWithoutRef<T>, keyof OwnProps<T>>

// Polymorph component
export const CardPolymorph = <T extends ElementType = 'div'>(
    props: CardProps<T>,
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
        ...cardProps
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
        <Component className={classes.box} ref={ref} {...cardProps}>
            {title && (
                <h3 className={classes.title}>
                    {iconComponent}
                    {title}
                </h3>
            )}
            <div className={classes.content}>{children}</div>
        </Component>
    )
}

// Первый параметр props - потом ref
export const Card = forwardRef(CardPolymorph) as <T extends ElementType = 'button'>(
    props: CardProps<T> &
        Omit<ComponentPropsWithoutRef<T>, keyof CardProps<T>> & {
            ref?: ForwardedRef<ElementRef<T>>
        }
) => ReturnType<typeof CardPolymorph>
