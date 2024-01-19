import { CSSProperties, forwardRef } from 'react'

import * as AvatarRadix from '@radix-ui/react-avatar'
import { clsx } from 'clsx'

import s from './avatar.module.scss'

type Props = {
    className?: string
    image?: string
    size?: number
    style?: CSSProperties
    userName: string
}

/**
 - Создается переменная initials, которая представляет собой первые буквы каждого слова из userName, преобразованные в верхний регистр и объединенные в строку.
 - Формируются стили для размера (height и width), используя переданный размер и дополнительные стили.
 - Возвращается корневой элемент div с примененными классами и стилями. Внутри него расположен компонент AvatarRadix.Table,
 представляющий базовый контейнер аватара.
 - Внутри AvatarRadix.Table расположены компоненты:
 - AvatarRadix.Image для отображения изображения (если оно передано).
 - AvatarRadix.Fallback для отображения инициалов, если изображение отсутствует.
 - Обработка изображения и инициалов: Компонент поддерживает как отображение изображения, так и инициалов пользователя. Если передано изображение (image),
 оно отображается с помощью AvatarRadix.Image. В противном случае, используются AvatarRadix.Fallback для отображения инициалов.
 */
export const Avatar = forwardRef<any, Props>(
    ({ className, image, size = 36, style, userName }, ref) => {
        const classes = clsx(s.avatar, className)

        const initials = userName
            .split(' ')
            .map((word) => word[0].toUpperCase())
            .join(' ')

        const styles: CSSProperties = {
            height: size,
            width: size,
            ...(style || {}),
        }

        return (
            <div className={classes} style={styles}>
                <AvatarRadix.Root ref={ref}>
                    <AvatarRadix.Image alt={'User Avatar'} className={s.image} src={image} />
                    {!image && (
                        <AvatarRadix.Fallback className={s.fallback}>
                            {initials}
                        </AvatarRadix.Fallback>
                    )}
                </AvatarRadix.Root>
            </div>
        )
    }
)
