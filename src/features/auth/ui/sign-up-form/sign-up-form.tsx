import { Button } from '@/shared/ui/button'
import { ControlledTextField } from '@/shared/ui/controlled'
import { clsx } from 'clsx'

import s from './sign-up-form.module.scss'

import { useSignUp } from './use-sign-up'

type Props = {
  className?: string
  onSubmit: (data: any) => void
}

export const SignUpForm = ({ className, onSubmit }: Props) => {
  const classes = clsx(s.form, className)

  const { control, handleSubmit } = useSignUp()

  return (
    <form className={classes} onSubmit={handleSubmit(onSubmit)}>
      <ControlledTextField className={s.email} control={control} label={'Email'} name={'email'} />
      <ControlledTextField
        className={s.password}
        control={control}
        label={'Password'}
        name={'password'}
        type={'password'}
      />
      <ControlledTextField
        control={control}
        label={'Confirm Password'}
        name={'confirmPassword'}
        type={'password'}
      />
      <Button className={s.button} fullWidth>
        Sign Up
      </Button>
    </form>
  )
}
