import { FC, MouseEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon/icon'
import { Typography } from '@/shared/ui/typography'
import { clsx } from 'clsx'

import s from './back-button.module.scss'

type Props = {
    className?: string // дополнительные классы для стилизации
    text?: string // текст кнопки
}
/**
 -------------------------------------------------------------------------
 BackButton - используется для создания стилизованной кнопки в виде ссылки.
 -------------------------------------------------------------------------
 * Возвращается компонент Button, который представляет собой кнопку в виде ссылки (Link) с вложенными элементами:
 * Icon для отображения стрелки назад.
 * Typography для отображения текста кнопки (text).
 * При клике на кнопку выполняется обработчик backHandler.
 * Свойство to=".." указывает на переход на предыдущий уровень относительно текущего пути.
 * Icon компонент: Отображает иконку (стрелку назад), возможно, из вашей библиотеки компонентов.
 * Typography компонент: Отображает текст кнопки с использованием указанного варианта (variant="body2").
 * В итоге, компонент BackButton создает кнопку для возврата на предыдущую страницу, содержащую иконку и текст.
 */
export const BackButton: FC<Props> = ({ className, text = 'Back to Previous Page', ...rest }) => {
    const navigate = useNavigate()

    // Создается функция backHandler, которая предотвращает стандартное действие события клика (e.preventDefault())
    // и вызывает функцию navigate(-1) для перехода на предыдущую страницу.
    const backHandler = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        navigate(-1)
    }

    return (
        <Button
            as={Link}
            className={clsx(s.button, className)}
            onClick={backHandler}
            relative={'path'}
            to={'..'}
            variant={'link'}
            {...rest}
        >
            <Icon height={22} name={'arrow-back'} width={22} />
            <Typography className={s.text} variant={'body2'}>
                {text}
            </Typography>
        </Button>
    )
}
