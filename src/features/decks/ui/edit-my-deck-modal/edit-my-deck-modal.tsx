import { FC } from 'react'

import { useUpdateDeckMutation } from '@/features/decks/api'
import { DeckForm } from '@/features/forms/deck-form/deck-form'
import { requestHandler } from '@/shared/lib/utils/request-handler'
import { ModalWindow } from '@/shared/ui/modal-window'

export type EditDeckModalProps = {
  cover: null | string // обложка
  id: string
  isPrivate: boolean
  name: string
  open: boolean
  setOpen: (value: boolean) => void
}

/**
 * Модальное окно для редактирования моей колоды
 */
export const EditMyDeckModal: FC<EditDeckModalProps> = ({
  cover,
  id,
  isPrivate,
  name,
  open,
  setOpen,
}) => {
  //  для предварительного заполнения формы редактирования колоды
  const startValues = {
    cover,
    isPrivate,
    name,
  }

  // для создания мутации editDeck, которая позволяет обновлять информацию о колоде
  const [editDeck] = useUpdateDeckMutation()

  // функция вызывается при отправке формы редактирования колоды. Она выполняет мутацию editDeck,
  // передавая данные формы и идентификатор колоды.
  // После успешного выполнения мутации модальное окно закрываетс
  const editDeckHandler = async (data: FormData) => {
    await requestHandler(async () => {
      await editDeck({ data, id }).unwrap()
      setOpen(false)
    })
  }

  return (
    <ModalWindow open={open} setOpen={setOpen} title={'Edit Deck'}>
      <DeckForm
        defaultValues={startValues}
        onCancel={() => setOpen(false)}
        onSubmit={editDeckHandler}
      />
    </ModalWindow>
  )
}
