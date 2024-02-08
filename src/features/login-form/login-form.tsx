import { FC } from 'react'
import { Link } from 'react-router-dom'

import { LoginArgs } from '@/features/auth'
import { ROUTES } from '@/shared/common/constants'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { ControlledCheckbox, ControlledTextField } from '@/shared/ui/controlled'
import { Typography } from '@/shared/ui/typography'

import s from './login-form.module.scss'

import { useLoginForm } from './use-login-form'

type PropsType = {
  onSubmitHandler: (data: LoginArgs) => void
}

export const LoginForm: FC<PropsType> = ({ onSubmitHandler }) => {
  const { control, handleSubmit } = useLoginForm()
  const onSubmit = handleSubmit((data) => onSubmitHandler(data))

  return (
    <Card className={s.card}>
      <Typography as={'h1'} className={s.title} variant={'large'}>
        Sign In
      </Typography>
      <form onSubmit={onSubmit}>
        <div className={s.form}>
          <ControlledTextField control={control} label={'Email'} name={'email'} />
          <ControlledTextField
            control={control}
            label={'Password'}
            name={'password'}
            type={'password'}
          />
          <ControlledCheckbox
            className={s.checkbox}
            control={control}
            label={'Remember me'}
            name={'rememberMe'}
          />
        </div>
        <Typography
          as={'a'}
          className={s.recoverPasswordLink}
          href={ROUTES.recoverPassword}
          variant={'body2'}
        >
          Forgot Password?
        </Typography>
        <Button className={s.button} fullWidth type={'submit'}>
          <Typography variant={'subtitle2'}>Sign In</Typography>
        </Button>
        <Typography className={s.caption} variant={'body2'}>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Don't have an account?
        </Typography>
        <Typography as={Link} className={s.signUpLink} to={ROUTES.singUp} variant={'link1'}>
          Sign Up
        </Typography>
      </form>
    </Card>
  )
}
