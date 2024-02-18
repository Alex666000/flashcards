import { useState } from 'react'

import { useCreateDeckMutation } from '@/features/decks/api'
import { DeckForm } from '@/features/forms/deck-form/deck-form'
import { requestHandler } from '@/shared/lib/utils/request-handler'
import { Button } from '@/shared/ui/button'
import { ModalWindow } from '@/shared/ui/modal-window'

/**
 * Модальное окно: используется для отображения модального окна с формой создания
 колоды (DeckForm). При открытии модального окна форма загружается, и пользователь может ввести данные
 для создания новой колоды. Обработчики событий: При нажатии на кнопку "Add New Deck" модальное окно
 открывается (setOpen(true)), а при отмене создания колоды или успешном создании колоды модальное окно
 закрывается (setOpen(false)). Визуализация: Компонент отображает кнопку "Add New Deck", которая при
 нажатии открывает модальное окно для создания новой колоды.
  --------------------------------------------------------------------------------------------------
 * В итоге - компонент предоставляет пользователю возможность добавления новых колод через модальное
 окно с формой создания колоды.
 */

// отвечает за создание новой колоды:
export const CreateControl = () => {
  // открытием и закрытием модального окна для создания новой колоды
  const [open, setOpen] = useState(false)

  // для выполнения мутации создания колоды
  const [createDeck] = useCreateDeckMutation()

  // вызывается при отправке формы создания колоды. Она обрабатывает запрос на создание колоды
  // с помощью функции createDeck из createDeckMutation()
  const handleCreateDeck = async (deckFormData: FormData) => {
    // Функция, которая принимает логику - колбек, связанную с запросом и его успешным выполнением
    await requestHandler(async () => {
      await createDeck(deckFormData).unwrap()
      setOpen(false)
    })
  }

  return (
    <>
      <ModalWindow open={open} setOpen={setOpen} title={'Create new deck'}>
        <DeckForm onCancel={() => setOpen(false)} onSubmit={handleCreateDeck} />
      </ModalWindow>
      <Button onClick={() => setOpen(true)}>Add New Deck</Button>
    </>
  )
}
