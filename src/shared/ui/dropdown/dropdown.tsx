import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import { Icon } from '@/shared/ui/icon/icon'
import { IconButton } from '@/shared/ui/icon-button'
import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu'
import { clsx } from 'clsx'

import s from './dropdown.module.scss'

type DropdownProps = {
    align?: 'center' | 'end' | 'start'
    children: ReactNode
    className?: string
    trigger?: ReactNode // Принимаем в пропсах: триггер это кнопка по которой кликаем
} & ComponentPropsWithoutRef<typeof DropdownMenuRadix.Content> // автоматическая типизация

export const DropDown = forwardRef<ElementRef<typeof DropdownMenuRadix.Content>, DropdownProps>(
    ({ align = 'end', children, className, sideOffset = 8, trigger, ...restProps }, ref) => {
        return (
            <DropdownMenuRadix.Root {...restProps}>
                {/* Триггер, который инициирует открытие/закрытие меню */}
                <DropdownMenuRadix.Trigger asChild className={clsx(s.trigger, className)}>
                    {trigger ?? (
                        <IconButton
                            className={s.btn}
                            icon={<Icon height={20} name={'more'} width={20} />}
                        />
                    )}
                </DropdownMenuRadix.Trigger>
                {/* Портал для размещения меню вне текущего контейнера */}
                <DropdownMenuRadix.Portal>
                    <DropdownMenuRadix.Content
                        align={align}
                        className={s.content}
                        forceMount
                        onClick={(event) => event.stopPropagation()}
                        ref={ref}
                        sideOffset={sideOffset}
                    >
                        {/* {children} */}
                        <div>
                            {/* Стрелка, указывающая на триггер */}
                            <DropdownMenuRadix.Arrow asChild className={s.arrowBox}>
                                <div className={s.arrow} />
                            </DropdownMenuRadix.Arrow>
                            {/* Содержимое меню */}
                            <div className={s.itemsBox}>{children}</div>
                        </div>
                    </DropdownMenuRadix.Content>
                </DropdownMenuRadix.Portal>
            </DropdownMenuRadix.Root>
        )
    }
)
// Устанавливаем displayName для облегчения отладки в DevTools
DropDown.displayName = DropdownMenuRadix.Content.displayName
