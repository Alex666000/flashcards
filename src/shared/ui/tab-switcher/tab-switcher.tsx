import { ElementRef, forwardRef } from 'react'

import { Typography } from '@/shared/ui/typography'
import * as TabsSwitcherRadix from '@radix-ui/react-tabs'
import { clsx } from 'clsx'

import s from './tab-switcher.module.scss'

export type Tab = {
  disabled?: boolean
  text: string
  value: string
}

type Props = {
  ariaLabel?: string
  className?: string
  disabled?: boolean
  fullWidth?: boolean
  label?: string
  onValueChange: (value: string) => void
  tabs: Tab[]
  value: string
}

export const TabSwitcher = forwardRef<ElementRef<typeof TabsSwitcherRadix.Root>, Props>(
  (props, ref) => {
    const {
      ariaLabel,
      className,
      disabled,
      fullWidth,
      label,
      onValueChange,
      tabs,
      value,
      ...rest
    } = props
    const classes = clsx(s.label, className)

    return (
      <Typography as={'div'} className={classes} variant={'body2'}>
        {label}
        <TabsSwitcherRadix.Root
          className={s.root}
          onValueChange={onValueChange}
          ref={ref}
          value={value}
          {...rest}
        >
          <TabsSwitcherRadix.List
            aria-label={ariaLabel || 'tab switcher'}
            className={clsx(clsx(s.list, disabled && s.disabled))}
          >
            {tabs?.map((t) => (
              <TabsSwitcherRadix.Trigger
                className={clsx(s.trigger, fullWidth && s.fullWidth, disabled && s.disabled)}
                disabled={t.disabled}
                key={t.value}
                value={t.value}
              >
                {t.text}
              </TabsSwitcherRadix.Trigger>
            ))}
          </TabsSwitcherRadix.List>
        </TabsSwitcherRadix.Root>
      </Typography>
    )
  }
)
