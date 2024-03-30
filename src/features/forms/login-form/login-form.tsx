import { FC } from 'react'
import { Link } from 'react-router-dom'

import { ROUTES } from '@/shared/lib'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Container } from '@/shared/ui/container'
import { ControlledCheckbox, ControlledTextField } from '@/shared/ui/controlled'
import { Typography } from '@/shared/ui/typography'

import s from './login-form.module.scss'

import { LoginBodyArgs } from '../../auth'
import { useLoginForm } from './use-login-form'

type PropsType = {
  onLoginFormDataSubmit: (formData: LoginBodyArgs) => void
}

export const LoginForm: FC<PropsType> = ({ onLoginFormDataSubmit }) => {
  const { control, handleSubmit } = useLoginForm()
  const handleSetLoginFormDataSubmit = handleSubmit((formData) => onLoginFormDataSubmit(formData))

  return (
    <section className={s.loginFormBlock}>
      <Container>
        <Card className={s.loginCard}>
          <Typography as={'h1'} className={s.title} variant={'large'}>
            Sign In
          </Typography>
          <form onSubmit={handleSetLoginFormDataSubmit}>
            <div className={s.loginForm}>
              <ControlledTextField
                control={control}
                label={'Email'}
                name={'email'}
                type={'email'}
              />
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
              as={Link}
              className={s.recoverPasswordLink}
              to={ROUTES.recoverPassword}
              variant={'body2'}
            >
              Forgot Password?
            </Typography>
            <Button className={s.button} fullWidth type={'submit'}>
              <Typography variant={'subtitle2'}>Sign In</Typography>
            </Button>
            <Typography className={s.caption} variant={'body2'}>
              Don&apos;t have an account?
            </Typography>
            <Typography as={Link} className={s.signUpLink} to={ROUTES.singUp} variant={'link1'}>
              Sign Up
            </Typography>
          </form>
        </Card>
      </Container>
    </section>
  )
}
