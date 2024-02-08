import { Link } from 'react-router-dom'

import { ROUTES } from '@/shared/common/constants'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Typography } from '@/shared/ui/typography'

import s from './sign-up.module.scss'

/**
 Страница: никогда не запрашивает данные - она тупая компонента, отрисовывает данные лишь..
 */
const SignUpPage = () => {
  return (
    <Card>
      <section className={s.singUpPage}>
        <div className={s.container}>
          <div className={s.content}>
            <Typography as={'h2'} className={s.title} variant={'large'}>
              Sign Up
            </Typography>
            {/*<RegisterForm className={s.form} onSubmit={onSubmit} />*/}
            Register form
            <div className={s.login}>
              <Typography variant={'body2'}>Already have an account?</Typography>
              <Button as={Link} className={s.signIn} to={ROUTES.signIn} variant={'link'}>
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Card>
  )
}

export default SignUpPage

/*
Sign Up - регистрация
Sign In - логинизация=авторизация
 */
