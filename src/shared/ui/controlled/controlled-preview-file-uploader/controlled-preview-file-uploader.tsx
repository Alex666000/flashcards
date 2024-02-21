import { useState } from 'react'
import { Control, FieldPath, FieldValues } from 'react-hook-form'

import { Button } from '@/shared/ui/button'
import { ControlledFileUploader } from '@/shared/ui/controlled'
import { Icon } from '@/shared/ui/icon'
import { clsx } from 'clsx'

import s from './controlled-preview-file-uploader.module.scss'

import noCover from '../../../assets/images/default-image.jpg'
import { Typography } from '../../typography'

type Props<T extends FieldValues> = {
  control: Control<T>
  deleteCoverHandler: () => void // Функция для удаления загруженного файла
  displayInlineError?: boolean // следует ли отображать встроенные сообщения об ошибке
  errorMessage: null | string // Сообщение об ошибке для отображения в случае проблемы с загрузкой файла
  extraActions?: () => void // для выполнения дополнительных действий после загрузки файла.
  name: FieldPath<T> // Имя/путь поля в форме
  preview: null | string // URL или данные base64 для превью изображения
}

/**
 * ControlledPreviewFileUploader: используется для отображения превью загруженного файла,
 * обычно изображения, вместе с элементами управления для удаления файла и загрузки нового
 */

export const ControlledPreviewFileUploader = <T extends FieldValues>(props: Props<T>) => {
  const {
    control,
    deleteCoverHandler,
    displayInlineError = false,
    errorMessage,
    extraActions,
    name,
    preview,
  } = props

  const [open, setOpen] = useState(false)

  const imgClasses = clsx(s.image, preview && s.hover, open && s.open)

  const onClickHandler = () => {
    if (preview) {
      setOpen((prevState) => !prevState)
    }
  }

  const deleteHandler = () => {
    // Функция для удаления загруженного файла
    deleteCoverHandler()
    if (open) {
      setOpen(false)
    }
  }

  return (
    <div className={s.root}>
      <img alt={'img'} className={imgClasses} onClick={onClickHandler} src={preview ?? noCover} />
      {displayInlineError && errorMessage && (
        <Typography className={s.error} variant={'caption'}>
          {/*Сообщение об ошибке для отображения в случае проблемы с загрузкой файла*/}
          {errorMessage}
        </Typography>
      )}
      <div className={s.previewControls}>
        {preview && (
          <Button onClick={deleteHandler} type={'button'} variant={'secondary'}>
            <Icon className={s.imgIcon} height={18} name={'trash-bin'} width={18} />
            Delete Cover
          </Button>
        )}
        {/* обрабатывает функционал загрузки файла, включая отображение элемента выбора файла
        и инициирование выбора файла
        - ВНУТРИ input c type='file' */}
        <ControlledFileUploader
          control={control}
          // extraActions - функция для выполнения дополнительных действий после загрузки файла
          extraActions={extraActions}
          fullWidth={!preview}
          name={name}
          variant={'secondary'}
        >
          <Icon className={s.imgIcon} height={20} name={'image'} width={20} />
          Change Cover
        </ControlledFileUploader>
      </div>
    </div>
  )
}
