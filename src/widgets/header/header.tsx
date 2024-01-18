import { FC, memo } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAppSelector } from '@/app/store/store'
import { Avatar } from '@/shared/ui/avatar'
import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon/icon'
import { Typography } from '@/shared/ui/typography'

import s from './header.module.scss'

import { DropDown, DropDownItem, DropDownItemWithIcon } from '../ui/drop-down'
import { ProfileInfo, ProfileInfoProps } from './profile-info'

type Props = {
    data: ProfileInfoProps | null
    logout: () => void
}

export const Header: FC<Props> = memo(({ data, logout }) => {
    const queryInProgress = useAppSelector(loadingSelector)

    const navigate = useNavigate()

    const toProfile = () => {
        navigate(ROUTES.profile)
    }

    return (
        <div className={s.root}>
            {queryInProgress && <QueryLoading />}
            <div className={s.container}>
                <Link className={s.link} to={ROUTES.packs}>
                    <Logo className={s.logo} />
                </Link>
                {data ? (
                    <div className={s.user}>
                        <Typography
                            as={Link}
                            className={s.name}
                            to={ROUTES.profile}
                            variant={'subtitle1'}
                        >
                            {data.name || data.email}
                        </Typography>
                        <DropDown
                            trigger={
                                <button className={s.dropdownButton}>
                                    <Avatar
                                        image={data.avatar}
                                        size={48}
                                        userName={data.name || data.email}
                                    />
                                </button>
                            }
                        >
                            <DropDownItem>
                                <ProfileInfo {...data} />
                            </DropDownItem>
                            <DropDownItemWithIcon
                                icon={<Icon name={'user'} />}
                                onSelect={toProfile}
                                text={'Profile'}
                            />
                            <DropDownItemWithIcon
                                icon={<Icon name={'logout'} />}
                                onSelect={logout}
                                text={'Sign out'}
                            />
                        </DropDown>
                    </div>
                ) : (
                    <Button as={Link} to={ROUTES.signIn}>
                        Sign In
                    </Button>
                )}
            </div>
        </div>
    )
})
