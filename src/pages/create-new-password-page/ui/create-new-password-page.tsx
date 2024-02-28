import { memo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useResetPasswordMutation } from '@/features/auth/api/auth.api'
import { CreateNewPasswordForm, CreateNewPasswordFormType } from '@/features/forms'
import { handleRequestOnServer } from '@/shared/lib'
import { ROUTES } from '@/shared/lib/constants/route-path'
import { Card } from '@/shared/ui/card'
import { Container } from '@/shared/ui/container'
import { Page } from '@/shared/ui/page'
import { Typography } from '@/shared/ui/typography'

import s from './create-new-password-page.module.scss'

const CreateNewPasswordPage = () => {
  const navigate = useNavigate()
  // с урла достаем токен
  const { token } = useParams<{ token: string }>()

  const [resetPassword] = useResetPasswordMutation()

  const handleSetCreateNewPasswordSubmit = async ({ password }: CreateNewPasswordFormType) => {
    if (token) {
      await handleRequestOnServer(async () => {
        // отправляем запрос на сервак
        await resetPassword({ password, token }).unwrap()
        navigate(ROUTES.signIn)
        toast.success('The password has been changed', { containerId: 'common' })
      })
    }
  }

  return (
    <Page>
      <Container>
        <section className={s.container}>
          <Card>
            <section className={s.content}>
              <Typography as={'h2'} variant={'large'}>
                Create new password
              </Typography>
              <CreateNewPasswordForm
                className={s.form}
                onSetCreateNewPasswordSubmit={handleSetCreateNewPasswordSubmit}
              />
            </section>
          </Card>
        </section>
      </Container>
    </Page>
  )
}

export default memo(CreateNewPasswordPage)
