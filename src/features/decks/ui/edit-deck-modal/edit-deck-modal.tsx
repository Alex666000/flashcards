import { FC } from 'react'

import { useUpdateDeckMutation } from '@/features/decks/api'
import { DeckForm } from '@/features/forms/deck-form/deck-form'
import { requestHandler } from '@/shared/lib/utils/request-handler'
import { ModalWindow } from '@/shared/ui/modal-window'

export type EditDeckModalProps = {
  cover: null | string
  id: string
  isPrivate: boolean
  name: string
  open: boolean
  setOpen: (value: boolean) => void
}

export const EditDeckModal: FC<EditDeckModalProps> = ({
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

  const [editDeck] = useUpdateDeckMutation()

  const editDeckHandler = async (data: FormData) => {
    await requestHandler(async () => {
      await editDeck({ data, id }).unwrap()
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
