import { memo } from 'react'

import { clsx } from 'clsx'

import s from './main-loader.module.scss'

type MainLoaderType = {
  className?: string
}

export const MainLoader = memo(({ className }: MainLoaderType) => {
  const classNames = {
    container: clsx(s.pps, className),
  }

  return (
    <div className={classNames.container}>
      <div className={s.loader}></div>
    </div>
  )
})
