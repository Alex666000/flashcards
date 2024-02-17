import { memo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useResetPasswordMutation } from '@/features/auth/rtk-api/auth.api'
import { CreateNewPasswordForm } from '@/features/forms/create-new-password/create-new-password'
import { CreateNewPasswordFormType } from '@/features/forms/create-new-password/use-create-new-password'
import { ROUTES } from '@/shared/lib/constants/route-path'
import { requestHandler } from '@/shared/lib/utils/request-handler'
import { Card } from '@/shared/ui/card'
import { Typography } from '@/shared/ui/typography'

import s from './create-new-password-page.module.scss'

const CreateNewPasswordPage = () => {
  const [resetPassword] = useResetPasswordMutation()
  const navigate = useNavigate()
  const { token } = useParams<{ token: string }>()

  const onSubmit = async ({ password }: CreateNewPasswordFormType) => {
    if (token) {
      await requestHandler(async () => {
        await resetPassword({ password, token }).unwrap()
        navigate(ROUTES.signIn)
        toast.success('The password has been changed', { containerId: 'common' })
      })
    }
  }

  return (
    <div className={s.container}>
      <Card>
        <section className={s.content}>
          <Typography as={'h2'} variant={'large'}>
            Create new password
          </Typography>
          <CreateNewPasswordForm className={s.form} onSubmit={onSubmit} />
        </section>
      </Card>
    </div>
  )
}

export default memo(CreateNewPasswordPage)
