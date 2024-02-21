import { ComponentPropsWithoutRef, ElementRef, FC, ReactNode, forwardRef } from 'react'

import { DropDownItemProps } from '@/shared/ui/dropdown_me/dropdown-item'
import { Typography } from '@/shared/ui/typography'
import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'

import s from '@/shared/ui/dropdown_me/dropdown.module.scss'

export type Props = Omit<DropDownItemProps, 'children'> & {
  icon: ReactNode
  text: string
} & ComponentPropsWithoutRef<'div'>

export const DropDownItemWithIcon = forwardRef<ElementRef<typeof DropdownMenuRadix.Item>, Props>(
  (props, ref) => {
    const { className, disabled = false, icon, onSelect, style, text, ...rest } = props
    const classes = clsx(s.item, className)

    return (
      <DropdownMenuRadix.Item
        asChild
        className={classes}
        disabled={disabled}
        onClick={(event) => event.stopPropagation()}
        onSelect={onSelect}
        ref={ref}
        style={style}
        {...rest}
      >
        <div>
          {icon}
          <Typography variant={'body2'}>{text}</Typography>
        </div>
      </DropdownMenuRadix.Item>
    )
  }
)
