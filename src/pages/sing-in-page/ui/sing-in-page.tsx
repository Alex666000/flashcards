import { Link } from 'react-router-dom'

import { SignInForm } from '@/features/auth/ui/sing-in-form/sing-in-form'
import { ROUTES } from '@/shared/common/constants'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Typography } from '@/shared/ui/typography'

import s from './sign-in-page.module.scss'

import { AppContainer } from '../../../shared/ui/app-container'

type Props = {}

const SingInPage = ({}: Props) => {
    // const [login] = useLoginMutation()
    // const { data: me } = useGetMeQuery()

    const loginHandler = () => {
        // await requestHandler(async () => {
        //     await login(data).unwrap()
        //     toast.success('You are successfully authorized', { containerId: 'common' })
        // })
        console.log('IS LoggedIn')
    }

    // if (me && !('success' in me)) return <Navigate to={ROUTES.packs} />

    return (
        <AppContainer>
            <Card className={s.singInForm_container}>
                <section className={s.singInForm_section}>
                    {/* Форма логинизации: */}
                    <Typography as={'h2'} variant={'large'}>
                        Sign In
                    </Typography>
                    <SignInForm className={s.singInForm} onSubmit={loginHandler}>
                        <div className={s.form_link}>
                            {/* children формы: */}
                            <Typography as={Link} to={ROUTES.recover_password} variant={'body2'}>
                                Forgot Password?
                            </Typography>
                        </div>
                    </SignInForm>
                    {/* Кнопка регистрации: */}
                    <div className={s.register_buttonAsLink}>
                        <Typography variant={'body2'}>Don&apos;t have an account?</Typography>
                        <Button as={Link} className={s.signUp} to={ROUTES.signIn} variant={'link'}>
                            Sign Up
                        </Button>
                    </div>
                </section>
            </Card>
        </AppContainer>
    )
}

export default SingInPage

/*
- ограничили ширину карточки контейнером а не на всю страницу: div className={s.form_container}
- &apos; - апостраф ' сверху над буквой
*/
