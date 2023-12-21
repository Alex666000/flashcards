import { ComponentProps, FC, ReactNode, memo } from 'react'

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

type CommonProps = {
    border?: CardBorder
    children: ReactNode
    contentClassName?: string
    fullWidth?: boolean
    max?: boolean
    padding?: CardPadding
} & ComponentProps<'div'>

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

export type CardProps = CommonProps & ConditionalProps

export const Card: FC<CardProps> = memo(
    ({
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
    }) => {
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
            <div className={classes.box} {...rest}>
                {title && (
                    <h3 className={classes.title}>
                        {iconComponent}
                        {title}
                    </h3>
                )}
                <div className={classes.content}>{children}</div>
            </div>
        )
    }
)
