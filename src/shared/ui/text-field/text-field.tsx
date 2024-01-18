import {
    ChangeEvent,
    ComponentPropsWithoutRef,
    KeyboardEvent,
    ReactNode,
    forwardRef,
    useState,
} from 'react'

import { ClosedEyeIcon, OpenedEyeIcon, SearchIcon } from '@/shared/assets'
import { Label } from '@/shared/ui/label/label'
import { useGetId } from '@/shared/ui/text-field/useGetId'
import { Typography } from '@/shared/ui/typography'
import { clsx } from 'clsx'

import s from './text-field.module.scss'

export type TextFieldProps = {
    endIcon?: ReactNode
    errorMessage?: string
    label?: string
    onClearFieldClick?: () => void
    onEnter?: (e: KeyboardEvent<HTMLInputElement>) => void
    onValueChange?: (value: string) => void
    search?: boolean
    startIcon?: ReactNode
    type?: 'email' | 'password' | 'search' | 'text'
    value?: string
} & Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'value'>

// НЕ УДАЛЯТЬ КОММЕНТ ПЕРЕД forwardRef - без него ломается tree shaking
export const TextField = /* @__PURE__ */ forwardRef<HTMLInputElement, TextFieldProps>(
    (
        {
            className,
            disabled,
            endIcon,
            errorMessage,
            id,
            label,
            onChange,
            onClearFieldClick,
            onEnter,
            onKeyDown,
            onValueChange,
            placeholder,
            search,
            startIcon,
            type = 'text',
            value,
            ...restProps
        },
        ref
    ) => {
        const [showPassword, setShowPassword] = useState(false)

        const isPasswordType = type === 'password'

        const inputId = useGetId(id) + '-input_'
        const inputType = isPasswordType && showPassword ? 'text' : type

        const showError = !!errorMessage && errorMessage.length > 0

        // крестик справа в инпуте при фокусе
        const isShowClearButton = onClearFieldClick && value?.length! > 0

        if (search) {
            startIcon = <SearchIcon color={'var(--color-text-secondary)'} />
        }

        function handleChange(e: ChangeEvent<HTMLInputElement>) {
            onChange?.(e)
            onValueChange?.(e.target.value)
        }

        const toggleShowPassword = () => {
            if (disabled) {
                return
            }
            setShowPassword((prev) => !prev)
        }

        const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
            if (onEnter && e.key === 'Enter') {
                onEnter?.(e)
            }
            onKeyDown?.(e)
        }

        const handleClearClick = () => {
            if (disabled) {
                return
            }
            onClearFieldClick?.()
        }

        const classNames = {
            clearButton: s.clearButton,
            endIcon: s.endIcon,
            error: clsx(s.error),
            field: clsx(
                s.field,
                !!errorMessage && s.error,
                search && s.hasLeadingIcon,
                !!startIcon && s.isLeftIcon,
                !!endIcon && s.isRightIcon,
                className
            ),
            fieldContainer: clsx(
                s.fieldContainer,
                !!value && s.active,
                disabled && s.disabled,
                !!errorMessage && s.error
            ),
            label: clsx(s.label, disabled && s.disabledText, className),
            leadingIcon: s.leadingIcon,
            root: clsx(s.root, className),
            startIcon: s.startIcon,
        }

        const dataIconStart = startIcon ? 'start' : ''
        const dataIconEnd = endIcon || isShowClearButton ? 'end' : ''
        const dataIcon = dataIconStart + dataIconEnd

        return (
            <div aria-disabled={disabled} className={classNames.root}>
                {label && <Label className={classNames.label} htmlFor={inputId} label={label} />}
                <div className={classNames.fieldContainer}>
                    {search && <SearchIcon className={classNames.leadingIcon} />}
                    <input
                        aria-invalid={showError}
                        className={classNames.field}
                        data-icon={dataIcon}
                        disabled={disabled}
                        id={inputId}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        ref={ref}
                        type={inputType}
                        {...restProps}
                    />
                    {isPasswordType && (
                        <button
                            className={s.showPassword}
                            disabled={disabled}
                            onClick={toggleShowPassword}
                            type={'button'}
                        >
                            {showPassword ? <OpenedEyeIcon /> : <ClosedEyeIcon />}
                        </button>
                    )}
                    {isShowClearButton && !isPasswordType && (
                        <button
                            className={classNames.clearButton}
                            disabled={disabled}
                            onClick={handleClearClick}
                            type={'button'}
                        ></button>
                    )}
                    {!!endIcon && <span className={classNames.endIcon}>{endIcon}</span>}
                </div>
                <Typography className={classNames.error} variant={'error'}>
                    {errorMessage}
                </Typography>
            </div>
        )
    }
)
