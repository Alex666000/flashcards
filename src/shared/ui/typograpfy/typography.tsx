import {
    ComponentPropsWithoutRef,
    ElementRef,
    ElementType,
    ForwardedRef,
    ReactNode,
    forwardRef,
} from 'react'

import cls from './typography.module.scss'

import { TextVarint } from '.'
import { classNames } from '../../lib/classNames/classNames'

export type TextAlign = 'center' | 'left' | 'right'

// props types
export type TypographyProps<T extends ElementType> = {
    // as: нужен для переопределения тэга: напишу к примеру as='a' с variant='h3'
    align?: TextAlign
    // тэг будет - как ссылка со стилями h3 из макета - т.е выглядеть как h3, но по факту ссылка 'a'
    as?: T
    children?: ReactNode
    className?: string
    // если as передан то variant не нужен - вместе не применять!
    variant?: TextVarint
} & ComponentPropsWithoutRef<T>

// Polymorph component
const TypographyPolymorph = <T extends ElementType = 'p'>(
    props: TypographyProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TypographyProps<T>>,
    ref: ForwardedRef<any>
) => {
    const {
        align = 'left',
        as: Component = 'p',
        children,
        className,
        variant = 'body1',
        ...rest
    } = props

    return (
        <Component
            className={classNames('', {}, [className, cls[variant], cls[align]])}
            ref={ref}
            {...rest}
        >
            {children}
        </Component>
    )
}

// Component
export const Typography = forwardRef(TypographyPolymorph) as <T extends ElementType = 'p'>(
    props: TypographyProps<T> &
        Omit<ComponentPropsWithoutRef<T>, keyof TypographyProps<T>> & {
            ref?: ForwardedRef<ElementRef<T>>
        }
) => ReturnType<typeof TypographyPolymorph>
