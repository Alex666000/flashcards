import { memo } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useRecoverPasswordMutation } from '@/features/auth/rtk-api/auth.api'
import {
  ForgotPasswordForm,
  ForgotPasswordFormType,
} from '@/features/forms/forgot-passwordforgot-password'
import { ROUTES } from '@/shared/lib/constants/route-path'
import { requestHandler } from '@/shared/lib/utils/request-handler'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Typography } from '@/shared/ui/typography'

import s from './forgot-password-page.module.scss'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [recoverPassword] = useRecoverPasswordMutation()
  const onSubmit = async ({ email }: ForgotPasswordFormType) => {
    await requestHandler(async () => {
      await recoverPassword({ email, html }).unwrap()
      navigate(`${ROUTES.checkEmail}/${email}`)
    })
  }

  return (
    <div className={s.container}>
      <Card>
        <section className={s.content}>
          <Typography as={'h2'} variant={'large'}>
            Forgot your password?
          </Typography>
          <ForgotPasswordForm className={s.form} onSubmit={onSubmit} />
          <div className={s.register}>
            <Typography variant={'body2'}>Did you remember your password?</Typography>
            <Button as={Link} className={s.signIn} to={ROUTES.signIn} variant={'link'}>
              Try logging in
            </Button>
          </div>
        </section>
      </Card>
    </div>
  )
}

export default memo(ForgotPassword)
