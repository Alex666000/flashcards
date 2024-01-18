import { ElementRef, ReactNode, forwardRef } from 'react'

import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'

import s from './dropdown.module.scss'

// type DropDownItemProps = ComponentPropsWithoutRef<typeof DropdownMenuRadix.Item>

export type DropDownItemProps = {
    children?: ReactNode
    className?: string
    disabled?: boolean
    onSelect?: (event: Event) => void
}

export const DropdownItem = forwardRef<
    ElementRef<typeof DropdownMenuRadix.Item>,
    DropDownItemProps
>((props, ref) => {
    const { children, className, disabled, onSelect, ...restProps } = props

    return (
        <DropdownMenuRadix.Item
            asChild
            className={clsx(s.item, className)}
            disabled={disabled}
            onSelect={onSelect}
            ref={ref}
            {...restProps}
        >
            {children}
        </DropdownMenuRadix.Item>
    )
})
// Устанавливаем displayName для облегчения отладки в DevTools
DropdownItem.displayName = DropdownMenuRadix.Item.displayName
