import { memo, useState } from 'react'
import { toast } from 'react-toastify'

import { EditProfileForm, EditProfileFormProps } from '@/features/forms'
import { ProfileControls, useProfile } from '@/features/profile'
import { handleRequest } from '@/shared/lib'
import { Avatar } from '@/shared/ui/avatar-s'
import { BackButton } from '@/shared/ui/back-button'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Container } from '@/shared/ui/container'
import { FileUploader } from '@/shared/ui/file-uploader'
import { Icon } from '@/shared/ui/icon'
import { Typography } from '@/shared/ui/typography'

import s from './profile-page.module.scss'

const ProfilePage = () => {
  const { logout, onUpdate, updateAvatar, user } = useProfile()

  const [isEditMode, setEditMode] = useState(false)

  const onSubmit = async (data: EditProfileFormProps) => {
    await handleRequest(async () => {
      await onUpdate(data)
      setEditMode(false)
      toast.success('Your name successfully changed', { containerId: 'common' })
    })
  }

  return (
    <section className={s.profilePageBlock}>
      <BackButton className={s.backButton} />
      <Container className={s.profilePageContainer}>
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
              // нажал на карандашик
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
      </Container>
    </section>
  )
}

export default memo(ProfilePage)
