import { Link, useNavigate } from 'react-router-dom'

import { useAppSelector } from '@/app/providers'
import { loadingSelector } from '@/features/loading/model/selectors/loading-selector'
import { Logo } from '@/shared/assets'
import { ROUTES } from '@/shared/common/constants'
import { AppContainer } from '@/shared/ui/app-container'
import { Button } from '@/shared/ui/button'
import { LeanerProgress } from '@/shared/ui/loaders-components'
import { Typography } from '@/shared/ui/typography'

import s from './header.module.scss'

type Props = {
    data?: any
}

export const Header = ({ data = false }: Props) => {
    const queryInProgress = useAppSelector(loadingSelector) // видим "Линеар-прогресс"

    // const navigate = useNavigate()
    //
    // const toProfile = () => {
    //     navigate(ROUTES.profile)
    // }

    return (
        <header className={s.header}>
            <AppContainer>
                {/*  Линеар-прогресс  */}
                {queryInProgress && <LeanerProgress />}
                <div className={s.header_inner}>
                    <Link className={s.logo} to={ROUTES.decks}>
                        <Logo className={s.logo_icon} />
                    </Link>
                    {data ? (
                        <nav className={s.menu}>
                            <ul className={s.menu_list}>
                                <li className={s.menu_list_item}>
                                    <Link className={s.menu_list_link} to={'/'}>
                                        <Typography>Александр</Typography>
                                    </Link>
                                </li>
                                <li className={s.menu_list_item}>
                                    <Link className={s.menu_list_link} to={'/'}>
                                        Dropdown с Аватаркой
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    ) : (
                        <Button as={Link} to={ROUTES.signIn}>
                            Sign In
                        </Button>
                    )}
                </div>
            </AppContainer>
        </header>
    )
}

/*
- По макету см: если я не авторизован то увижу Header просто с логотипом и кнопкой Sing In,
а если залогинен увижу Header внутри которого Аватарка и имя пользователя
- Header отрисуем в Лайауте и там передадим авторизационные данные из me() запроса в РТК
 */
