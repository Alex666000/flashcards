import { ComponentPropsWithoutRef, forwardRef, useState } from 'react'

import { Icon } from '@/shared/ui/icon/icon'
import { Typography } from '@/shared/ui/typography'
import { clsx } from 'clsx'

import s from './text-field.module.scss'

export type TextFieldProps = {
  clearField?: () => void
  errorMessage?: string
  label?: string
  readonly?: boolean
  type?: 'email' | 'password' | 'search' | 'text'
  value: string
} & ComponentPropsWithoutRef<'input'>

type PropsType = TextFieldProps & Omit<ComponentPropsWithoutRef<'input'>, keyof TextFieldProps>

export const TextField = forwardRef<HTMLInputElement, PropsType>(
  (
    { className, clearField, errorMessage, label, readonly, type = 'text', value, ...rest },
    ref
  ) => {
    // Локальное состояние для отображения пароля
    const [showPassword, setShowPassword] = useState(false)

    // Проверка типа поля на пароль и поиск
    const isPasswordType = type === 'password'
    const isSearchType = type === 'search'

    // Отображение кнопки очистки для поля поиска
    const displayClearButton = isSearchType && clearField && value
    // Определение окончательного типа в зависимости от отображения пароля
    const finalType = getFinalType(type, showPassword)

    // Обработчик клика для отображения/скрытия пароля
    const passwordHandler = () => setShowPassword((prev) => !prev)

    const classes = {
      input: clsx(
        s.input,
        isSearchType && s.search,
        readonly && s.readonly,
        errorMessage && s.error
      ),
      label: clsx(s.label, rest.disabled && s.disabled),
      searchIcon: clsx(s.searchIcon, rest.disabled && s.disabledIcon),
      textField: clsx(s.textField, className),
    }

    return (
      <div aria-disabled={rest.disabled} className={classes.textField}>
        <Typography as={'label'} className={classes.label} variant={'body2'}>
          {label}
          <div className={s.textField_container}>
            <input
              aria-invalid={!!errorMessage && errorMessage.length > 0}
              className={classes.input}
              readOnly={readonly}
              ref={ref}
              type={isPasswordType ? finalType : 'text'}
              {...rest}
            />
            {isPasswordType && (
              <button
                className={s.button}
                disabled={rest.disabled}
                onClick={passwordHandler}
                type={'button'}
              >
                {showPassword ? <Icon name={'eyeOff'} /> : <Icon name={'eye'} />}
              </button>
            )}
            {isSearchType && (
              <Icon className={classes.searchIcon} height={20} name={'search'} width={20} />
            )}
            {displayClearButton && (
              <button
                className={s.button}
                disabled={rest.disabled}
                onClick={clearField}
                type={'button'}
              >
                <Icon height={16} name={'cross'} width={16} />
              </button>
            )}
          </div>
        </Typography>
        {!!errorMessage && (
          <Typography className={s.errorMessage} variant={'caption'}>
            {errorMessage}
          </Typography>
        )}
      </div>
    )
  }
)
/**
 * getFinalType принимает тип поля ('password', 'search', 'text') и флаг showPassword, указывающий,
 * нужно ли отображать пароль. В зависимости от этих параметров,
 * функция возвращает окончательный тип поля для использования в компоненте input
 */
function getFinalType(type: TextFieldProps['type'], showPassword: boolean) {
  if (type === 'password' && !showPassword) {
    return 'password'
  }

  return 'text'
}

/*
- TextField - как инпут
 */
