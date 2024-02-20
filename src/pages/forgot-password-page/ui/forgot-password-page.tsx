import { memo } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useRecoverPasswordMutation } from '@/features/auth/rtk-api/auth.api'
import {
  ForgotPasswordForm,
  ForgotPasswordFormType,
} from '@/features/forms/forgot-passwordforgot-password'
import { emailRecoveringTemplate as html } from '@/shared/lib/constants/email-recovering-template'
import { ROUTES } from '@/shared/lib/constants/route-path'
import { handleRequest } from '@/shared/lib/utils/handle-request'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Container } from '@/shared/ui/container'
import { Typography } from '@/shared/ui/typography'

import s from './forgot-password-page.module.scss'

const ForgotPasswordPage = () => {
  const navigate = useNavigate()
  const [recoverPassword] = useRecoverPasswordMutation()

  const onSubmit = async ({ email }: ForgotPasswordFormType) => {
    await handleRequest(async () => {
      // отправляем на почту юзера письмо о восстановление пароля
      await recoverPassword({ email, html }).unwrap()
      // редиректим на страницу:
      navigate(`${ROUTES.checkEmail}/${email}`)
    })
  }

  return (
    <section className={s.forgotPasswordPageBlock}>
      <Container>
        <Card className={s.container}>
          <section className={s.content}>
            <Typography as={'h2'} variant={'large'}>
              Forgot your password?
            </Typography>
            {/* форма с одним полем: email */}
            <ForgotPasswordForm className={s.form} onSubmit={onSubmit} />
            <div className={s.register}>
              <Typography variant={'body2'}>Did you remember your password?</Typography>
              <Button as={Link} className={s.signIn} to={ROUTES.signIn} variant={'link'}>
                Try logging in
              </Button>
            </div>
          </section>
        </Card>
      </Container>
    </section>
  )
}

export default memo(ForgotPasswordPage)
