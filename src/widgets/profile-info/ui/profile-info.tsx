import { ElementRef, forwardRef } from 'react'

import { UserAuthDataResponse } from '@/features/auth/model/types/auth.types'
import { Avatar } from '@/shared/ui/avatar-s'
import { Typography } from '@/shared/ui/typography'

import s from './profile-info.module.scss'

export type ProfileInfoProps = Pick<UserAuthDataResponse, 'avatar' | 'email' | 'name'>

export const ProfileInfo = forwardRef<ElementRef<'div'>, ProfileInfoProps>(
  ({ avatar, email, name }, ref) => {
    return (
      <div className={s.profileInfoBlock} ref={ref}>
        <Avatar className={s.avatar} photoOrImage={avatar} userName={name} />
        <div className={s.userDetails}>
          <Typography variant={'subtitle2'}>{name}</Typography>
          <Typography className={s.email} variant={'caption'}>
            {email}
          </Typography>
        </div>
      </div>
    )
  }
)
