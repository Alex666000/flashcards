import { ComponentPropsWithoutRef, forwardRef } from 'react'

import { clsx } from 'clsx'

import s from './card.module.scss'

export type Props = ComponentPropsWithoutRef<'div'>

export const Card = forwardRef<HTMLDivElement, Props>(({ className, ...restProps }, ref) => {
  return <div className={clsx(s.card, className)} ref={ref} {...restProps}></div>
})
