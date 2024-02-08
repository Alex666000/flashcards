import { FC } from 'react'

import { formatTextBr } from '@/shared/common/utils/format-text-br'
import { Button } from '@/shared/ui/button'
import { ModalWindow } from '@/shared/ui/modal-window'
import { Typography } from '@/shared/ui/typography'

import s from './dialog.module.scss'

type Props = {
  buttonText?: string // Текст кнопки подтверждения (по умолчанию "Confirm")
  description: string // Текстовое описание модалки
  onConfirm: () => void // Функция обратного вызова при нажатии на кнопку подтверждения
  open: boolean // Флаг отображения/скрытия окна
  setOpen: (value: boolean) => void // Функция для изменения значения флага отображения диалога
  // Когда splitLines установлен в true, функция-хелпер: formatTextBr - будет использоваться для
  // форматирования текста с переносами строк.
  splitLines?: boolean // splitLines: Флаг, указывающий на необходимость разбивки текстового описания по строкам
  title: string // Заголовок диалога
}
/**
 * Dialog - представляет собой "МОДАЛЬНОЕ" (диалоговое) окно с текстовым описанием, кнопками "Cancel" и "Confirm".
 * Важной особенностью является возможность разбивки текстового описания по строкам с использованием
 * функции formatTextBr для создания переносов строк
 */
export const Dialog: FC<Props> = ({
  buttonText = 'Confirm',
  description = '',
  onConfirm,
  open,
  setOpen,
  splitLines,
  title,
}) => {
  // Форматируем текстовое описание с переносами строк, если splitLines === true
  const formattedDescription = splitLines ? formatTextBr(description) : description

  const onCancel = () => {
    setOpen(false)
  }

  return (
    // Используем компонент ModalWindow для создания диалогового окна
    <ModalWindow open={open} setOpen={setOpen} title={title}>
      <Typography>{formattedDescription}</Typography>
      <div className={s.buttons}>
        <Button onClick={onCancel} variant={'secondary'}>
          Cancel
        </Button>
        <Button onClick={onConfirm}>{buttonText || 'Confirm'}</Button>
      </div>
    </ModalWindow>
  )
}
