import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Select, SelectProps } from '@/shared/ui/select'

type ControlledSelectProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<SelectProps, 'onValueChange' | 'value'>

export const ControlledSelect = <T extends FieldValues>({
  control,
  name,
  ...rest
}: ControlledSelectProps<T>) => {
  const {
    field: { onChange, value },
  } = useController({
    control,
    name,
  })

  return <Select onValueChange={onChange} value={value} {...rest} />
}
