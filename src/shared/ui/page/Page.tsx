import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { clsx } from 'clsx'

import s from './Page.module.scss'

// Для того чтобы каждая страница была резиновая + падинги по бокам и отступ от Хедера
export const Page = forwardRef<ElementRef<'div'>, ComponentPropsWithoutRef<'div'>>(
  ({ className, ...restProps }, ref) => {
    return <section className={clsx(s.page, className)} ref={ref} {...restProps} />
  }
)
