import { ChangeEvent, ComponentPropsWithoutRef, ElementType, ReactNode, useRef } from 'react'

import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon/icon'

type FileUploaderProps<T extends ElementType = 'button'> = {
  accept?: string
  as?: T
  asProps?: T extends keyof JSX.IntrinsicElements ? JSX.IntrinsicElements[T] : any // Дополнительные свойства для элемента обертки
  children?: ReactNode
  className?: string
  name: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
} & Omit<ComponentPropsWithoutRef<T>, 'onChange'>

export const FileUploader = <T extends ElementType = 'button'>(
  props: FileUploaderProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof FileUploaderProps<T>>
) => {
  const {
    accept = '',
    as: Component = Button,
    asProps = { variant: 'secondary' },
    children,
    name,
    onChange,
    ...rest
  } = props

  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <Component onClick={() => inputRef?.current?.click()} {...asProps} {...rest}>
        {children ?? <Icon height={16} name={'edit'} width={16} />}
      </Component>
      <input
        accept={accept}
        name={name}
        onChange={onChange}
        ref={inputRef}
        style={{ display: 'none' }}
        type={'file'}
      />
    </>
  )
}
