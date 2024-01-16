import {
    ChangeEvent,
    ComponentProps,
    ComponentPropsWithoutRef,
    KeyboardEvent,
    ReactNode,
    forwardRef,
    useState,
} from 'react'

import { ClearButtonIcon } from '@/shared/assets/icons/ClearButtonIcon'
import { EyeClosedIcon } from '@/shared/assets/icons/EyeClosedIcon'
import { EyeOpenIcon } from '@/shared/assets/icons/EyeOpenIcon'
import { SearchIcon } from '@/shared/assets/icons/SearchIcon'
import { Label } from '@/shared/ui/label'
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

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
    (
        {
            className,
            disabled,
            endIcon,
            errorMessage,
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

        const isSearchType = type === 'search'
        const isPasswordType = type === 'password'

        const inputId = useGetId(id) + '-input'
        const inputType = isPasswordType && showPassword ? 'text' : type

        const showError = !!errorMessage && errorMessage.length > 0
        const showClearButton = onClearFieldClick && value?.length! > 0

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
            endIcon: s.endIcon,
            error: clsx(s.error),
            field: clsx(s.field, !!errorMessage && s.error, search && s.hasLeadingIcon, className),
            fieldContainer: clsx(s.fieldContainer),
            label: clsx(s.label, className),
            leadingIcon: s.leadingIcon,
            root: clsx(s.root, className),
            startIcon: s.startIcon,
        }

        startIcon = startIcon ?? (isSearchType && <SearchIcon />)
        endIcon = endIcon && !isPasswordType && !showClearButton

        return (
            <div aria-disabled={disabled} className={classNames.root}>
                {label && <Label htmlFor={inputId} label={label} />}
                <div className={classNames.fieldContainer}>
                    {!!startIcon && (
                        <label className={classNames.startIcon} htmlFor={inputId}>
                            {startIcon}
                        </label>
                    )}

                    {search && <SearchIcon className={classNames.leadingIcon} />}
                    <input
                        aria-invalid={showError}
                        className={classNames.field}
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
                            {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                        </button>
                    )}
                    {showClearButton && !isPasswordType && (
                        <button
                            className={classNames.endIcon}
                            disabled={disabled}
                            onClick={handleClearClick}
                            type={'button'}
                        >
                            <ClearButtonIcon />
                        </button>
                    )}
                    {endIcon && <span className={classNames.endIcon}>{endIcon}</span>}
                </div>

                <Typography className={classNames.error} variant={'error'}>
                    {errorMessage}
                </Typography>
            </div>
        )
    }
)
