import {
    ChangeEvent,
    ComponentPropsWithoutRef,
    KeyboardEvent,
    ReactNode,
    forwardRef,
    useState,
} from 'react'

import { ClosedEyeIcon, OpenEyeIcon } from '@/shared/assets/icons'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Typography } from '@/shared/ui/typograpfy'

import s from './text-field.module.scss'

export type TextFieldProps = {
    error?: string
    label?: string
    leftIcon?: ReactNode
    onChangeValue?: (value: string) => void
    onEnter?: ComponentPropsWithoutRef<'input'>['onKeyDown']
    onLeftIconClickHandler?: () => void
    onRightIconClickHandler?: () => void
    rightIcon?: ReactNode
} & ComponentPropsWithoutRef<'input'>

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
    const [isVisiblePassword, setIsVisiblePassword] = useState(false)

    const {
        className,
        error,
        label,
        leftIcon,
        onChange,
        onChangeValue,
        onEnter,
        onKeyDown,
        onLeftIconClickHandler,
        onRightIconClickHandler,
        rightIcon,
        type,
        ...restProps
    } = props

    const setVisiblePasswordHandler = () => {
        setIsVisiblePassword((prevState) => !prevState)
    }

    const onChangeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e)
        onChangeValue?.(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            onEnter?.(e)
        }
        onKeyDown?.(e)
    }

    const classes = {
        input: classNames(s.input, { [s.isLeftIcon]: !!leftIcon, [s.isRightIcon]: !!rightIcon }, [
            className,
        ]),
        inputWrapper: classNames(
            s.inputWrapper,
            { [s.active]: !!restProps.value, [s.disabled]: restProps.disabled, [s.error]: !!error },
            [className]
        ),
        label: classNames(s.label, { [s.disabledText]: restProps.disabled }, [className]),
        leftIcon: s.leftIcon,
        rightIcon: s.rightIcon,
        root: classNames(s.root, {}, [className]),
    }
    const inputType = type === 'password' && isVisiblePassword ? 'text' : type
    const dynamicRightIcon = getRightInputIcon(type || 'text', isVisiblePassword, rightIcon)

    return (
        <div className={classes.root}>
            {label && (
                <Typography as={'label'} className={classes.label} variant={'body2'}>
                    {label}
                </Typography>
            )}
            <div className={classes.inputWrapper} tabIndex={0}>
                <input
                    className={classes.input}
                    onChange={onChangeValueHandler}
                    onKeyDown={onKeyPressHandler}
                    ref={ref}
                    type={inputType}
                    {...restProps}
                />
                <TextFieldIcon
                    className={classes.leftIcon}
                    icon={leftIcon}
                    onClick={onLeftIconClickHandler}
                />
                <TextFieldIcon
                    className={classes.rightIcon}
                    icon={dynamicRightIcon}
                    onClick={
                        type === 'password' ? setVisiblePasswordHandler : onRightIconClickHandler
                    }
                />
            </div>
            {!!error && (
                <Typography as={'span'} variant={'error'}>
                    {error}
                </Typography>
            )}
        </div>
    )
})

type IconProps = {
    className?: string
    icon?: ReactNode
    onClick?: () => void
}

const TextFieldIcon = ({ className, icon, onClick }: IconProps) => {
    if (!icon) {
        return null
    }

    return (
        <button className={className} onClick={onClick} type={'button'}>
            {icon}
        </button>
    )
}

const getRightInputIcon = (type: string, isVisible: boolean, rightIcon: ReactNode) => {
    if (type === 'password' && isVisible) {
        return <OpenEyeIcon />
    } else if (type === 'password' && !isVisible) {
        return <ClosedEyeIcon />
    } else {
        return rightIcon
    }
}
