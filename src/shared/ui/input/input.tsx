import { ChangeEvent, ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import getClassNames, { ClassesObj } from '@/shared/helpers/get-class-names'
import { Typography } from '@/shared/ui/typography'
import { clsx } from 'clsx'

import s from './input.module.scss'

export type InputSlot = 'input' | 'root'
export type InputSlotModifier = 'disabled' | 'error'
export type InputClasses = ClassesObj<InputSlot, InputSlotModifier>

type InputAdornmentProps = {
    children?: ReactNode
    position: 'end' | 'start'
} & ComponentPropsWithoutRef<'div'>

type OwnProps = {
    classes?: InputClasses
    disabled?: boolean
    endAdornment?: ReactNode // позиция children-а
    error?: boolean
    label?: string
    onEnter?: ComponentPropsWithoutRef<'input'>['onKeyDown']
    onValueChange?: (value: string) => void
    startAdornment?: ReactNode // позиция children-а
    type?: 'password' | 'search' | 'text'
}

export type InputProps = OwnProps &
    Omit<ComponentPropsWithoutRef<'input'>, 'className' | keyof OwnProps>

export const Input = forwardRef<ElementRef<'input'>, InputProps>((props, ref) => {
    const {
        classes,
        disabled,
        endAdornment,
        error,
        label,
        onChange,
        onEnter,
        onKeyDown,
        onValueChange,
        startAdornment,
        type,
        ...restProps
    } = props
    const cls = getClassNames(['root', 'input'] as InputSlot[], { disabled, error })(s, classes)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e)
        onValueChange?.(e.target.value)
    }
    const classNames = {
        label: clsx(s.label, props.disabled && s.disabledText),
    }

    return (
        <div className={cls.root}>
            {label && (
                <Typography as={'label'} className={classNames.label} variant={'body2'}>
                    {label}
                </Typography>
            )}
            {!!error && (
                <Typography as={'span'} variant={'error'}>
                    {error}
                </Typography>
            )}
            {startAdornment && startAdornment} {/* позиция children-а */}
            <input
                className={cls.input}
                disabled={disabled}
                onChange={handleChange}
                ref={ref}
                {...restProps}
            />
            {endAdornment && endAdornment}
        </div>
    )
})

export const InputAdornment = forwardRef<ElementRef<'div'>, InputAdornmentProps>(
    ({ children, className, position, ...props }, ref) => {
        return (
            <div className={clsx(s[`${position}Adornment`], className)} ref={ref} {...props}>
                {children}
            </div>
        )
    }
)
