import { CSSProperties, forwardRef } from 'react'

import * as AvatarRadix from '@radix-ui/react-avatar'
import { clsx } from 'clsx'

import s from './avatar.module.scss'

type Props = {
  className?: string
  photoOrImage?: string
  size?: number
  style?: CSSProperties
  userName: string
}

export const Avatar = forwardRef<any, Props>(
  ({ className, photoOrImage, size = 36, style, userName }, ref) => {
    const initials = userName
      ?.split(' ')
      .map((word) => word[0].toUpperCase())
      .join(' ')

    const styles: CSSProperties = {
      height: size,
      width: size,
      ...(style || {}),
    }

    return (
      <div className={clsx(s.avatar, className)} style={styles}>
        <AvatarRadix.Root ref={ref}>
          <AvatarRadix.Image alt={'User Avatar'} className={s.image} src={photoOrImage} />
          {!photoOrImage && (
            <AvatarRadix.Fallback className={s.fallback}>{initials}</AvatarRadix.Fallback>
          )}
        </AvatarRadix.Root>
      </div>
    )
  }
)
