import { FC } from 'react'

import { useUpdateDeckMutation } from '@/features/decks/api'
import { DeckForm } from '@/features/forms/deck-form/deck-form'
import { requestHandler } from '@/shared/lib/utils/request-handler'
import { ModalWindow } from '@/shared/ui/modal-window'

export type EditPackModalProps = {
  cover: null | string
  id: string
  isPrivate: boolean
  name: string
  open: boolean
  setOpen: (value: boolean) => void
}

export const EditPackModal: FC<EditPackModalProps> = ({
  cover,
  id,
  isPrivate,
  name,
  open,
  setOpen,
}) => {
  const startValues = {
    cover,
    isPrivate,
    name,
  }

  const [editPack] = useUpdateDeckMutation()

  const editDeckHandler = async (data: FormData) => {
    await requestHandler(async () => {
      await editPack({ data, id }).unwrap()
      setOpen(false)
    })
  }

  return (
    <ModalWindow open={open} setOpen={setOpen} title={'Edit Pack'}>
      <DeckForm
        defaultValues={startValues}
        onCancel={() => setOpen(false)}
        onSubmit={editDeckHandler}
      />
    </ModalWindow>
  )
}
