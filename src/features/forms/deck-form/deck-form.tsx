import { memo, useState } from 'react'
import { toast } from 'react-toastify'

import { DeckFormType, useDeckForm } from '@/features/forms/deck/use-deck-form'
import { Button } from '@/shared/ui/button'
import { ControlledCheckbox, ControlledTextField } from '@/shared/ui/controlled'
import { ControlledPreviewFileUploader } from '@/shared/ui/controlled/controlled-preview-file-uploader'

import s from './deck.module.scss'

type DeckFormDV = {
  cover: null | string
} & Pick<DeckFormType, 'isPrivate' | 'name'>

type Props = {
  defaultValues?: DeckFormDV
  onCancel: () => void
  onSubmit: (data: FormData) => void
}

export const DeckForm = memo(({ defaultValues, onCancel, onSubmit }: Props) => {
  const [downloaded, setDownloaded] = useState<null | string>(defaultValues?.cover || null)
  const [coverError, setCoverError] = useState<null | string>(null)

  const values: DeckFormType = {
    isPrivate: defaultValues?.isPrivate || false,
    name: defaultValues?.name || '',
  }

  const { control, getFieldState, handleSubmit, resetField, setValue, trigger, watch } =
    useDeckForm(values)

  const fileIsDirty = getFieldState('cover').isDirty

  const file = watch('cover')

  const deleteCoverHandler = () => {
    if (coverError) {
      setCoverError(null)
    }
    toast.warning('You deleted cover', { containerId: 'modal' })
    setValue('cover', null)
    setDownloaded(null)
  }

  const extraActions = async () => {
    const success = await trigger('cover')
    const { error } = getFieldState('cover')
    const file = watch('cover')

    if (!success && error?.message) {
      toast.error(error.message, { containerId: 'modal' })
      setCoverError(error.message)
      resetField('cover')
    }

    if (file) {
      const badCase = defaultValues?.cover ?? null
      const img = success ? URL.createObjectURL(file) : badCase

      setDownloaded(img)

      if (coverError && !error?.message) {
        setCoverError(null)
      }
    }
  }

  const sendHandler = (data: DeckFormType) => {
    const form = new FormData()

    form.append('name', data.name)
    form.append('isPrivate', `${data.isPrivate}`)

    if (file === null) {
      form.append('cover', '')
    } else if (fileIsDirty && data.cover) {
      form.append('cover', data.cover)
    }

    onSubmit(form)
  }

  return (
    <form className={s.form} onSubmit={handleSubmit(sendHandler)}>
      <ControlledPreviewFileUploader
        control={control}
        deleteCoverHandler={deleteCoverHandler}
        errorMessage={coverError}
        extraActions={extraActions}
        name={'cover'}
        preview={downloaded}
      />
      <ControlledTextField control={control} label={'Name Pack'} name={'name'} />
      <ControlledCheckbox control={control} label={'Private Pack'} name={'isPrivate'} />
      <div className={s.controls}>
        <Button onClick={onCancel} type={'button'} variant={'secondary'}>
          Cancel
        </Button>
        <Button>Send</Button>
      </div>
    </form>
  )
})
