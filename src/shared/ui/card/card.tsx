import { HTMLAttributes, ReactNode, memo } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './card.module.scss'

export type CardVariant = 'light' | 'normal' | 'outlined'
export type CardPadding = '0' | '8' | '16' | '24'
export type CardBorder = 'partial' | 'round' | 'standard'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    border?: CardBorder
    children: ReactNode
    className?: string
    fullHeight?: boolean
    fullWidth?: boolean
    padding?: CardPadding
    variant?: CardVariant
}

const mapPaddingToClass: Record<CardPadding, string> = {
    '0': 'padding_0',
    '8': 'padding_8',
    '16': 'padding_16',
    '24': 'padding_24',
}

export const Card = memo((props: CardProps) => {
    const {
        border = 'standard',
        children,
        className,
        fullHeight,
        fullWidth,
        padding = '8',
        variant = 'normal',
        ...otherProps
    } = props

    const paddingClass = mapPaddingToClass[padding]

    return (
        <div
            className={classNames(
                cls.card,
                {
                    [cls.fullHeight]: fullHeight,
                    [cls.fullWidth]: fullWidth,
                },
                [className, cls[variant], cls[paddingClass], cls[border]]
            )}
            {...otherProps}
        >
            {children}
        </div>
    )
})
