import { memo } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useRecoverPasswordMutation } from '@/features/auth/rtk-api/auth.api'
import { ForgotPasswordForm, ForgotPasswordFormType } from '@/features/forms'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Container } from '@/shared/ui/container'
import { Typography } from '@/shared/ui/typography'

import s from './forgot-password-page.module.scss'

import { ROUTES, handleRequest, emailRecoveringTemplate as html } from '../../../shared/lib'

const ForgotPasswordPage = () => {
  const navigate = useNavigate()
  const [recoverPassword] = useRecoverPasswordMutation()

  // кликнули на "забыли пароль?" - редиректит на стр. recover-password, ввел свой email в
  // инпуте снизу, email пришел вверх через колбек сюда и отправляю по такому адресу
  // (см нетворк и доку сваггер: https://api.flashcards.andrii.es/v1/auth/recover-password)
  // email + html (для красоты письма на почту - на нее придет окен) - то что отправляем см в Network
  // в Headers
  // на почту пришла ссылка я кликаю ее меня редиректит на стр: /create-new-password/7889507e-b17d-4f03-943b-68cb215e6087
  // где последнее это токен -- ввожу новый пароль и смотрю нетворк какой запрос уходит и смотрю доку
  // что в хедерах мне отправлять: https://api.flashcards.andrii.es/v1/auth/reset-password/7889507e-b17d-4f03-943b-68cb215e6087
  const onSubmit = async ({ email }: ForgotPasswordFormType) => {
    await handleRequest(async () => {
      // отправляем на почту юзера письмо о восстановление пароля
      await recoverPassword({ email, html }).unwrap()
      // редиректим на страницу: //
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
