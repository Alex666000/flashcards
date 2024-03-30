import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useSignUpMutation, util } from '@/features/auth/api/auth.api'
import { RegisterForm, RegisterFormData } from '@/features/forms'
import { ROUTES, errorNotification, useAppDispatch } from '@/shared/lib'
import { Page } from '@/shared/ui/page'

const SignUpPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [register, { isError }] = useSignUpMutation()

  const handleRegisterFormDataSubmit = async (formData: RegisterFormData) => {
    const registerFormData = {
      email: formData.email,
      name: formData.email,
      password: formData.password,
    }

    try {
      await register(registerFormData)
        .unwrap()
        .then(() => {
          toast.success('You are successfully signed up', { containerId: 'common' })
          dispatch(util?.resetApiState())
        })
    } catch (error) {
      errorNotification(error ?? 'Could not sign up')
    }
  }

  if (!isError) {
    navigate(ROUTES.signIn)
  }

  return (
    <Page>
      <RegisterForm onRegisterFormDataSubmit={handleRegisterFormDataSubmit} />
    </Page>
  )
}

export default memo(SignUpPage)
