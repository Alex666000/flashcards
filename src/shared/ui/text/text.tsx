import { memo } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'

import s from './text.module.scss'

export type TextVariant = 'accent' | 'error' | 'primary'

export type TextAlign = 'center' | 'left' | 'right'

export type TextSize = 'l' | 'm' | 's'

interface TextProps {
    align?: TextAlign
    bold?: boolean
    className?: string
    'data-testid'?: string
    size?: TextSize
    text?: string
    title?: string
    variant?: TextVariant
}

type HeaderTagType = 'h1' | 'h2' | 'h3'

const mapSizeToClass: Record<TextSize, string> = {
    l: s.size_l,
    m: s.size_m,
    s: s.size_s,
}

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
    l: 'h1',
    m: 'h2',
    s: 'h3',
}

export const Text = memo((props: TextProps) => {
    const {
        align = 'left',
        bold,
        className,
        'data-testid': dataTestId = 'Text',
        size = 'm',
        text,
        title,
        variant = 'primary',
    } = props

    const HeaderTag = mapSizeToHeaderTag[size]
    const sizeClass = mapSizeToClass[size]

    const additionalClasses = [className, s[variant], s[align], sizeClass]

    return (
        <div className={classNames(s.Text, { [s.bold]: bold }, additionalClasses)}>
            {title && (
                <HeaderTag className={s.title} data-testid={`${dataTestId}.Header`}>
                    {title}
                </HeaderTag>
            )}
            {text && (
                <p className={s.text} data-testid={`${dataTestId}.Paragraph`}>
                    {text}
                </p>
            )}
        </div>
    )
})
