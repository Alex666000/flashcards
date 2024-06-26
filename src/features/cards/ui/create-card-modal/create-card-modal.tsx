import { FC } from 'react'

import { useCreateCardMutation } from '@/features/cards/api/cards.api'
import { CardForm } from '@/features/forms/card/card'
import { handleRequestOnServer } from '@/shared/lib/utils/handle-request-on-server'
import { ModalWindow } from '@/shared/ui/modal-window'

type Props = {
  deckId: string
  open: boolean
  setOpen: (value: boolean) => void
}

export const CreateCardModal: FC<Props> = ({ deckId, open, setOpen }) => {
  const [createCard] = useCreateCardMutation()

  const onCancel = () => {
    setOpen(false)
  }

  const onSubmit = async (data: FormData) => {
    await handleRequestOnServer(async () => {
      await createCard({ data, deckId }).unwrap()
      setOpen(false)
    })
  }

  return (
    <ModalWindow open={open} setOpen={setOpen} title={'Add New Card'}>
      <CardForm onCancel={onCancel} onSubmit={onSubmit} />
    </ModalWindow>
  )
}
