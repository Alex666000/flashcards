import { memo, useState } from 'react'
import { toast } from 'react-toastify'

import { EditProfileForm, EditProfileFormProps } from '@/features/forms/edit-profile'
import { useProfile } from '@/features/profile/model/hooks'
import { ProfileControls } from '@/features/profile/ui'
import { requestHandler } from '@/shared/lib/utils/request-handler'
import { Avatar } from '@/shared/ui/avatar-s'
import { BackButton } from '@/shared/ui/back-button'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { FileUploader } from '@/shared/ui/file-uploader'
import { Icon } from '@/shared/ui/icon'
import { Typography } from '@/shared/ui/typography'

import s from './profile-page.module.scss'

const ProfilePage = () => {
  const { logout, onUpdate, updateAvatar, user } = useProfile()

  const [isEditMode, setEditMode] = useState(false)

  const onSubmit = async (data: EditProfileFormProps) => {
    await requestHandler(async () => {
      await onUpdate(data)
      setEditMode(false)
      toast.success('Your name successfully changed', { containerId: 'common' })
    })
  }

  return (
    <>
      <BackButton />
      <Card className={s.profilePage}>
        <div className={s.content}>
          <Typography as={'h2'} variant={'large'}>
            Personal Information
          </Typography>
          <div className={s.avatarContainer}>
            <Avatar photoOrImage={user.avatar} size={96} userName={user.name} />
            {!isEditMode && (
              <FileUploader
                accept={'image/*'}
                as={Button}
                className={s.editImage}
                name={'avatar'}
                onChange={updateAvatar}
              >
                <Icon className={s.icon} height={20} name={'edit'} width={20} />
              </FileUploader>
            )}
          </div>
          {isEditMode ? (
            <EditProfileForm
              className={s.form}
              initialValues={{ name: user.name }}
              onSubmit={onSubmit}
            />
          ) : (
            <ProfileControls onLogout={logout} setEditMode={setEditMode} user={user} />
          )}
        </div>
      </Card>
    </>
  )
}

export default memo(ProfilePage)
