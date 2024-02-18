import { classNames } from '@/shared/lib/classNames-lib/classNames'
import { Button } from '@/shared/ui/button'

import s from './error-page.module.scss'

interface ErrorPageProps {
  className?: string
}

export const ErrorPageForErrorBoundary = ({ className }: ErrorPageProps) => {
  const reloadPage = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload()
  }

  return (
    <div className={classNames(s.ErrorPage, {}, [className])}>
      <p>An unexpected error occurred</p>
      <Button onClick={reloadPage}>Try refreshing the page</Button>
    </div>
  )
}
