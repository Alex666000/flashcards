import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu'

import s from '@/shared/ui/dropdown_me/dropdown.module.scss'

export const DropdownSeparator = forwardRef<
  ElementRef<typeof DropdownMenuRadix.Separator>,
  ComponentPropsWithoutRef<typeof DropdownMenuRadix.Separator>
>(({ className, ...props }, ref) => {
  return <DropdownMenuRadix.Separator className={s.dropdownMenuSeparator} ref={ref} {...props} />
})

DropdownSeparator.displayName = DropdownMenuRadix.Separator.displayName
