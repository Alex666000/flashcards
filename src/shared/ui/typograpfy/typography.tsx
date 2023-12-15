import {
    ComponentPropsWithoutRef,
    ElementRef,
    ElementType,
    ForwardedRef,
    ReactNode,
    forwardRef,
} from 'react'

import { clsx } from 'clsx'

import s from './typography.module.scss'

import { VariantUnionType } from './types'

// types
export type TypographyProps<T extends ElementType> = {
    // as: нужен для переопределения тэга: напишу к примеру as='a' с variant='h3'
    // тэг будет - как ссылка со стилями h3 из макета - т.е выглядеть как h3, но по факту ссылка 'a'
    as?: T
    children?: ReactNode
    className?: string
    // если as передан то variant не нужен - вместе не применять!
    variant?: VariantUnionType
} & ComponentPropsWithoutRef<T>

// Polymorph component
const TypographyPolymorph = <T extends ElementType = 'p'>(
    props: TypographyProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TypographyProps<T>>,
    ref: ForwardedRef<any>
) => {
    const { as: Component = 'p', className, variant = 'body1', ...rest } = props

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
