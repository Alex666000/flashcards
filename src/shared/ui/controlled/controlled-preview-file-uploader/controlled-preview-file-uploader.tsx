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
  deleteCoverHandler: () => void
  displayInlineError?: boolean
  errorMessage: null | string
  extraActions?: () => void
  name: FieldPath<T>
  preview: null | string
}

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

  const onClickHandler = () => {
    if (preview) {
      setOpen((prevState) => !prevState)
    }
  }

  const deleteHandler = () => {
    deleteCoverHandler()
    if (open) {
      setOpen(false)
    }
  }

  return (
    <div className={s.controlledPreviewBlock}>
      <img
        alt={'img'}
        className={clsx(s.image, preview && s.hover, open && s.open)}
        onClick={onClickHandler}
        src={preview ?? noCover}
      />
      {displayInlineError && errorMessage && (
        <Typography className={s.error} variant={'caption'}>
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
        <ControlledFileUploader
          control={control}
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
