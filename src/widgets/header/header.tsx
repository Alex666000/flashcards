import { Link } from 'react-router-dom'

import { Logo } from '@/shared/assets'
import { ROUTES } from '@/shared/lib/router-common/routes'
import { Button } from '@/shared/ui/button'

import s from './header.module.scss'

type Props = {}

export const Header = (props: Props) => {
    return (
        <header className={s.header}>
            <div className={s.container}>
                <Link className={s.link} to={ROUTES.decks}>
                    <Logo className={s.logo} />
                </Link>
                <Button as={Link} to={ROUTES.signIn}>
                    Sign in
                </Button>
            </div>
        </header>
    )
}
