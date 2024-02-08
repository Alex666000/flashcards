import * as AvatarRadix from '@radix-ui/react-avatar'

import s from './avatar.module.scss'

type AvatarPropsType = {
  name?: string
  photo?: string
  size?: number
}

export const Avatar = ({ name = 'Your avatar', photo, size = 36 }: AvatarPropsType) => {
  const avatar =
    photo ??
    'https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80'

  function getFirstLetter(name: string | undefined) {
    return name?.charAt(0).toUpperCase()
  }

  return (
    <AvatarRadix.Root className={s.avatarRoot}>
      <AvatarRadix.Image
        alt={`${name} avatar`}
        className={s.avatarImage}
        height={size}
        src={avatar}
        title={`${name} avatar`}
        width={size}
      />
      <AvatarRadix.Fallback
        className={s.avatarFallback}
        style={{ height: `${size}px`, width: `${size}px` }}
      >
        {getFirstLetter(name)}
      </AvatarRadix.Fallback>
    </AvatarRadix.Root>
  )
}
