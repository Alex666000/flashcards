import { memo } from 'react'
import { Link, useParams } from 'react-router-dom'

import { CheckEmailImageIcon } from '@/shared/assets/illustrations/check-email-image-icon'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Typography } from '@/shared/ui/typography'

import s from './check-email-page.module.scss'

/**
 - На UX увидим "Проверьте свой email и кнопку назад"
 */
const CheckEmailPage = () => {
  const { email } = useParams<{ email: string }>()

  return (
    <div className={s.container}>
      <Card>
        <div className={s.content}>
          <Typography as={'h2'} className={s.title} variant={'large'}>
            Check Email
          </Typography>
          <div className={s.imageContainer}>
            <CheckEmailImageIcon />
          </div>
          <Typography className={s.notification} variant={'body2'}>
            We’ve sent an Email with instructions to {email}
          </Typography>
          <Button as={Link} fullWidth to={'/sign-in'}>
            Back to Sign in
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default memo(CheckEmailPage)
