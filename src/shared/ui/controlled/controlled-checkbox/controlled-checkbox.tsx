import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { CheckboxProps } from '../../checkbox/checkbox'
import { Checkbox } from '../../checkbox_'

// FieldValues -тип из react-hook-form
export type Props<T extends FieldValues> = Omit<
  UseControllerProps<T>,
  'defaultValue' | 'disabled' | 'rules'
> &
  Omit<CheckboxProps, 'checked' | 'id' | 'onChange'>

export const ControlledCheckbox = <T extends FieldValues>({
  control,
  disabled,
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

  return <Checkbox checked={value} disabled={disabled} id={name} onChange={onChange} {...rest} />
}
