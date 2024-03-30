import { ComponentPropsWithoutRef, forwardRef, useState } from 'react'

import { SearchIcon } from '@/shared/assets'
import { Icon } from '@/shared/ui/icon/icon'
import { Typography } from '@/shared/ui/typography'
import { clsx } from 'clsx'

import s from './text-field.module.scss'

export type TextFieldProps = {
  clearField?: () => void
  errorMessage?: string
  inputTextClassName?: string
  label?: string
  readonly?: boolean
  type?: 'email' | 'password' | 'search' | 'text'
  value?: any | string
} & ComponentPropsWithoutRef<'input'>

type PropsType = TextFieldProps & Omit<ComponentPropsWithoutRef<'input'>, keyof TextFieldProps>

export const TextField = forwardRef<HTMLInputElement, PropsType>((props, ref) => {
  const {
    className,
    clearField,
    errorMessage,
    label,
    readonly,
    type = 'text',
    value,
    ...rest
  } = props

  const [showPassword, setShowPassword] = useState(false)

  const isPasswordType = type === 'password'
  const isSearchType = type === 'search'

  const displayClearButton = isSearchType && clearField && value
  const finalType = getFinalType(type, showPassword)

  const passwordHandler = () => setShowPassword((prev) => !prev)

  const classes = {
    input: clsx(s.input, isSearchType && s.search, readonly && s.readonly, errorMessage && s.error),
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
            value={value}
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
          {isSearchType && <SearchIcon className={s.icon} />}
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
})

function getFinalType(type: TextFieldProps['type'], showPassword: boolean) {
  if (type === 'password' && !showPassword) {
    return 'password'
  }

  return 'text'
}
