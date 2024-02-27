import { useState } from 'react'

import { appStatusSelector } from '@/app/model/selectors/app-status-selector'
import { useCreateDeckMutation } from '@/features/decks/rtk-api'
import { DeckForm } from '@/features/forms'
import { useAppSelector } from '@/shared/lib'
import { handleRequestOnServer } from '@/shared/lib/utils/handle-request-on-server'
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
  // для дизейбла кнопки
  const appStatus = useAppSelector(appStatusSelector)

  // открытием и закрытием модального окна для создания новой колоды
  const [open, setOpen] = useState(false)

  // для выполнения мутации - создания одной колоды
  const [createDeck] = useCreateDeckMutation()

  // вызывается при отправке формы создания колоды. Она обрабатывает запрос на создание колоды
  // с помощью функции createDeck из createDeckMutation()
  const handleSendDeckFormDataSubmit = async (deckFormData: FormData) => {
    // Функция, которая принимает логику - колбек, связанную с запросом и его успешным выполнением
    await handleRequestOnServer(async () => {
      await createDeck(deckFormData).unwrap()
      // после добавления закрываем модалку
      setOpen(false)
    })
  }

  return (
    <>
      <ModalWindow open={open} setOpen={setOpen} title={'Create new deck'}>
        {/* Модалка открылась и открылась внутри форма внутри для создания новой МОЕЙ колоды */}
        <DeckForm
          onCancel={() => setOpen(false)}
          onSendDeckFormDataSubmit={handleSendDeckFormDataSubmit}
        />
      </ModalWindow>
      {/* открываем модалку при нажатии */}
      <Button disabled={appStatus === 'loading'} onClick={() => setOpen(true)}>
        Add New Deck
      </Button>
    </>
  )
}

/*
- FormData - в доке отправлЯем на сервер ни как applicationjson а как multipartform-data,
в ответе получаем applicationjson
 */
