import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'

import { Mods, classNames } from '@/shared/lib/classNames/classNames'

import cls from './Flex.module.scss'

export type FlexJustify = 'between' | 'center' | 'end' | 'start'
export type FlexAlign = 'center' | 'end' | 'start'
export type FlexDirection = 'column' | 'row'
export type FlexWrap = 'nowrap' | 'wrap'
export type FlexGap = '4' | '8' | '16' | '24' | '32'

const justifyClasses: Record<FlexJustify, string> = {
  between: cls.justifyBetween,
  center: cls.justifyCenter,
  end: cls.justifyEnd,
  start: cls.justifyStart,
}

const alignClasses: Record<FlexAlign, string> = {
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

type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export interface FlexProps extends DivProps {
  align?: FlexAlign
  children: ReactNode
  className?: string
  direction: FlexDirection
  gap?: FlexGap
  justify?: FlexJustify
  max?: boolean
  wrap?: FlexWrap
}

export const Flex = (props: FlexProps) => {
  const {
    align = 'center',
    children,
    className,
    direction = 'row',
    gap,
    justify = 'start',
    max,
    wrap = 'nowrap',
    ...otherProps
  } = props

  const classes = [
    className,
    justifyClasses[justify],
    alignClasses[align],
    directionClasses[direction],
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
