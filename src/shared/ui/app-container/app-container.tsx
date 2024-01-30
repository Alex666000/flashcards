import { FC, ReactNode } from 'react'

import { clsx } from 'clsx'

import s from './app-container.module.scss'

type PropsType = {
    children?: ReactNode
    className?: string
}

export const AppContainer: FC<PropsType> = ({ children, className }) => {
    return <div className={clsx(s.app_container, className)}>{children}</div>
}
