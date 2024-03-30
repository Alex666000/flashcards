import { ChangeEvent } from 'react'
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

import { ButtonProps } from '@/shared/ui/button'
import { FileUploader } from '@/shared/ui/file-uploader'

export type ControlledFileUploaderProps<T extends FieldValues> = {
  control: Control<T>
  extraActions?: () => void
  name: FieldPath<T>
} & Omit<ButtonProps, 'onChange' | 'onClick' | 'type'>

export const ControlledFileUploader = <T extends FieldValues>({
  control,
  extraActions,
  name,
  ...rest
}: ControlledFileUploaderProps<T>) => {
  const {
    field: { onChange },
  } = useController({
    control,
    name,
  })

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    onChange(file)
    extraActions?.()
    e.target.value = ''
  }

  return <FileUploader name={name} onChange={changeHandler} type={'button'} {...rest} />
}
