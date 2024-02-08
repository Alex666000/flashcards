import { JSX } from 'react'
import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { RadioGroup, RadioGroupProps } from '@/shared/ui/radio-group'

type ControlledRadioGroupProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<RadioGroupProps, 'value | onValueChange'>

export const ControlledRadioGroup = <T extends FieldValues>({
  control,
  name,
  ...restProps
}: ControlledRadioGroupProps<T>): JSX.Element => {
  const {
    field: { onChange, value },
  } = useController({
    control,
    name,
  })

  return <RadioGroup {...restProps} name={name} onValueChange={onChange} value={value} />
}
