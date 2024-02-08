import { CSSProperties, ComponentPropsWithoutRef, FC, ReactNode, useState } from 'react'

import { More } from '@/shared/assets/icons/sutarday-icons/More'
import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu'
import { clsx } from 'clsx'

import s from './dropdown.module.scss'

import { Typography } from '../typography'

export type DropdownProps = {
  align?: 'center' | 'end' | 'start'
  children: ReactNode
  className?: string
  style?: CSSProperties
  trigger?: ReactNode
}

export const Dropdown = ({ align = 'end', children, className, style, trigger }: DropdownProps) => {
  const [open, setOpen] = useState(false)

  const classNames = {
    arrow: s.arrow,
    arrowBox: s.arrowBox,
    button: s.button,
    content: clsx(s.content, className),
    itemsBox: s.itemsBox,
    moreButton: s.moreButton,
  }

  return (
    <DropdownMenuRadix.Root onOpenChange={setOpen} open={open}>
      <DropdownMenuRadix.Trigger asChild>
        {trigger ?? (
          <button className={classNames.moreButton}>
            <More />
          </button>
        )}
      </DropdownMenuRadix.Trigger>
      <div>
        {open && (
          <DropdownMenuRadix.Portal forceMount>
            <DropdownMenuRadix.Content
              align={align}
              asChild
              className={classNames.content}
              forceMount
              onClick={(event) => event.stopPropagation()}
              sideOffset={8}
              style={style}
            >
              <div>
                <DropdownMenuRadix.Arrow asChild className={classNames.arrowBox}>
                  <div className={classNames.arrow} />
                </DropdownMenuRadix.Arrow>
                <div className={classNames.itemsBox}>{children}</div>
              </div>
            </DropdownMenuRadix.Content>
          </DropdownMenuRadix.Portal>
        )}
      </div>
    </DropdownMenuRadix.Root>
  )
}

export type DropdownItemProps = {
  children?: ReactNode
  className?: string
  disabled?: boolean
  onSelect?: (event: Event) => void
  style?: CSSProperties
}

export const DropdownItem: FC<DropdownItemProps> = ({
  children,
  className,
  disabled,
  onSelect,
  style,
}) => {
  const classNames = {
    item: clsx(s.item, className),
  }

  return (
    <DropdownMenuRadix.Item
      asChild
      className={classNames.item}
      disabled={disabled}
      onSelect={onSelect}
      style={style}
    >
      {children}
    </DropdownMenuRadix.Item>
  )
}

export type DropdownItemWithIconProps = Omit<DropdownItemProps, 'children'> & {
  icon: ReactNode
  text: string
} & ComponentPropsWithoutRef<'div'>

export const DropdownItemWithIcon: FC<DropdownItemWithIconProps> = ({
  className,
  disabled,
  icon,
  onSelect,
  style,
  text,
  ...rest
}) => {
  const classNames = {
    item: clsx(s.item, className),
    itemIcon: clsx(s.itemIcon, disabled && s.disabled),
  }

  return (
    <DropdownMenuRadix.Item
      asChild
      className={classNames.item}
      disabled={disabled}
      onClick={(event) => event.stopPropagation()}
      onSelect={onSelect}
      style={style}
      {...rest}
    >
      <div>
        <div className={classNames.itemIcon}>{icon}</div>
        <Typography variant={'caption'}>{text}</Typography>
      </div>
    </DropdownMenuRadix.Item>
  )
}
