import { FC } from 'react'

import { formatTextBr } from '@/shared/lib/utils/format-text-br'
import { Button } from '@/shared/ui/button'
import { ModalWindow } from '@/shared/ui/modal-window'
import { Typography } from '@/shared/ui/typography'

import s from './dialog.module.scss'

type Props = {
  buttonText?: string
  description: string
  onConfirm: () => void
  open: boolean
  setOpen: (value: boolean) => void
  splitLines?: boolean
  title: string
}

export const Dialog: FC<Props> = ({
  buttonText = 'Confirm',
  description = '',
  onConfirm,
  open,
  setOpen,
  splitLines,
  title,
}) => {
  const formattedDescription = splitLines ? formatTextBr(description) : description

  const onCancel = () => {
    setOpen(false)
  }

  return (
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
