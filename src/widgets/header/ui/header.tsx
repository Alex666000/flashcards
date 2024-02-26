import { memo } from 'react'
import { Link } from 'react-router-dom'

import { LogoIcon } from '@/shared/assets'
import { LogOutIcon } from '@/shared/assets/icons/sutarday-icons/LogOutIcon'
import { Person } from '@/shared/assets/icons/sutarday-icons/Person'
import { ROUTES } from '@/shared/lib/constants/route-path'
import { Avatar } from '@/shared/ui/avatar-s'
import { Button } from '@/shared/ui/button'
import { Container } from '@/shared/ui/container'
import { Dropdown, DropdownItem, DropdownItemWithIcon } from '@/shared/ui/dropdown-s'
import { LeanerProgress } from '@/shared/ui/loaders-components/loaders'
import { Typography } from '@/shared/ui/typography'
import { ProfileInfo } from '@/widgets'

import s from './header.module.scss'

type Props = {
  avatar?: string
  email?: string
  isAuth: boolean
  isLoading: boolean
  name?: string
  onLoginUserClick?: () => void
  onLogoutUserClick: () => void
  onRedirectToProfileClick: () => void
}

export const Header = memo((props: Props) => {
  const {
    avatar = '',
    email = 'NoNameEmail@.com',
    isAuth,
    isLoading,
    name = 'Some_Name',
    onLoginUserClick,
    onLogoutUserClick,
    onRedirectToProfileClick,
  } = props

  return (
    <header className={s.headerBlock}>
      <Container className={s.headerContainer}>
        <Button as={Link} className={s.link} to={ROUTES.decks} variant={'link'}>
          <LogoIcon className={s.logo} />
        </Button>
        {isAuth ? (
          <div className={s.userNameOrEmail}>
            <Typography as={Link} className={s.name} to={ROUTES.profile} variant={'subtitle1'}>
              {name || email}
            </Typography>
            <Dropdown
              trigger={
                <button className={s.dropdownButton}>
                  <Avatar photoOrImage={avatar} userName={name || email} />
                </button>
              }
            >
              {/* Item с инфой профиля: иконка + имя (почта) профиля */}
              <DropdownItem>
                <ProfileInfo avatar={avatar} email={email} name={name} />
              </DropdownItem>
              {/* Item с иконкой слева и текстом справа */}
              <DropdownItemWithIcon
                icon={<Person />}
                onSelect={onRedirectToProfileClick}
                text={'Profile'}
              />
              {/* Item с иконкой слева и текстом справа */}
              <DropdownItemWithIcon
                icon={<LogOutIcon />}
                onSelect={onLogoutUserClick}
                text={'Sign out'}
              />
            </Dropdown>
          </div>
        ) : (
          <Button onClick={onLoginUserClick} variant={'primary'}>
            Sign In
          </Button>
        )}
      </Container>
      {/* если тут написать то одновременно срабатывает при загрузке и LeanerProgress сверху
      и крутилка по середине экрана - то что надо или в идеале сначала крутилка потом Скелетон */}
      {isLoading ? <LeanerProgress /> : ''}
    </header>
  )
})
/*
-headerContainer - берет все стили контейнера проекта + стили для headerContainer этой компоненты
- теория Dropdown - в моем ui kit-e см.
 */
