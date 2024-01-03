import { LogoutIcon } from '@/shared/assets/icons/componentsIcons'
import { AvatarIcon } from '@/shared/assets/icons/componentsIcons/AvatarIcon'
import { DropdownItem } from '@/shared/ui/dropdown/dropdown-item'
import { DropdownMenu } from '@/shared/ui/dropdown/dropdown-menu'
import { DropdownSeparator } from '@/shared/ui/dropdown/dropdown-separator'
import { Typography } from '@/shared/ui/typography'

import s from '@/shared/ui/dropdown/dropdown.module.scss'

type Props = {
    email: string
    photo: string
    photoDescription: string
    profilePageHref: string
    userName: string
}

export const UserDropdown = ({
    email,
    photo,
    photoDescription,
    profilePageHref,
    userName,
}: Props) => {
    return (
        <DropdownMenu trigger={<img alt={photoDescription} src={photo} />}>
            <DropdownItem>
                <div className={s.photoAndEmail}>
                    <img alt={photoDescription} className={s.dropdownMenuItem_img} src={photo} />
                    <div className={s.nameAndEmail}>
                        <Typography as={'div'} className={s.userName} variant={'caption'}>
                            {userName}
                        </Typography>
                        <Typography as={'div'} className={s.userEmail} variant={'subtitle2'}>
                            {email}
                        </Typography>
                    </div>
                </div>
            </DropdownItem>
            <DropdownSeparator />
            <DropdownItem asChild>
                <a href={profilePageHref}>
                    <AvatarIcon />
                    My Profile
                </a>
            </DropdownItem>
            <DropdownSeparator />
            <DropdownItem>
                <LogoutIcon />
                Sign up
            </DropdownItem>
        </DropdownMenu>
    )
}
