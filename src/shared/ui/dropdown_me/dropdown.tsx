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
  trigger?: ReactNode
} & ComponentPropsWithoutRef<typeof DropdownMenuRadix.Content>

export const DropDown = forwardRef<ElementRef<typeof DropdownMenuRadix.Content>, DropdownProps>(
  ({ align = 'end', children, className, sideOffset = 8, trigger, ...restProps }, ref) => {
    return (
      <DropdownMenuRadix.Root {...restProps}>
        <DropdownMenuRadix.Trigger asChild className={clsx(s.trigger, className)}>
          {trigger ?? (
            <IconButton className={s.btn} icon={<Icon height={20} name={'more'} width={20} />} />
          )}
        </DropdownMenuRadix.Trigger>
        <DropdownMenuRadix.Portal>
          <DropdownMenuRadix.Content
            align={align}
            className={s.content}
            forceMount
            onClick={(event) => event.stopPropagation()}
            ref={ref}
            sideOffset={sideOffset}
          >
            <div>
              <DropdownMenuRadix.Arrow asChild className={s.arrowBox}>
                <div className={s.arrow} />
              </DropdownMenuRadix.Arrow>
              <div className={s.itemsBox}>{children}</div>
            </div>
          </DropdownMenuRadix.Content>
        </DropdownMenuRadix.Portal>
      </DropdownMenuRadix.Root>
    )
  }
)
DropDown.displayName = DropdownMenuRadix.Content.displayName
