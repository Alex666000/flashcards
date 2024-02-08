import { useNavigate } from 'react-router-dom'

import { useSignUpMutation } from '@/features/auth/api/auth.api'
import { RegisterForm } from '@/features/register-form/register-form'
import { RegisterFormType } from '@/features/register-form/use-register-form'
import { ROUTES } from '@/shared/common/constants'

const SignUpPage = () => {
  const navigate = useNavigate()
  const [register, { data }] = useSignUpMutation()

  const handleRegister = (data: RegisterFormType) => {
    const transformData = { email: data.email, name: data.email, password: data.password }

    register(transformData)
  }

  if (data) {
    navigate(ROUTES.signIn)
  }

  return <RegisterForm onSubmitHandler={handleRegister} />
}

export default SignUpPage

/*
Sign Up - регистрация
Sign In - логинизация=авторизация
 */
