import { FC } from 'react'

import { Button } from '@/shared/ui/button'
import { ControlledTextField } from '@/shared/ui/controlled'
import { Typography } from '@/shared/ui/typography'
import { clsx } from 'clsx'

import s from './forgot-password.module.scss'

import { ForgotPasswordFormType, useForgotPassword } from './use-forgot-password'

type PropsType = {
  className?: string
  onSubmit: (data: ForgotPasswordFormType) => void
}

export const ForgotPasswordForm: FC<PropsType> = ({ className, onSubmit }) => {
  const classes = clsx(s.form, className)

  const { control, handleSubmit } = useForgotPassword()

  return (
    <form className={classes} onSubmit={handleSubmit(onSubmit)}>
      <ControlledTextField control={control} label={'Email'} name={'email'} />
      <Typography className={s.information} variant={'body2'}>
        Enter your email address and we will send you further instructions
      </Typography>
      <Button fullWidth>Send Instructions</Button>
    </form>
  )
}
