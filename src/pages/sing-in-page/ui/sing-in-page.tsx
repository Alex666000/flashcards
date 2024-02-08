import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useAppDispatch } from '@/app/providers'
import { LoginArgs } from '@/features/auth'
import { useLoginMutation, useMeQuery, util } from '@/features/auth/api/auth.api'
import { SignInForm } from '@/features/auth/ui/sing-in-form/sing-in-form'
import { ROUTES } from '@/shared/common/constants'
import { errorNotification } from '@/shared/common/utils/error-notification'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Typography } from '@/shared/ui/typography'

import s from './sign-in-page.module.scss'

const SingInPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [login] = useLoginMutation() // будем вызывать login когда будем "сабмитить" форму
  // const { data: meData } = useMeQuery()

  const handleLogin = async (data: LoginArgs) => {
    try {
      await login(data).unwrap()
      dispatch(util?.resetApiState())
      toast.success('You are successfully authorized', { containerId: 'common' }) // Выводим уведомление об успешной авторизации
      navigate(ROUTES.decks)
    } catch (error) {
      errorNotification(error)
    }
  }

  // if (meData && !('success' in meData)) {
  //   navigate(ROUTES.decks)
  // }

  return (
    <section className={s.singInPage}>
      <div className={'container'}>
        <div className={s.form_container}>
          <Card>
            <div className={s.content}>
              <SignInForm onSubmit={handleLogin}>
                <div className={s.link_container}>
                  <Typography as={Link} to={ROUTES.recoverPassword} variant={'body2'}>
                    Forgot Password?
                  </Typography>
                </div>
              </SignInForm>
              <div className={s.register_buttonAsLink}>
                <Typography variant={'body2'}>Don&apos;t have an account?</Typography>
                <Button as={Link} className={s.signUp} to={ROUTES.singUp} variant={'link'}>
                  Sign Up
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default SingInPage

/*
- ограничили ширину карточки контейнером, а не на всю страницу: div className={s.form_container}
- &apos; - апостраф ' сверху над буквой
- или так ограничивем контейнером: <div className={'container'}> или так: <AppContainer></AppContainer>
*/
