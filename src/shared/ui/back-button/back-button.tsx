import { FC, MouseEvent, memo, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon/icon'
import { Typography } from '@/shared/ui/typography'
import { clsx } from 'clsx'

import s from './back-button.module.scss'

type Props = {
  className?: string
  text?: string
}

export const BackButton: FC<Props> = memo(
  ({ className, text = 'Back to Previous Page', ...rest }) => {
    const navigate = useNavigate()

    const handleBackButtonClick = useCallback(() => {
      return (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        navigate(-1)
      }
    }, [navigate])

    return (
      <Button
        as={Link}
        className={clsx(s.button, className)}
        onClick={handleBackButtonClick}
        relative={'path'}
        to={'..'}
        variant={'link'}
        {...rest}
      >
        <Icon height={22} name={'arrow-back'} width={22} />
        <Typography className={s.text} variant={'body2'}>
          {text}
        </Typography>
      </Button>
    )
  }
)
