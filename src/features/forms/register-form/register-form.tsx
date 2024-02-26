import { FC } from 'react'
import { Link } from 'react-router-dom'

import { ROUTES } from '@/shared/lib'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Container } from '@/shared/ui/container'
import { ControlledTextField } from '@/shared/ui/controlled'
import { Typography } from '@/shared/ui/typography'

import s from './register-form.module.scss'

import { RegisterFormData, useRegisterForm } from './use-register-form'

type RegisterFormPropsType = {
  onRegisterFormDataSubmit: (formData: RegisterFormData) => void
}

export const RegisterForm: FC<RegisterFormPropsType> = ({ onRegisterFormDataSubmit }) => {
  // обертка над useForm from 'react-hook-form' для валидации (схема валидации внутри)
  // control -забираем с полей формы то что ввел юзер
  const { control, handleSubmit } = useRegisterForm()

  const handleSetRegisterFormDataSubmit = handleSubmit((formData) => {
    onRegisterFormDataSubmit(formData)
  })

  return (
    <section className={s.registerFormBlock}>
      <Container>
        <Card className={s.registerCard}>
          <Typography as={'h1'} className={s.title} variant={'large'}>
            Sign Up
          </Typography>
          <form className={s.form} onSubmit={handleSetRegisterFormDataSubmit}>
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
            <div className={s.inner}>
              <Typography className={s.subtitle} variant={'body2'}>
                Already have an account?
              </Typography>
              <Button as={Link} className={s.link} to={ROUTES.signIn} variant={'link'}>
                Sign In
              </Button>
            </div>
          </form>
        </Card>
      </Container>
    </section>
  )
}
