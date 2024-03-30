import { memo } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useRecoverPasswordMutation } from '@/features/auth/api/auth.api'
import { ForgotPasswordForm, ForgotPasswordFormType } from '@/features/forms'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Container } from '@/shared/ui/container'
import { Page } from '@/shared/ui/page'
import { Typography } from '@/shared/ui/typography'

import s from './forgot-password-page.module.scss'

import { ROUTES, handleRequestOnServer, emailRecoveringTemplate as html } from '../../../shared/lib'

const ForgotPasswordPage = () => {
  const navigate = useNavigate()
  const [recoverPassword, { isSuccess }] = useRecoverPasswordMutation()
  const handleForgotPasswordFormDataSubmit = async ({ email }: ForgotPasswordFormType) => {
    await handleRequestOnServer(async () => {
      await recoverPassword({ email, html }).unwrap()
      navigate(`${ROUTES.checkEmail}/${email}`)
    })
  }

  return (
    <Page>
      <section className={s.forgotPasswordPageBlock}>
        <Container>
          {!isSuccess && (
            <Card className={s.container}>
              <section className={s.content}>
                <Typography as={'h2'} variant={'large'}>
                  Forgot your password?
                </Typography>
                <ForgotPasswordForm
                  className={s.form}
                  onForgotPasswordFormDataSubmit={handleForgotPasswordFormDataSubmit}
                />
                <div className={s.register}>
                  <Typography variant={'body2'}>Did you remember your password?</Typography>
                  <Button as={Link} className={s.signIn} to={ROUTES.signIn} variant={'link'}>
                    Try logging in
                  </Button>
                </div>
              </section>
            </Card>
          )}
        </Container>
      </section>
    </Page>
  )
}

export default memo(ForgotPasswordPage)
