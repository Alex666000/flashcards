import { PropsWithChildren } from 'react'

import { Button } from '@/shared/ui/button'
import { ControlledTextField } from '@/shared/ui/controlled'
import { clsx } from 'clsx'

import s from './edit-profile.module.scss'

import { EditProfileFormProps, useEditProfile } from './'

type Props = {
  className?: string
  initialValues?: EditProfileFormProps
  onSubmit: (data: EditProfileFormProps) => void
} & PropsWithChildren

export const EditProfileForm = ({ className, initialValues, onSubmit }: Props) => {
  const classes = clsx(s.form, className)

  const { control, handleSubmit } = useEditProfile(initialValues)

  return (
    <form className={classes} onSubmit={handleSubmit(onSubmit)}>
      <ControlledTextField
        className={s.nickName}
        control={control}
        label={'Nickname'}
        name={'name'}
      />
      <Button className={s.button} fullWidth>
        Save Changes
      </Button>
    </form>
  )
}
