import { FC } from 'react'

import { Button } from '@/shared/ui/button'
import { ControlledTextField } from '@/shared/ui/controlled'
import { Typography } from '@/shared/ui/typography'
import { clsx } from 'clsx'

import s from './create-new-password.module.scss'

import { CreateNewPasswordFormType, useCreateNewPassword } from './use-create-new-password'

type PropsType = {
  className?: string
  onSubmit: (data: CreateNewPasswordFormType) => void
}

export const CreateNewPasswordForm: FC<PropsType> = ({ className, onSubmit }) => {
  const classes = clsx(s.form, className)

  const { control, handleSubmit } = useCreateNewPassword()

  return (
    <form className={classes} onSubmit={handleSubmit(onSubmit)}>
      <ControlledTextField
        control={control}
        label={'Password'}
        name={'password'}
        type={'password'}
      />
      <Typography className={s.information} variant={'body2'}>
        Enter new password and then sign in with it.
      </Typography>
      <Button fullWidth>Create New Password</Button>
    </form>
  )
}
