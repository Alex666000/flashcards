import { ComponentPropsWithoutRef, ReactNode } from 'react'

import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu'

import s from './dropdown.module.scss'

type Props = {
    trigger?: ReactNode // Принимаем в пропсах
} & ComponentPropsWithoutRef<typeof DropdownMenuRadix.Root> // автоматическая типизация

export const DropdownMenu = ({ children, trigger, ...rest }: Props) => {
    return (
        <DropdownMenuRadix.Root {...rest}>
            <DropdownMenuRadix.Trigger>{trigger}</DropdownMenuRadix.Trigger>
            <DropdownMenuRadix.Portal>
                <DropdownMenuRadix.Content className={s.dropdownMenuContent} sideOffset={5}>
                    {children}
                </DropdownMenuRadix.Content>
            </DropdownMenuRadix.Portal>
        </DropdownMenuRadix.Root>
    )
}
