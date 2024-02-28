import { FC } from 'react'

import { useUpdateCardMutation } from '@/features/cards/api/cards.api'
import { CardForm } from '@/features/forms/card/card'
import { handleRequestOnServer } from '@/shared/lib/utils/handle-request-on-server'
import { ModalWindow } from '@/shared/ui/modal-window'

export type EditCardModalProps = {
  answer: string
  answerImg: null | string
  cardId: string
  open: boolean
  question: string
  questionImg: null | string
  setOpen: (value: boolean) => void
}

export const EditCardModal: FC<EditCardModalProps> = ({
  answer,
  answerImg,
  cardId,
  open,
  question,
  questionImg,
  setOpen,
}) => {
  const values = {
    answer,
    answerImg,
    question,
    questionImg,
  }

  const [updateCard] = useUpdateCardMutation()

  const onCancel = () => {
    setOpen(false)
  }

  const onSubmit = async (data: FormData) => {
    await handleRequestOnServer(async () => {
      await updateCard({ cardId, data }).unwrap()
      setOpen(false)
    })
  }

  return (
    <ModalWindow open={open} setOpen={setOpen} title={'Edit Card'}>
      <CardForm defaultValues={values} onCancel={onCancel} onSubmit={onSubmit} />
    </ModalWindow>
  )
}
