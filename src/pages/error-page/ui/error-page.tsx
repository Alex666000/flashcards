import { memo } from 'react'

import { Error_404Icon } from '@/shared/assets/icons'
import { ROUTES } from '@/shared/lib'
import { Button } from '@/shared/ui/button'
import { Typography } from '@/shared/ui/typography'

import s from './error-page.module.scss'

const ErrorPage = () => {
  return (
    <div className={s.errorPageBlock}>
      <Error_404Icon />
      <Typography variant={'body1'}>{'Sorry! Page not found!'}</Typography>
      <Button as={'a'} href={ROUTES.decks}>
        Back to home page
      </Button>
    </div>
  )
}

export default memo(ErrorPage)
