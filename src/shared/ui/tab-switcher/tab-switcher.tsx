import { ElementRef, forwardRef } from 'react'

import { Typography } from '@/shared/ui/typography'
import * as TabsSwitcherRadix from '@radix-ui/react-tabs'
import { clsx } from 'clsx'

import s from './tab-switcher.module.scss'

export type Tab = {
  disabled?: boolean
  title: string
  value: string
}

type Props = {
  ariaLabel?: string
  className?: string
  disabled?: boolean
  fullWidth?: boolean
  label?: string
  onChange: (value: string) => void
  tabsValues: Tab[]
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
      onChange,
      tabsValues,
      value,
      ...rest
    } = props

    return (
      <Typography as={'div'} className={clsx(s.label, className)} variant={'body2'}>
        {label}
        <TabsSwitcherRadix.Root
          className={s.tabsSwitcherRoot}
          onValueChange={onChange}
          ref={ref}
          value={value}
          {...rest}
        >
          <TabsSwitcherRadix.List
            aria-label={ariaLabel || 'tab switcher'}
            className={clsx(clsx(s.list, disabled && s.disabled))}
          >
            {tabsValues?.map((t) => (
              <TabsSwitcherRadix.Trigger
                className={clsx(s.trigger, fullWidth && s.fullWidth, disabled && s.disabled)}
                disabled={t.disabled}
                key={t.value}
                value={t.value}
              >
                {t.title}
              </TabsSwitcherRadix.Trigger>
            ))}
          </TabsSwitcherRadix.List>
        </TabsSwitcherRadix.Root>
      </Typography>
    )
  }
)
