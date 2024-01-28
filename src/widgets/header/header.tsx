import { Link } from 'react-router-dom'

import { Logo } from '@/shared/assets'
import { PATH } from '@/shared/common/constants'
import { Button } from '@/shared/ui/button'

import s from './header.module.scss'

type Props = {}

export const Header = (props: Props) => {
    return (
        <header className={s.header}>
            <div className={s.container}>
                <Link className={s.link} to={PATH.DECKS}>
                    <Logo className={s.logo} />
                </Link>
                <Button as={Link} to={PATH.SING_IN}>
                    Sign in
                </Button>
            </div>
        </header>
    )
}

/*
- По макету, если я не авторизован увижу Хедер, а если залогинен увижу Хедер внутри которого Аватарка
и имя пользователя
 */
