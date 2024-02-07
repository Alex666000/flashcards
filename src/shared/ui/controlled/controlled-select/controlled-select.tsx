import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Select, SelectProps } from '@/components'

type ControlledSelectProps<T extends FieldValues> = UseControllerProps<T> &
    Omit<SelectProps, 'onValueChange' | 'value'>

export const ControlledSelect = <T extends FieldValues>({
    control,
    name,
    ...restProps
}: ControlledSelectProps<T>): JSX.Element => {
    const {
        field: { onChange, value },
    } = useController({
        control,
        name,
    })

    return <Select {...restProps} onValueChange={onChange} value={value} />
}
