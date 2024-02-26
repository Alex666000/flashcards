import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useSignUpMutation, util } from '@/features/auth/rtk-api/auth.api'
import { RegisterForm, RegisterFormData } from '@/features/forms'
import { ROUTES, errorNotification, useAppDispatch } from '@/shared/lib'
import { Page } from '@/shared/ui/page'

const SignUpPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  // в мутациях 1 параметр функция которую вызываем и засовываем данные в нее
  // тут вызываем даем данные но на основании их не отрисовываем ничего а просто регистрируемся
  // и редиректимся на страницу логина
  const [register, { isError }] = useSignUpMutation()

  // "Нейминг: "обработать регистрационные данные отправки"
  const handleRegisterFormDataSubmit = async (formData: RegisterFormData) => {
    const registerFormData = {
      email: formData.email, // обязательное поле что в апишке: им присваиваем то что вбил user
      name: formData.email,
      password: formData.password, // обязательное поле что в апишке: им присваиваем то что вбил user
    }

    try {
      // вызвав функцию с мутации мы отправляем запрос на сервер с данными что ввел юзер
      await register(registerFormData)
        // unwrap - без него в catch не попадем
        .unwrap()
        .then(() => {
          // если все хорошо оповещаем юзера
          toast.success('You are successfully signed up', { containerId: 'common' })
          dispatch(util?.resetApiState())
        })
    } catch (error) {
      // если плохо показываем юзеру ошибку
      errorNotification(error ?? 'Could not sign up') // или toast.error(error?.data?.message ?? 'Could not sign up')
    }
  }

  // Паттерн: если зарегались редиректим на логинизацию (авторизацию)
  // вместо ошибки можно достать data и ее написать в if
  if (!isError) {
    navigate(ROUTES.signIn)
  }

  // каждую страницу оборачиваем в Page
  return (
    <Page>
      <RegisterForm onRegisterFormDataSubmit={handleRegisterFormDataSubmit} />
    </Page>
  )
}

export default memo(SignUpPage)

/*
Sign Up - регистрация
Sign In - логинизация=авторизация
 */
