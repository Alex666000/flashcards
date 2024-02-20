import { useState } from 'react'

import { useCreateDeckMutation } from '@/features/decks/api'
import { DeckForm } from '@/features/forms/deck-form/deck-form'
import { handleRequest } from '@/shared/lib/utils/handle-request'
import { Button } from '@/shared/ui/button'
import { ModalWindow } from '@/shared/ui/modal-window'

/**
 * Модальное окно: используется для отображения модального окна с формой создания
 колоды (DeckForm). При открытии модального окна форма загружается, и пользователь может ввести данные
 для создания новой колоды.
 * Обработчики событий: При нажатии на кнопку "Add New Deck" модальное окно
 открывается (setOpen(true)), а при отмене создания колоды или успешном создании колоды модальное
 окно закрывается (setOpen(false)).
----------------------------------------------------------------------------------------------------
 * В итоге - компонент предоставляет пользователю возможность добавления новых колод через модальное
 окно с формой создания колоды.
 */

// отвечает за создание новой колоды:
export const CreateControlForNewDeck = () => {
  // открытием и закрытием модального окна для создания новой колоды
  const [open, setOpen] = useState(false)

  // для выполнения мутации - создания одной колоды
  const [createDeck] = useCreateDeckMutation()

  // вызывается при отправке формы создания колоды. Она обрабатывает запрос на создание колоды
  // с помощью функции createDeck из createDeckMutation()
  const handleCreateDeck = async (deckFormData: FormData) => {
    // Функция, которая принимает логику - колбек, связанную с запросом и его успешным выполнением
    await handleRequest(async () => {
      await createDeck(deckFormData).unwrap()
      setOpen(false)
    })
  }

  return (
    <>
      <ModalWindow open={open} setOpen={setOpen} title={'Create new deck'}>
        {/* форма внутри модального окна для создания новой колоды */}
        <DeckForm onCancel={() => setOpen(false)} onSubmit={handleCreateDeck} />
      </ModalWindow>
      <Button onClick={() => setOpen(true)}>Add New Deck</Button>
    </>
  )
}

/*
- FormData - в доке отправлЯем на сервер ни как applicationjson а как multipartform-data,
в ответе получаем applicationjson
 */
