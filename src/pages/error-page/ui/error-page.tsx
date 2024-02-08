import { Error_404 as Error_404Icon } from '@/shared/assets/icons/error-404'
import { ROUTES } from '@/shared/common/constants'
import { Button } from '@/shared/ui/button'
import { Typography } from '@/shared/ui/typography'

import s from './error-page.module.scss'

export const ErrorPage = () => {
  return (
    <div className={s.root}>
      <Error_404Icon />
      <Typography variant={'body1'}>Sorry! Page not found!</Typography>
      <Button as={'a'} href={ROUTES.decks}>
        Back to home page
      </Button>
    </div>
  )
}
