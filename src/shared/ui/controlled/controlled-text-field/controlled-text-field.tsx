import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

import { TextField, TextFieldProps } from '@/shared/ui/text-field_'

type Props<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
} & Omit<TextFieldProps, 'onChange' | 'value'>

/**
 * ControlledTextField - обёртка над TextField
 * Должны быть:
 * ControlledTextField,  ControlledCheckbox,  ControlledRadio,  ControlledSelect - при этом onBlur
 *  прокинуть там где он есть..
 */

export const ControlledTextField = <T extends FieldValues>({
  control,
  name,
  ...rest
}: Props<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  })

  return <TextField errorMessage={error?.message} {...field} {...rest} />
}

/*
- TextField - как инпут
- useController - нужен когда есть инпуты или какие либо контролирующие элементы которые не
принимают в себя ref нативного элемента - когда нельзя использовать нативный элемент типа инпута
чекбокса или радиокнопку
 */
