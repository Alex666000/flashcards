import { ComponentProps, KeyboardEvent, ReactNode, forwardRef, useState } from 'react'

import { ClosedEyeIcon } from '@/shared/assets/icons/ClosedEyeIcon'
import { EyeOpenIcon } from '@/shared/assets/icons/EyeOpenIcon'
import { SearchIcon } from '@/shared/assets/icons/SearchIcon'
import { Label } from '@/shared/ui/label/label'
import { Typography } from '@/shared/ui/typography'
import { clsx } from 'clsx'

import s from './input.module.scss'

import { useGetId } from './useGetId'

export type InputProps = {
    endIcon?: ReactNode
    errorMessage?: string
    label?: ReactNode
    onClearClick?: () => void
    onClearFieldClick?: () => void
    onEnter?: (e: KeyboardEvent<HTMLInputElement>) => void
    onValueChange?: (value: string) => void
    search?: boolean
    startIcon?: ReactNode
    type?: 'email' | 'password' | 'search' | 'text'
    value?: string
} & ComponentProps<'input'>

// НЕ УДАЛЯТЬ КОММЕНТ ПЕРЕД forwardRef - без него ломается tree shaking
export const Input = /* @__PURE__ */ forwardRef<HTMLInputElement, InputProps>(
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
            ...rest
        },
        ref
    ) => {
        const [showPassword, setShowPassword] = useState(false)

        const showError = !!errorMessage && errorMessage.length > 0
        const inputId = useGetId(id)

        if (search) {
            startIcon = <SearchIcon color={'var(--color-text-secondary)'} />
        }
        const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
            if (onEnter && e.key === 'Enter') {
                onEnter(e)
            }
            onKeyDown?.(e)
        }

        const toggleShowPassword = () => {
            if (disabled) {
                return
            }
            setShowPassword((prev) => !prev)
        }

        const handleClearClick = () => {
            if (disabled) {
                return
            }
            onClearFieldClick?.()
        }

        const classNames = {
            clearButton: s.clearButton,
            iconEnd: s.iconEnd,
            iconStart: s.iconStart,
            input: clsx(s.input, showError && s.error),
            inputContainer: s.inputContainer,
            root: clsx(s.root, className),
        }

        const isShowClearButton = onClearFieldClick && rest?.value?.length! > 0
        const isPasswordType = type === 'password'

        const dataIconStart = startIcon ? 'start' : ''
        const dataIconEnd = endIcon || isShowClearButton ? 'end' : ''
        const dataIcon = dataIconStart + dataIconEnd
        const inputType = isPasswordType && showPassword ? 'text' : type

        return (
            <div aria-disabled={disabled} className={classNames.root}>
                {label && <Label className={s.label} htmlFor={inputId} label={label} />}
                <div className={classNames.inputContainer}>
                    {!!startIcon && <span className={classNames.iconStart}>{startIcon}</span>}
                    <input
                        aria-invalid={showError}
                        className={classNames.input}
                        data-icon={dataIcon}
                        id={inputId}
                        onKeyDown={handleKeyDown}
                        ref={ref}
                        type={inputType}
                        {...rest}
                    />
                    {isPasswordType && (
                        <button
                            className={s.showPassword}
                            disabled={disabled}
                            onClick={toggleShowPassword}
                            type={'button'}
                        >
                            {showPassword ? <EyeOpenIcon /> : <ClosedEyeIcon />}
                        </button>
                    )}
                    {isShowClearButton && !isPasswordType && (
                        <button
                            className={classNames.clearButton}
                            onClick={handleClearClick}
                            type={'button'}
                        >
                            {<ClosedEyeIcon color={'var(--color-border-input-active)'} />}
                        </button>
                    )}
                    {!!endIcon && <span className={classNames.iconEnd}>{endIcon}</span>}
                </div>
                {showError && <Typography variant={'error'}>{errorMessage}</Typography>}
            </div>
        )
    }
)
