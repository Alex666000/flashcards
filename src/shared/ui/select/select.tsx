import { FC, ReactNode } from 'react'

import { Icon } from '@/shared/ui/icon/icon'
import { Typography } from '@/shared/ui/typography'
import * as SelectRadix from '@radix-ui/react-select'
import { clsx } from 'clsx'

import s from './select.module.scss'

export type Option = {
  label: string
  value: string
}

export type SelectProps = {
  className?: string
  defaultValue?: string
  disabled?: boolean
  label?: string
  onValueChange?: (value: any) => void
  options: Option[]
  placeholder?: ReactNode
  required?: boolean
  small?: boolean
  value?: string
}

/**
 * SelectRadix.Table представляет корневой элемент селекта - с основными props..
 * SelectRadix.Trigger - триггер для открытия/закрытия селекта. Включает кнопку и иконку.
 * SelectRadix.Portal - портал для отображения выпадающего списка вне обычного порядка расположения DOM-элементов.
 * SelectRadix.Content - содержимое выпадающего списка.
 * SelectRadix.Viewport - область просмотра для элементов списка.
 * "Маппинг" по опциям: Через options.map((el) => ...), компонент создает элементы списка для каждой опции из массива options.
 * Иконка и кнопка: Внутри SelectRadix.Trigger размещена кнопка с текстом текущего выбранного значения (SelectRadix.Value) и иконка, которая меняется в зависимости от состояния селекта.
 * Обработка изменения значения: Если передана функция onValueChange, она будет вызвана при изменении значения в селекте.
 */
export const Select: FC<SelectProps> = ({
  className,
  defaultValue,
  disabled,
  label,
  onValueChange,
  options,
  placeholder,
  required,
  small,
  value,
}) => {
  const classes = {
    icon: clsx(s.icon, disabled && s.iconDisabled),
    item: clsx(s.item, small && s.small),
    label: clsx(s.label, disabled && s.labelDisabled, className),
    trigger: clsx(s.trigger, disabled && s.triggerDisabled, small && s.small),
  }

  return (
    <Typography as={'label'} className={classes.label} variant={'body2'}>
      {label}
      <SelectRadix.Root
        defaultValue={defaultValue}
        disabled={disabled}
        onValueChange={onValueChange}
        required={required}
        value={value}
      >
        <SelectRadix.Trigger aria-label={'select'} asChild className={classes.trigger}>
          <button>
            <SelectRadix.Value placeholder={placeholder} />
            <Icon className={classes.icon} name={'arrowDown'} />
          </button>
        </SelectRadix.Trigger>
        <SelectRadix.Portal>
          <SelectRadix.Content className={s.content} position={'popper'}>
            <SelectRadix.Viewport>
              {options.map((el) => (
                <SelectRadix.Item className={classes.item} key={el.value} value={el.value}>
                  <SelectRadix.ItemText>{el.label}</SelectRadix.ItemText>
                </SelectRadix.Item>
              ))}
            </SelectRadix.Viewport>
          </SelectRadix.Content>
        </SelectRadix.Portal>
      </SelectRadix.Root>
    </Typography>
  )
}
