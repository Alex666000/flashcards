import { FC } from 'react'

import { DeckForm } from '@/features/forms/deck-form/deck-form'
import { handleRequestOnServer } from '@/shared/lib/utils/handle-request-on-server'
import { ModalWindow } from '@/shared/ui/modal-window'

import { useUpdateDeckMutation } from '../../rtk-api'

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
    await handleRequestOnServer(async () => {
      await editDeck({ data, id }).unwrap()
      setOpen(false)
    })
  }

  return (
    <ModalWindow open={open} setOpen={setOpen} title={'Edit Deck'}>
      <DeckForm
        defaultValues={startValues}
        onCancel={() => setOpen(false)}
        onSendDeckFormDataSubmit={editDeckHandler}
      />
    </ModalWindow>
  )
}
