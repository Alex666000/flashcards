import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu'

import s from '@/shared/ui/dropdown/dropdown.module.scss'

// Раздилитель
export const DropdownSeparator = forwardRef<
  ElementRef<typeof DropdownMenuRadix.Separator>,
  ComponentPropsWithoutRef<typeof DropdownMenuRadix.Separator>
>(({ className, ...props }, ref) => {
  return <DropdownMenuRadix.Separator className={s.dropdownMenuSeparator} ref={ref} {...props} />
})

DropdownSeparator.displayName = DropdownMenuRadix.Separator.displayName
