import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu'

import s from '@/shared/ui/dropdown/dropdown.module.scss'

export const DropdownSeparator = () => {
    return <DropdownMenuRadix.Separator className={s.dropdownMenuSeparator} />
}
