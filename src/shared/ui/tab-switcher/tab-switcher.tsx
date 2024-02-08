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
  className?: string
  label?: string
  onValueChange: (value: string) => void
  tabs: Tab[]
  value: string
}

export const TabSwitcher = forwardRef<ElementRef<typeof TabsSwitcherRadix.Root>, Props>(
  ({ className, label, onValueChange, tabs, value, ...restProps }, ref) => {
    const classes = clsx(s.label, className)

    return (
      <Typography as={'div'} className={classes} variant={'body2'}>
        {label}
        <TabsSwitcherRadix.Root
          className={s.root}
          onValueChange={onValueChange}
          ref={ref}
          value={value}
          {...restProps}
        >
          <TabsSwitcherRadix.List>
            {tabs.map((t) => (
              <TabsSwitcherRadix.Trigger
                className={s.trigger}
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
