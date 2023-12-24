import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Checkbox } from '@/shared/ui/checkbox/checkbox'

import { CheckboxProps } from '../checkbox/checkbox'

export type Props<T extends FieldValues> = Omit<
    UseControllerProps<T>,
    'defaultValue' | 'disabled' | 'rules'
> &
    Omit<CheckboxProps, 'checked' | 'id' | 'onValueChange'>

export const ControlledCheckbox = <T extends FieldValues>({
    control,
    disabled,
    name,
    shouldUnregister,
    ...checkboxProps
}: Props<T>) => {
    const {
        field: { onChange, value },
    } = useController({
        control,
        name,
        shouldUnregister,
    })

    return (
        <Checkbox
            checked={value}
            disabled={disabled}
            id={name}
            onValueChange={onChange}
            {...checkboxProps}
        />
    )
}

/*
- Omit - убираем дублирующиеся пропсы: чтобы они не дуюлировались в UseControllerProps и CheckboxProps
а были один раз например чтобы disabled дважды не встретился
 */
