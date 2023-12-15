import { ComponentPropsWithoutRef, ElementRef, ElementType, ForwardedRef, forwardRef } from 'react'

import { clsx } from 'clsx'

import s from './typography.module.scss'

import { TypographyVariantType } from '../typograpfy/types'

// types
export type TypographyProps<T extends ElementType> = {
    as?: T
    className?: string
    variant?: TypographyVariantType
} & ComponentPropsWithoutRef<T>

// Polymorph component
const TypographyPolymorph = <T extends ElementType = 'p'>(
    props: TypographyProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TypographyProps<T>>,
    ref: ForwardedRef<any>
) => {
    const { as: Component = 'p', className, variant = 'p', ...rest } = props

    const TypographyClassName = clsx(s[variant], className)

    return <Component className={TypographyClassName} ref={ref} {...rest} />
}

// component
export const Typography = forwardRef(TypographyPolymorph) as <T extends ElementType = 'p'>(
    props: TypographyProps<T> &
        Omit<ComponentPropsWithoutRef<T>, keyof TypographyProps<T>> & {
            ref?: ForwardedRef<ElementRef<T>>
        }
) => ReturnType<typeof TypographyPolymorph>
