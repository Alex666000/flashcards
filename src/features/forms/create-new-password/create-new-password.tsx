import { FC } from 'react'

import { Button } from '@/shared/ui/button'
import { ControlledTextField } from '@/shared/ui/controlled'
import { Typography } from '@/shared/ui/typography'
import { clsx } from 'clsx'

import s from './create-new-password.module.scss'

import { CreateNewPasswordFormType, useCreateNewPassword } from './use-create-new-password'

type PropsType = {
  className?: string
  onSetCreateNewPasswordSubmit: (data: CreateNewPasswordFormType) => void
}

export const CreateNewPasswordForm: FC<PropsType> = ({
  className,
  onSetCreateNewPasswordSubmit,
}) => {
  const { control, handleSubmit } = useCreateNewPassword()

  return (
    <form className={clsx(s.form, className)} onSubmit={handleSubmit(onSetCreateNewPasswordSubmit)}>
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
