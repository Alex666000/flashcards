import { Link, useNavigate } from 'react-router-dom'

import { StatusType } from '@/app/model/slice/app.slice'
import { MainLogo } from '@/shared/assets/icons/sutarday-icons/Incubator-logo'
import { LogOutIcon } from '@/shared/assets/icons/sutarday-icons/LogOutIcon'
import { Person } from '@/shared/assets/icons/sutarday-icons/Person'
import { ROUTES } from '@/shared/common/constants'
import { AppContainer } from '@/shared/ui/app-container'
import { Avatar } from '@/shared/ui/avatar-s'
import { Button } from '@/shared/ui/button'
import { Dropdown, DropdownItem, DropdownItemWithIcon } from '@/shared/ui/dropdown-s'
import { LeanerProgress } from '@/shared/ui/loaders-components'
import { Typography } from '@/shared/ui/typography'

import styles from './header.module.scss'

type Props = {
  avatar?: string
  email?: string
  isAuth: boolean
  isLoading: StatusType
  name?: string
  onProfileClick: () => void
  onSignIn?: () => void
  onSignOut: () => void
}

export const Header = ({
  avatar = '',
  email = 'NoNameEmail@.com',
  isAuth,
  isLoading = 'idle',
  name = 'NoName',
  onProfileClick,
  onSignIn,
  onSignOut,
}: Props) => {
  const navigate = useNavigate()

  return (
    <div className={styles.header}>
      <AppContainer className={styles.container}>
        <div className={styles.logo}>
          <Button as={Link} to={ROUTES.decks} variant={'link'}>
            <MainLogo />
          </Button>
        </div>
        <div className={styles.rightItem}>
          {!isAuth ? (
            <div className={styles.button}>
              <Button onClick={onSignIn} variant={'primary'}>
                Sign In
              </Button>
            </div>
          ) : (
            <div className={styles.userTrigger}>
              <Typography className={styles.userName} variant={'subtitle1'}>
                {name}
              </Typography>
              <Dropdown
                trigger={
                  <button>
                    <Avatar name={name} photo={avatar} />
                  </button>
                }
              >
                <DropdownItem onSelect={() => navigate(ROUTES.profile)}>
                  <div className={styles.userInfoContainer}>
                    <Avatar name={name} photo={avatar} />
                    <div className={styles.userDetails}>
                      <Typography variant={'subtitle2'}>{name}</Typography>
                      <Typography className={styles.userEmail} variant={'caption'}>
                        {email}
                      </Typography>
                    </div>
                  </div>
                </DropdownItem>
                <DropdownItemWithIcon
                  icon={<Person />}
                  onSelect={onProfileClick}
                  text={'Profile'}
                />
                <DropdownItemWithIcon
                  icon={<LogOutIcon />}
                  onSelect={onSignOut}
                  text={'Sign out'}
                />
              </Dropdown>
            </div>
          )}
        </div>
      </AppContainer>
      {isLoading === 'loading' ? <LeanerProgress /> : ''}
    </div>
  )
}
