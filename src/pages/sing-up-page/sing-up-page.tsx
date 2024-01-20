import { Link } from 'react-router-dom'

import { SignUpForm } from '@/features/auth/ui/sign-up-form/sign-up-form'
import { ROUTES } from '@/shared/lib/router-common/routes'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Typography } from '@/shared/ui/typography'

import s from './sign-up.module.scss'

/**
Страница: никогда не запрашивает данные - она тупая компонента, отрисовывает данные лишь..
 */
export const SingUpPage = () => {
    return (
        <Card>
            <section className={s.singUpPage}>
                <div className={s.container}>
                    <div className={s.content}>
                        <Typography as={'h2'} className={s.title} variant={'large'}>
                            Sign Up
                        </Typography>
                        <SignUpForm className={s.form} onSubmit={onSubmit} />
                        <div className={s.login}>
                            <Typography variant={'body2'}>Already have an account?</Typography>
                            <Button
                                as={Link}
                                className={s.signIn}
                                to={ROUTES.signIn}
                                variant={'link'}
                            >
                                Sign In
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </Card>
    )
}
