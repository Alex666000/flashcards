import { ComponentPropsWithoutRef, ElementRef, JSX, forwardRef } from 'react'

import Loading from '@/shared/ui/loaders-components/preloader/loading'
import cn from 'classnames'

import s from './preloader.module.scss'

export const Preloader = forwardRef<ElementRef<'div'>, ComponentPropsWithoutRef<'div'>>(
  ({ className, ...restProps }, ref): JSX.Element => {
    const preloaderClasses = cn(s.root, className)

    return (
      <div className={preloaderClasses} ref={ref} {...restProps}>
        <Loading />
      </div>
    )
  }
)
