import { FC } from 'react'

import { Typography } from '@/shared/ui/typography'
import * as RadioGr from '@radix-ui/react-radio-group'
import { clsx } from 'clsx'

import s from './radio-group.module.scss'

export type Option = {
  label: string
  value: string
}

export type RadioGroupProps = {
  disabled?: boolean
  errorMessage?: string
  name?: string
  onValueChange?: (value: string) => void
  options: Option[]
  value?: string
}

export const RadioGroup: FC<RadioGroupProps> = ({ errorMessage, options, ...rest }) => {
  const labelClasses = clsx(s.item, rest.disabled && s.disabled)

  return (
    <RadioGr.Root aria-label={'Aria label'} {...rest} className={s.root}>
      {options.map((el) => (
        <Typography as={'label'} className={labelClasses} key={el.value} variant={'body2'}>
          <RadioGr.Item className={s.radio} value={el.value}>
            <div className={s.frame}></div>
            <RadioGr.Indicator className={s.indicator} />
          </RadioGr.Item>
          {el.label}
        </Typography>
      ))}
      {errorMessage && (
        <Typography className={s.error} variant={'caption'}>
          {errorMessage}
        </Typography>
      )}
    </RadioGr.Root>
  )
}
