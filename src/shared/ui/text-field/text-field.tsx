import { ElementRef, forwardRef, useId } from 'react'

import getClassNames, { ClassesObj } from '@/shared/helpers/get-class-names'
import { Input, InputProps, InputSlot, InputSlotModifier } from '@/shared/ui/input'
import { Typography } from '@/shared/ui/typography'

import s from './text-field.module.scss'

export type TextFieldSlot = 'label' | 'message' | 'textFieldRoot' | InputSlot
export type TextFieldClasses = ClassesObj<TextFieldSlot, InputSlotModifier>

type OwnProps = {
    classes?: TextFieldClasses
    label?: string
    message?: string
}

export type TextFieldProps = OwnProps & Omit<InputProps, keyof OwnProps>

const textFieldSlots: TextFieldSlot[] = ['textFieldRoot', 'label', 'message', 'root', 'input']

export const TextField = forwardRef<ElementRef<'input'>, TextFieldProps>(
    ({ classes, disabled, error, label, message, ...props }, ref) => {
        const id = useId()
        const cls = getClassNames(textFieldSlots, { disabled, error })(s, classes)

        return (
            <div className={cls.textFieldRoot}>
                {label && (
                    <Typography as={'label'} className={cls.label} htmlFor={id} variant={'body2'}>
                        {label}
                    </Typography>
                )}
                <Input
                    classes={cls}
                    disabled={disabled}
                    error={error}
                    id={id}
                    ref={ref}
                    {...props}
                />
                {message && (
                    <Typography as={'span'} className={cls.message} variant={'caption'}>
                        {message}
                    </Typography>
                )}
            </div>
        )
    }
)
