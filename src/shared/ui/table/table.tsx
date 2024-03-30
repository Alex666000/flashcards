import { ComponentPropsWithoutRef, ElementRef, FC, forwardRef } from 'react'

import { clsx } from 'clsx'

import s from './table.module.scss'

export const Root = forwardRef<HTMLTableElement, ComponentPropsWithoutRef<'table'>>(
  ({ className, ...rest }, ref) => {
    return <table className={clsx(s.rootTable, className)} {...rest} ref={ref} />
  }
)

export const Head = forwardRef<ElementRef<'thead'>, ComponentPropsWithoutRef<'thead'>>(
  ({ className, ...rest }, ref) => {
    return <thead className={clsx(s.head, className)} {...rest} ref={ref} />
  }
)

export const HeadCell = forwardRef<ElementRef<'th'>, ComponentPropsWithoutRef<'th'>>(
  ({ children, className, ...rest }, ref) => {
    return (
      <th className={clsx(s.headCell, className)} {...rest} ref={ref}>
        <span>{children}</span>
      </th>
    )
  }
)

export const Body = forwardRef<ElementRef<'tbody'>, ComponentPropsWithoutRef<'tbody'>>(
  ({ className, ...rest }, ref) => {
    return <tbody className={clsx(s.body, className)} {...rest} ref={ref} />
  }
)

export const Row = forwardRef<ElementRef<'tr'>, ComponentPropsWithoutRef<'tr'>>(
  ({ className, ...rest }, ref) => {
    return <tr className={clsx(s.row, className)} {...rest} ref={ref} />
  }
)

export const Cell = forwardRef<ElementRef<'td'>, ComponentPropsWithoutRef<'td'>>(
  ({ className, ...rest }, ref) => {
    const classes = clsx(s.cell, className)

    return <td className={classes} {...rest} ref={ref} />
  }
)

const Empty: FC<ComponentPropsWithoutRef<'div'>> = ({ className, ...rest }) => {
  const classes = clsx(s.empty, className)

  return <div className={classes} {...rest} />
}

export const Table = { Body, Cell, Empty, Head, HeadCell, Root, Row }
