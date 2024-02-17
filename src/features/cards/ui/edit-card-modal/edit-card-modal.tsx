import { FC } from 'react'

import { CardForm } from '@/features/forms/card/card'
import { requestHandler } from '@/shared/lib/utils/request-handler'
import { ModalWindow } from '@/shared/ui/modal-window'

import { useUpdateCardMutation } from '../../rtk-api'

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
    await requestHandler(async () => {
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
