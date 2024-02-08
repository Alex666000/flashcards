import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useAppDispatch } from '@/app/providers'
import { LoginArgs } from '@/features/auth'
import { useLoginMutation, useMeQuery, util } from '@/features/auth/api/auth.api'
import { LoginForm } from '@/features/login-form/login-form'
import { ROUTES } from '@/shared/common/constants'
import { errorNotification } from '@/shared/common/utils/error-notification'

const SingInPage = memo(() => {
  const navigate = useNavigate()
  const { data: meData, isError } = useMeQuery()
  const [login] = useLoginMutation()
  const dispatch = useAppDispatch()

  const handleLogin = async (data: LoginArgs) => {
    try {
      await login(data)
        .unwrap()
        .then(() => {
          dispatch(util?.resetApiState())
          toast.success('You are successfully authorized')
          navigate(ROUTES.decks)
        })
    } catch (error) {
      errorNotification(error)
    }
  }

  if (meData && !('success' in meData) && !isError) {
    navigate(ROUTES.decks)
  }

  return <LoginForm onSubmitHandler={handleLogin} />
})

export default SingInPage

/*
- ограничили ширину карточки контейнером, а не на всю страницу: div className={s.form_container}
- &apos; - апостраф ' сверху над буквой
- или так ограничивем контейнером: <div className={'container'}> или так: <AppContainer></AppContainer>
*/
