import {
  ComponentPropsWithoutRef,
  ElementRef,
  ElementType,
  ForwardedRef,
  ReactNode,
  forwardRef,
} from 'react'

import { InferType } from '@/shared/types/infer-element-type'

import s from './button.module.scss'

import { Mods, classNames } from '../../lib/classNames/classNames'

export const ButtonVariant = [
  'primary',
  'secondary',
  'tertiary',
  'link',
  'clear',
  'outline',
] as const

// props types
export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T // Любой компонент или тэг какой хотим отрисовать
  children?: ReactNode
  className?: string
  color?: 'error' | 'normal' | 'success'
  disabled?: boolean // В момент загрузки чтоб дизеиблить кнопку
  fullWidth?: boolean
  size?: 'l' | 'm' | 'xl'
  variant?: (typeof ButtonVariant)[number]
} & ComponentPropsWithoutRef<T>

// Polymorph component
const ButtonPolymorph = <T extends ElementType = 'button'>(
  props: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>,
  ref: ForwardedRef<InferType<T>>
) => {
  const {
    // as: Component = "button": переименовали as в Component и ниже отрисовываем в jsx
    // Например - кнопка как ссылка: <Button as={Link} to={ROUTES.signIn}>Sign in</Button>
    as: Component = 'button',
    children,
    className,
    color = 'normal',
    disabled,
    fullWidth,
    size = 'm',
    variant = 'primary',
    ...buttonRestProps
  } = props

  // props-классы по условию - когда Boolean - если fullWidth=true тогда применится класс s.fullWidth
  const mods: Mods = {
    [s.fullWidth]: fullWidth,
  }

  // additional классы - не по условию, а просто пропсы с разными значениями
  const additionalClasses = [className, s[variant], s[size], s[color]]

  return (
    <Component
      className={classNames(s.button, mods, additionalClasses)}
      disabled={disabled}
      ref={ref}
      {...buttonRestProps}
    >
      {children}
    </Component>
  )
}

// Первый параметр props - потом ref
export const Button = forwardRef(ButtonPolymorph) as <T extends ElementType = 'button'>(
  props: ButtonProps<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>> & {
      ref?: ForwardedRef<ElementRef<T>>
    }
) => ReturnType<typeof ButtonPolymorph>

/*
- ComponentsPropsWithoutRef«'button'» - _достать все дефолтные пропсы любого элемента,
когда делаем любой "кастомный" элемент наша задача сделать чтобы он был максимально похож
в использовании на оригинальный. Вместо кнопки можно  передать любой элемент и даже typeof...
и любой компонент что хотим
----------------------------------------------------------------------------------------------------
- дженерик это как аргумент функции, его передаём при вызове функции
----------------------------------------------------------------------------------------------------
clsx:
- as const применяется к массиву строк ['primary', 'secondary', 'tertiary', 'link'] и означает,
что каждый элемент этого массива будет иметь конкретный строковый литеральный тип, а не обобщенный тип строки.
- classNames: для склеивания классов: s - объект, к нему по ключу можем получить доступ: s[variant], вместо вариант какой класс будет, к примеру
s.primary, если нет класса то пустая строка,

const ButtonClassName = clsx(clsx(s.button, s[variant], fullWidth && s.fullWidth, className)): обязательный главный класс,
или так: clsx(s.button, className, {
        [s.fullWidth]: fullWidth,
        [s[variant]]: true,
      })
1 вариант: импортируем библу - вызываем функцию: const classNames = clsx(s.variant, className, fullWidth && s.fullWidth)
2 вариант: const classNames = clsx(s.variant, className, { [s.fullWidth]: fullWidth}) -- если значение будет true то класс применится
 */
