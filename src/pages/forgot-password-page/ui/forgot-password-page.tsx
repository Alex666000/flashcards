import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useRecoverPasswordMutation } from '@/features/auth/rtk-api/auth.api'
import { ForgotPasswordForm } from '@/features/auth/ui/forgot-password/forgot-password'
import { ForgotPasswordFormType } from '@/features/auth/ui/forgot-password/use-forgot-password'
import { htmlCodeResetPassword } from '@/shared/lib/constants/html-mail-reset-password'
import { ROUTES } from '@/shared/lib/constants/route-path'
import { errorNotification } from '@/shared/lib/utils/error-notification'

const ForgotPasswordPage = () => {
  const navigate = useNavigate()
  const [recoverPassword] = useRecoverPasswordMutation()

  const handleRecoverPassword = async (data: ForgotPasswordFormType) => {
    const forgotPasswordData = {
      email: data.email,
      html: htmlCodeResetPassword,
    }

    try {
      await recoverPassword(forgotPasswordData)
        .unwrap()
        .then(() => {
          toast.success('password has been sent to your email', { containerId: 'common' })
          navigate(ROUTES.check_email)
        })
    } catch (error) {
      error ? errorNotification(error) : toast.error('Error register')
    }
  }

  return <ForgotPasswordForm onForgotPasswordSubmit={handleRecoverPassword} />
}

export default memo(ForgotPasswordPage)
