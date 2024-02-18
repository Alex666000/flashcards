import { ChangeEvent } from 'react'
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

import { ButtonProps } from '@/shared/ui/button'
import { FileUploader } from '@/shared/ui/file-uploader'

export type ControlledFileUploaderProps<T extends FieldValues> = {
  control: Control<T> // требуется для управления состоянием ввода
  extraActions?: () => void //  вызываться после выбора файла
  name: FieldPath<T>
} & Omit<ButtonProps, 'onChange' | 'onClick' | 'type'>

export const ControlledFileUploader = <T extends FieldValues>({
  control,
  extraActions,
  name,
  ...rest
}: ControlledFileUploaderProps<T>) => {
  // возвращает field, объект, содержащий функцию onChange, которая должна вызываться
  // при изменении значения ввода
  const {
    field: { onChange },
  } = useController({
    control,
    name,
  })

  // вызывается при изменении входного файла. Она извлекает файл из события, вызывает функцию
  // onChange с значением файла, а затем вызывает extraActions,если она предоставлена.
  // Наконец, она сбрасывает значение входного файла, чтобы очистить выбор
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    onChange(file)
    extraActions?.()
    e.target.value = ''
  }

  return <FileUploader name={name} onChange={changeHandler} type={'button'} {...rest} />
}
