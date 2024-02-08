import { memo } from 'react'

import { Icon } from '@/shared/ui/icon'
import { clsx } from 'clsx'

import s from './rating.module.scss'

type RatingProps = {
  className?: string
  selectedStars?: number
  size?: number
}

const stars = [1, 2, 3, 4, 5]

export const Rating = memo((props: RatingProps) => {
  const { className, selectedStars = 0, size = 16 } = props

  return (
    <div className={className}>
      {stars.map((starNumber) => (
        <Icon
          className={clsx(s.starIcon, selectedStars >= starNumber ? s.hovered : s.normal)}
          height={size}
          key={starNumber}
          name={'star'}
          width={size}
        />
      ))}
    </div>
  )
})
