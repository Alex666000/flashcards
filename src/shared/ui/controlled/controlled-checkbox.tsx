import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Checkbox } from '@/shared/ui/checkbox/checkbox'

import { CheckboxProps } from '../checkbox/checkbox'

export type Props<T extends FieldValues> = UseControllerProps<T> &
    Omit<CheckboxProps, 'checked' | 'id' | 'onChange' | 'value'> & {
        // убираем дублирующиеся пропсы
        label?: string
    }

export const ControlledCheckbox = <T extends FieldValues>({
    control,
    defaultValue,
    name,
    rules,
    shouldUnregister,
    ...checkboxProps
}: Props<T>) => {
    const {
        field: { onChange, value },
    } = useController({
        control,
        defaultValue,
        name,
        rules,
        shouldUnregister,
    })

    return <Checkbox checked={value} onValueChange={onChange} {...checkboxProps} />
}
