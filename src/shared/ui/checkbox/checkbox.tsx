import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { CheckIcon } from '@/shared/assets/icons/componentsIcons/CheckIcon'
import { Typography } from '@/shared/ui/typography'
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import * as Label from '@radix-ui/react-label'
import { clsx } from 'clsx'

import s from './checkbox.module.scss'

type Props = {
    checked: boolean
    label?: string
    onChange: (checked: boolean) => void
} & Omit<ComponentPropsWithoutRef<typeof CheckboxRadix.Root>, 'checked' | 'onCheckedChange'>

export const Checkbox = forwardRef<ElementRef<typeof CheckboxRadix.Root>, Props>((props, ref) => {
    const { checked, disabled, label, onChange, ...rest } = props

    const classNames = {
        buttonWrapper: clsx(s.buttonWrapper, disabled && s.disabled),
        container: s.container,
        label: clsx(s.label, disabled && s.disabled),
        root: s.root,
    }

    return (
        <div className={classNames.container}>
            <Label.Root asChild>
                <Typography as={'label'} className={classNames.label}>
                    <div className={classNames.buttonWrapper}>
                        <CheckboxRadix.Root
                            checked={checked}
                            className={classNames.root}
                            disabled={disabled}
                            onCheckedChange={onChange}
                            ref={ref}
                            {...rest}
                        >
                            {checked && (
                                <CheckboxRadix.CheckboxIndicator forceMount>
                                    <CheckIcon size={1} />
                                </CheckboxRadix.CheckboxIndicator>
                            )}
                        </CheckboxRadix.Root>
                    </div>
                    {label}
                </Typography>
            </Label.Root>
        </div>
    )
})
