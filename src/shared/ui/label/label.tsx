import { ComponentPropsWithoutRef, FC, ReactNode } from 'react'

import * as LabelRadix from '@radix-ui/react-label'
import { clsx } from 'clsx'

import s from './label.module.scss'

export type LabelProps = {
  label?: ReactNode
} & ComponentPropsWithoutRef<'label'>

export const Label: FC<LabelProps> = ({ children, className, label, ...rest }) => {
  const classNames = {
    label: clsx(s.label, className),
  }

  return (
    <LabelRadix.Root {...rest}>
      {label && <div className={classNames.label}>{label}</div>}
      {children}
    </LabelRadix.Root>
  )
}
