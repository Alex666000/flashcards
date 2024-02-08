import { ChangeEvent, ComponentPropsWithoutRef, ElementType, ReactNode, useRef } from 'react'

import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon/icon'

type FileUploaderProps<T extends ElementType = 'button'> = {
  accept?: string // Типы файлов, которые разрешено выбирать в диалоге выбора файлов
  as?: T // Тип элемента, используемого в качестве обертки (по умолчанию 'button')
  asProps?: T extends keyof JSX.IntrinsicElements ? JSX.IntrinsicElements[T] : any // Дополнительные свойства для элемента обертки
  children?: ReactNode // Дочерние элементы компонента (обычно иконка или текст)
  className?: string // Дополнительные классы стилей
  name: string // Имя поля ввода файла
  onChange: (e: ChangeEvent<HTMLInputElement>) => void // Обработчик события изменения содержимого поля ввода файла
} & Omit<ComponentPropsWithoutRef<T>, 'onChange'> // Остальные свойства, специфичные для элемента обертки

export const FileUploader = <T extends ElementType = 'button'>(
  props: FileUploaderProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof FileUploaderProps<T>>
) => {
  const {
    accept = '', // Значение по умолчанию - пустая строка
    as: WrapperComponent = Button, // Тип элемента обертки по умолчанию - 'button'
    asProps = { variant: 'secondary' }, // Значение по умолчанию для свойств элемента обертки
    children, // Дочерние элементы
    name, // Имя поля ввода файла
    onChange, // Обработчик события изменения содержимого поля ввода файла
    ...rest // Остальные свойства, специфичные для элемента обертки
  } = props

  const inputRef = useRef<HTMLInputElement>(null) // Создание ссылки на элемент ввода файла

  return (
    <>
      <WrapperComponent onClick={() => inputRef?.current?.click()} {...asProps} {...rest}>
        {children ?? <Icon height={16} name={'edit'} width={16} />}
        {/* Если переданы дочерние элементы, используйте их. В противном случае, используйте иконку по умолчанию. */}
      </WrapperComponent>
      <input
        accept={accept}
        name={name}
        onChange={onChange}
        ref={inputRef}
        style={{ display: 'none' }} // Скрыть стандартный элемент ввода файла
        type={'file'} // Установить тип файла
      />
    </>
  )
}
