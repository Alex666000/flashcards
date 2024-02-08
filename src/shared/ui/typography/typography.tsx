import { ComponentPropsWithoutRef, ElementType } from 'react'

import { clsx } from 'clsx'

import s from './typography.module.scss'

export type TypographyProps<T extends ElementType = 'p'> = {
  as?: T
  variant?:
    | 'body1' // 16px;
    | 'body2' // 14px; - дефолтный текст приложения
    | 'caption' // 12px;
    | 'error' // 1px;
    | 'h1' // 20px
    | 'h2' // 18px;
    | 'h3' // 16px;
    | 'large' // 26px;
    | 'link1' // 12px;
    | 'link2' //  12px;
    | 'overline' // 12px;
    | 'subtitle1' // 16px;
    | 'subtitle2' // 14px;
} & ComponentPropsWithoutRef<T>
export const Typography = <T extends ElementType = 'p'>(
  props: TypographyProps<T> & ComponentPropsWithoutRef<T>
) => {
  const { as: Component = 'p', className, variant = 'body1', ...rest } = props
  const classNames = clsx(s[variant], className)

  return <Component className={classNames} {...rest} />
}

/*
- При верстке на UI: Typography лучше заворачивать в div
- <Typography className={classes.label} variant={'body2'}> -- body2 - основной текст проекта
- as?: T // ПРИМЕР: Текст будет ссылкой: <Typography as={Link} to={ROUTES.profile} variant="subtitle1" className={s.name}>Привет!</Typography>

 */
