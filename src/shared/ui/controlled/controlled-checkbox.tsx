import {
    Control,
    FieldValue,
    FieldValues,
    UseControllerProps,
    useController,
} from 'react-hook-form'

import { Checkbox } from '@/shared/ui/checkbox/checkbox'
import { CheckboxProps } from '@radix-ui/react-checkbox'

export type ControlledCheckboxProps = Omit<
    UseControllerProps<T, 'defaultValue' | 'disabled' | 'rules'>
> &
    СheckboxProps & {
        label: string
    }

// ControlledCheckbox - обертка
export const ControlledCheckbox = <T extends FieldValues>({
    control,
    name,
    shouldUnregister,
    ...rest
}: Props<T>) => {
    const {
        field: { onChange, value },
    } = useController({
        control,
        name,
        shouldUnregister,
    })

    console.log('render check')

    return (
        <Checkbox
            {...{
                checked: value,
                id: name,
                onChange,
                ...rest,
            }}
        />
    )
}
