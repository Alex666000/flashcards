import { FC } from 'react'

import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon'
import { IconButton } from '@/shared/ui/icon-button'
import { Typography } from '@/shared/ui/typography'
import { ProfileInfoProps } from '@/widgets/profile-info/ui/profile-info'

import s from './profile-controls.module.scss'

type Props = {
  onLogout: () => void
  setEditMode: (value: boolean) => void
  user: ProfileInfoProps
}

export const ProfileControls: FC<Props> = ({ onLogout, setEditMode, user }) => {
  return (
    <>
      <div className={s.nickName}>
        <Typography as={'h1'} variant={'large'}>
          {user.name}
        </Typography>
        <IconButton
          icon={<Icon height={20} name={'edit'} width={20} />}
          onClick={() => setEditMode(true)}
        />
      </div>
      <Typography as={'h2'} className={s.email} variant={'body2'}>
        {user.email}
      </Typography>
      <Button className={s.logout} onClick={onLogout} variant={'secondary'}>
        <Icon className={s.icon} height={18} name={'logout'} width={18} />
        <Typography variant={'subtitle2'}>Logout</Typography>
      </Button>
    </>
  )
}
