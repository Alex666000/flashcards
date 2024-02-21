import { PropsWithChildren } from 'react'

import { SignInFormProps, useSignIn } from '@/features/auth'
import { Button } from '@/shared/ui/button'
import { ControlledCheckbox, ControlledTextField } from '@/shared/ui/controlled'
import { Typography } from '@/shared/ui/typography'

import s from './sign-in.module.scss'

type Props = {
  className?: string
  onSubmit: (data: SignInFormProps) => void
} & PropsWithChildren

/**
 * В форме пропсом вынули класс переданный сверху: form className={className}
 */
export const SignInForm = ({ children, onSubmit }: Props) => {
  const { control, handleSubmit } = useSignIn()

  return (
    <>
      <Typography as={'h2'} variant={'large'}>
        Sign In
      </Typography>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <ControlledTextField className={s.email} control={control} label={'Email'} name={'email'} />
        <ControlledTextField
          className={s.password}
          control={control}
          label={'Password'}
          name={'password'}
          type={'password'}
        />
        <ControlledCheckbox
          className={s.checkbox}
          control={control}
          label={'Remember Me'}
          name={'rememberMe'}
        />
        {children}
        <Button className={s.button} fullWidth>
          Sign In
        </Button>
      </form>
    </>
  )
}
