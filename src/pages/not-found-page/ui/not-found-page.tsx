import { Link } from 'react-router-dom'

import { PageNotFound } from '@/shared/assets/illustrations/page-not-found'
import { ROUTES } from '@/shared/common/constants'
import { Button } from '@/shared/ui/button'

import s from './not-found.module.scss'

export const NotFoundPage = () => {
  return (
    <div className={s.root}>
      <PageNotFound />
      <Button as={Link} to={ROUTES.decks}>
        Back to Packs
      </Button>
    </div>
  )
}
