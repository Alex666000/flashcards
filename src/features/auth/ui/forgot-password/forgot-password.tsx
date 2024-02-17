import { memo } from 'react'

import {
  ForgotPasswordFormType,
  useForgotPassword,
} from '@/features/auth/ui/forgot-password/use-forgot-password'
import { ROUTES } from '@/shared/lib/constants/route-path'
import { Button } from '@/shared/ui/button'
import { ControlledTextField } from '@/shared/ui/controlled'
import { Typography } from '@/shared/ui/typography'

import s from './forgot-password.module.scss'

type ForgotPasswordPropsType = {
  onForgotPasswordSubmit: (data: ForgotPasswordFormType) => void
}

export const ForgotPasswordForm = memo(({ onForgotPasswordSubmit }: ForgotPasswordPropsType) => {
  const { control, handleSubmit } = useForgotPassword()
  const onSubmit = handleSubmit((data) => onForgotPasswordSubmit(data))

  return (
    <form className={s.forgotPasswordForm} onSubmit={onSubmit}>
      <Typography className={s.title} variant={'large'}>
        Forgot your password?
      </Typography>
      <ControlledTextField className={s.input} control={control} label={'Email'} name={'email'} />
      <Typography className={s.info} variant={'body2'}>
        Enter your email address and we will send you further instructions
      </Typography>
      <Button className={s.button} fullWidth type={'submit'} variant={'primary'}>
        <Typography className={s.buttonText} variant={'subtitle2'}>
          Send Instructions
        </Typography>
      </Button>
      <Typography className={s.sub} variant={'body2'}>
        Did you remember your password?
      </Typography>
      <Typography as={'a'} className={s.tryLog} href={ROUTES.signIn}>
        Try logging in
      </Typography>
    </form>
  )
})
