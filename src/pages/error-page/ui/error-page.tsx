import { memo } from 'react'

import { ErrorPageAsync } from '@/pages/error-page/error-page.async'
import { Error_404 } from '@/shared/assets/icons/error-404'
import { ROUTES } from '@/shared/lib/constants/route-path'
import { Button } from '@/shared/ui/button'
import { Typography } from '@/shared/ui/typography'

import s from './error-page.module.scss'

const ErrorPage = () => {
  return (
    <div className={s.root}>
      <Error_404 />
      <Typography variant={'body1'}>{'Sorry! Page not found!'}</Typography>
      <Button as={'a'} href={ROUTES.decks}>
        Back to home page
      </Button>
    </div>
  )
}

export default memo(ErrorPage)
