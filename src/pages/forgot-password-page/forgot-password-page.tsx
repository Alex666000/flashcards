import { useNavigate } from 'react-router-dom'

import { useRecoverPasswordMutation } from '@/features/auth/api/auth.api'
import { ForgotPasswordForm } from '@/features/auth/ui/forgot-password/forgot-password'
import { ForgotPasswordFormType } from '@/features/auth/ui/forgot-password/use-forgot-password'
import { ROUTES } from '@/shared/common/constants'
import { htmlCodeResetPassword } from '@/shared/common/constants/html-mail-reset-password'

export const ForgotPasswordPage = () => {
  const navigate = useNavigate()
  const [recoverPassword] = useRecoverPasswordMutation()

  const recoverPasswordHandler = async (data: ForgotPasswordFormType) => {
    const RequestData = {
      email: data.email,
      html: htmlCodeResetPassword,
    }

    await recoverPassword(RequestData)
      .unwrap()
      .then(() => {
        navigate(ROUTES.check_email)
      })
      .catch((e) => {
        throw new Error(e)
      })
  }

  return <ForgotPasswordForm handleForgotPasswordSubmit={recoverPasswordHandler} />
}
