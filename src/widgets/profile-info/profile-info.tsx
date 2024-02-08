import { ElementRef, forwardRef } from 'react'

import { Avatar } from '@/shared/ui/avatar'
import { Typography } from '@/shared/ui/typography'

import s from './profile-info.module.scss'

export type ProfileInfoProps = Pick<UserResponse, 'avatar' | 'email' | 'name'>

export const ProfileInfo = forwardRef<ElementRef<'div'>, ProfileInfoProps>(
  ({ avatar, email, name }, ref) => {
    return (
      <div className={s.content} ref={ref}>
        <Avatar className={s.avatar} image={avatar} userName={name} />
        <div>
          <Typography variant={'subtitle2'}>{name}</Typography>
          <Typography className={s.email} variant={'caption'}>
            {email}
          </Typography>
        </div>
      </div>
    )
  }
)

export type UserResponse = {
  avatar: string
  created: string
  email: string
  id: string
  isEmailVerified: boolean
  name: string
  updated: string
}
