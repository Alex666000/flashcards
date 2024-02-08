import { Link, useNavigate } from 'react-router-dom'

import { useAppSelector } from '@/app/providers'
import { loadingSelector } from '@/features/loading/model/selectors/loading-selector'
import { Logo } from '@/shared/assets'
import { ROUTES } from '@/shared/common/constants'
import { AppContainer } from '@/shared/ui/app-container'
import { Avatar } from '@/shared/ui/avatar'
import { Button } from '@/shared/ui/button'
import { DropDown, DropDownItem, DropDownItemWithIcon } from '@/shared/ui/drop-down_'
import { Icon } from '@/shared/ui/icon'
import { LeanerProgress } from '@/shared/ui/loaders-components'
import { Typography } from '@/shared/ui/typography'
import { ProfileInfo } from '@/widgets/profile-info'

import s from './header.module.scss'

type Props = {
  data?: any
  logout?: () => void
}

export const Header = ({ data = false, logout }: Props) => {
  const queryInProgress = useAppSelector(loadingSelector) // видим "Линеар-прогресс"

  const navigate = useNavigate()

  const toProfile = () => {
    navigate(ROUTES.profile)
  }

  return (
    <header className={s.header}>
      <div className={'container'}>
        {/*  Линеар-прогресс  */}
        {queryInProgress && <LeanerProgress />}
        <div className={s.header_inner}>
          <Link className={s.link} to={ROUTES.decks}>
            <Logo className={s.icon} />
          </Link>
          {/*{data ? (*/}
          {/*    <div className={s.user}>*/}
          {/*        <Typography*/}
          {/*            as={Link}*/}
          {/*            className={s.name}*/}
          {/*            to={ROUTES.profile}*/}
          {/*            variant={'subtitle1'}*/}
          {/*        >*/}
          {/*            {data.name || data.email}*/}
          {/*        </Typography>*/}
          {/*        <DropDown*/}
          {/*            trigger={*/}
          {/*                <button className={s.dropdownButton}>*/}
          {/*                    <Avatar*/}
          {/*                        image={data.avatar}*/}
          {/*                        size={48}*/}
          {/*                        userName={data.name || data.email}*/}
          {/*                    />*/}
          {/*                </button>*/}
          {/*            }*/}
          {/*        >*/}
          {/*            <DropDownItem>*/}
          {/*                <ProfileInfo {...data} />*/}
          {/*            </DropDownItem>*/}
          {/*            <DropDownItemWithIcon*/}
          {/*                icon={<Icon name={'user'} />}*/}
          {/*                onSelect={toProfile}*/}
          {/*                text={'Profile'}*/}
          {/*            />*/}
          {/*            <DropDownItemWithIcon*/}
          {/*                icon={<Icon name={'logout'} />}*/}
          {/*                onSelect={logout}*/}
          {/*                text={'Sign out'}*/}
          {/*            />*/}
          {/*        </DropDown>*/}
          {/*    </div>*/}
          {/*) : (*/}
          {/*    <Button as={Link} to={ROUTES.signIn}>*/}
          {/*        Sign In*/}
          {/*    </Button>*/}
          {/*)}*/}
          <Button as={Link} to={ROUTES.signIn}>
            Sign In
          </Button>
        </div>
      </div>
    </header>
  )
}
// Правила вертски: название секции - контеинер приложения - свой контейнер - контент блока - остальные стили
/*
- По макету см: если я не авторизован то увижу Header просто с логотипом и кнопкой Sing In,
а если залогинен увижу Header внутри которого Аватарка и имя пользователя
- Header отрисуем в Лайауте и там передадим авторизационные данные из me() запроса в РТК
 */
