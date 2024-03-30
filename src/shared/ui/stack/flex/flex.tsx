import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'

import { Mods, classNames } from '@/shared/lib/classNames-lib/classNames'

import cls from './flex.module.scss'

// types
export type FlexJustifyContent =
  | 'center'
  | 'end'
  | 'spaceAround'
  | 'spaceBetween'
  | 'spaceEvenly'
  | 'start'
export type FlexAlignItems = 'center' | 'end' | 'start'
export type FlexDirection = 'column' | 'row'
export type FlexWrap = 'nowrap' | 'wrap'
export type FlexGap = '4' | '8' | '16' | '24' | '32'

// mapping types + classes
const justifyClasses: Record<FlexJustifyContent, string> = {
  center: cls.justifyCenter,
  end: cls.justifyEnd,
  spaceAround: cls.spaceAround,
  spaceBetween: cls.spaceBetween,
  spaceEvenly: cls.spaceEvenly,
  start: cls.justifyStart,
}

const alignClasses: Record<FlexAlignItems, string> = {
  center: cls.alignCenter,
  end: cls.alignEnd,
  start: cls.alignStart,
}

const directionClasses: Record<FlexDirection, string> = {
  column: cls.directionColumn,
  row: cls.directionRow,
}

const gapClasses: Record<FlexGap, string> = {
  4: cls.gap4,
  8: cls.gap8,
  16: cls.gap16,
  24: cls.gap24,
  32: cls.gap32,
}

// props
type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export interface FlexProps extends DivProps {
  alignItems?: FlexAlignItems
  children?: ReactNode
  className?: string
  flexDirection: FlexDirection
  gap?: FlexGap
  justifyContent?: FlexJustifyContent
  max?: boolean
  wrap?: FlexWrap
}

export const Flex = (props: FlexProps) => {
  const {
    alignItems = 'center',
    children,
    className,
    flexDirection = 'row',
    gap,
    justifyContent = 'start',
    max,
    wrap = 'nowrap',
    ...otherProps
  } = props

  const classes = [
    className,
    justifyClasses[justifyContent],
    alignClasses[alignItems],
    directionClasses[flexDirection],
    cls[wrap],
    gap && gapClasses[gap],
  ]

  const mods: Mods = {
    [cls.max]: max,
  }

  return (
    <div className={classNames(cls.Flex, mods, classes)} {...otherProps}>
      {children}
    </div>
  )
}
