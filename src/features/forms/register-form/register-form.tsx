import { FC } from 'react'
import { Link } from 'react-router-dom'

import { RegisterFormData, useRegisterForm } from '@/features/forms/register-form/use-register-form'
import { ROUTES } from '@/shared/lib/constants/route-path'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Container } from '@/shared/ui/container'
import { ControlledTextField } from '@/shared/ui/controlled'
import { Typography } from '@/shared/ui/typography'

import s from './register-form.module.scss'

type RegisterFormPropsType = {
  onRegisterFormDataSubmit: (data: RegisterFormData) => void
}

export const RegisterForm: FC<RegisterFormPropsType> = ({ onRegisterFormDataSubmit }) => {
  const { control, handleSubmit } = useRegisterForm()

  const onSubmit = handleSubmit((data) => {
    onRegisterFormDataSubmit(data)
  })

  return (
    <section className={s.registerFormBlock}>
      <Container>
        <Card className={s.card}>
          <Typography as={'h1'} className={s.title} variant={'large'}>
            Sign Up
          </Typography>
          <form className={s.form} onSubmit={onSubmit}>
            <ControlledTextField control={control} label={'Email'} name={'email'} />
            <ControlledTextField
              control={control}
              label={'Password'}
              name={'password'}
              type={'password'}
            />
            <ControlledTextField
              control={control}
              label={'Confirm Password'}
              name={'confirm'}
              type={'password'}
            />
            <Button className={s.button} fullWidth type={'submit'}>
              <Typography variant={'subtitle2'}>Sign Up</Typography>
            </Button>
            <Typography className={s.subtitle} variant={'body2'}>
              Already have an account?
            </Typography>
            <Button as={Link} className={s.link} to={ROUTES.signIn} variant={'link'}>
              Sign In
            </Button>
          </form>
        </Card>
      </Container>
    </section>
  )
}
