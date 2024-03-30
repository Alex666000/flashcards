import { memo } from 'react'
import { Link, useParams } from 'react-router-dom'

import { CheckEmailImageIcon } from '@/shared/assets/illustrations'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Container } from '@/shared/ui/container'
import { Page } from '@/shared/ui/page'
import { Typography } from '@/shared/ui/typography'

import s from './check-email-page.module.scss'

const CheckEmailPage = () => {
  const { email } = useParams<{ email: string }>()

  return (
    <Page>
      <section className={s.checkEmailPageBlock}>
        <Container className={s.container}>
          <Card className={s.content}>
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
          </Card>
        </Container>
      </section>
    </Page>
  )
}

export default memo(CheckEmailPage)
