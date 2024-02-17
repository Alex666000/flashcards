import { memo } from 'react'
import { Link } from 'react-router-dom'

import { PageNotFound } from '@/shared/assets/illustrations/page-not-found-icon'
import { ROUTES } from '@/shared/lib/constants/route-path'
import { Button } from '@/shared/ui/button'

import s from './not-found.module.scss'

const NotFoundPage = () => {
  return (
    <div className={s.root}>
      <PageNotFound />
      <Button as={Link} to={ROUTES.decks}>
        Back to Decks
      </Button>
    </div>
  )
}

export default memo(NotFoundPage)
