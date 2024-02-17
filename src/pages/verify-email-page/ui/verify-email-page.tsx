import { memo, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { useVerifyMailMutation } from '@/features/auth/rtk-api/auth.api'
import { ROUTES } from '@/shared/lib/constants/route-path'
import { Typography } from '@/shared/ui/typography'

import styles from 'src/pages/verify-email-page/ui/verify-email-page.module.scss'

const VerifyEmailPage = () => {
  const { code } = useParams()
  const [verifyMail] = useVerifyMailMutation()

  useEffect(() => {
    if (code) {
      verifyMail({ code })
    }
  }, [code])

  return (
    <div className={styles.root}>
      <Typography as={'h1'} className={styles.title} variant={'large'}>
        Your Email is Verified
      </Typography>
      <Typography className={styles.subtitle} variant={'subtitle2'}>
        Thank you for registering with our service. Your email address has been verified.
      </Typography>
      <Typography className={styles.subtitle} variant={'subtitle2'}>
        Go to{' '}
        <Link className={styles.link} to={ROUTES.signIn}>
          login
        </Link>{' '}
        page.
      </Typography>
    </div>
  )
}

export default memo(VerifyEmailPage)
