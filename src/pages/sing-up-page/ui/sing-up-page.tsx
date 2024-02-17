import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useSignUpMutation, util } from '@/features/auth/api/auth.api'
import { RegisterForm } from '@/features/forms/register-form/register-form'
import { RegisterFormData } from '@/features/forms/register-form/use-register-form'
import { ROUTES } from '@/shared/lib/constants/route-path'
import { useAppDispatch } from '@/shared/lib/hooks/use-app-dispatch'
import { errorNotification } from '@/shared/lib/utils/error-notification'

const SignUpPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [register, { data, isError }] = useSignUpMutation()

  // " Нейминг: ообработать регистрационные данные отправки"
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
      error ? errorNotification(error) : toast.error('Error register')
    }
  }

  if (data && !isError) {
    navigate(ROUTES.signIn) // Паттерн: если зарегались редиректим на логинизацию (авторизацию)
  }

  return <RegisterForm onRegisterFormDataSubmit={handleRegisterFormDataSubmit} />
}

export default SignUpPage

/*
Sign Up - регистрация
Sign In - логинизация=авторизация
 */
