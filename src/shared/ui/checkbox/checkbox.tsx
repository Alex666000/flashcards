import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { CheckIcon } from '@/shared/assets/icons/componentsIcons/CheckIcon'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Typography } from '@/shared/ui/typograpfy'
import * as RadixCheckbox from '@radix-ui/react-checkbox'
import * as RadixLabel from '@radix-ui/react-label'

import s from './checkbox.module.scss'

type PositionType = 'default' | 'left'

export type CheckboxProps = {
    checked?: boolean
    className?: string
    disabled?: boolean
    id?: string
    label?: string
    onCheckedChange?: (checked: boolean) => void
    position?: PositionType
} & Omit<ComponentPropsWithoutRef<typeof RadixCheckbox.Root>, 'asChild'>

export const Checkbox = forwardRef<ElementRef<typeof RadixCheckbox.Root>, CheckboxProps>(
    (props, ref) => {
        const {
            checked,
            className = '',
            disabled = false,
            id,
            label = '',
            name,
            onCheckedChange,
            position = 'default',
            ...rest
        } = props

        const classes = {
            checkboxWrapper: classNames(s.checkboxWrapper, { [s.disabled]: disabled }, [
                s[position],
            ]),
            container: classNames(s.container, {}, [className]),
            indicator: s.indicator,
            label: classNames(s.label, { [s.disabled]: disabled }, [className]),
            root: classNames(s.root, {}, [className]),
        }

        return (
            <div className={classes.container}>
                <RadixLabel.Root asChild>
                    <Typography as={'label'} className={classes.label} variant={'h2'}>
                        <div className={classes.checkboxWrapper}>
                            <RadixCheckbox.Root
                                checked={checked}
                                className={classes.root}
                                disabled={disabled}
                                id={id}
                                name={name}
                                onCheckedChange={onCheckedChange}
                                ref={ref}
                                required={rest.required}
                            >
                                {checked && (
                                    <RadixCheckbox.Indicator
                                        className={classes.indicator}
                                        forceMount
                                    >
                                        <CheckIcon size={1} />
                                    </RadixCheckbox.Indicator>
                                )}
                            </RadixCheckbox.Root>
                        </div>
                        {label}
                    </Typography>
                </RadixLabel.Root>
            </div>
        )
    }
)
