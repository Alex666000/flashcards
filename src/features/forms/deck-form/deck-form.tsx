import { memo, useState } from 'react'
import { toast } from 'react-toastify'

import { Button } from '@/shared/ui/button'
import {
  ControlledCheckbox,
  ControlledPreviewFileUploader,
  ControlledTextField,
} from '@/shared/ui/controlled'

import s from './deck-form.module.scss'

import { DeckFormType, useDeckForm } from './use-deck-form'

// DeckFormDefaultValues - то что отправляем на сервер в при заполнении полей формы согласно доке
type DeckFormDefaultValues = {
  cover?: null | string
} & Pick<DeckFormType, 'isPrivate' | 'name'> // взять из типа DeckFormType эти свойиства только и всё

type Props = {
  defaultValues?: DeckFormDefaultValues
  onCancel: () => void // Колбек для отмены создания или редактирования колоды
  onSendDeckFormDataSubmit: (deckFormData: FormData) => void // Колбек для отправки данных формы
}

// DeckForm -- ФОРМА для создания или редактирования  моей колоды
// на UX - состоит из всего что ниже Create new deck c кнопкой "Х":
export const DeckForm = memo(({ defaultValues, onCancel, onSendDeckFormDataSubmit }: Props) => {
  // downloaded: Строка с URL изображения обложки - cover, которое было загружено.
  // Используется для отображения превью загруженного изображения
  const [downloaded, setDownloaded] = useState<null | string>(defaultValues?.cover || null)

  // coverError: Строка с сообщением об ошибке, связанной с загрузкой обложки-cover
  const [coverError, setCoverError] = useState<null | string>(null)

  const values: DeckFormType = {
    isPrivate: defaultValues?.isPrivate || false,
    name: defaultValues?.name || '',
  }

  // Хук для управления состоянием формы. Возвращает объект с методами для контроля значений полей,
  // валидации, обработки событий и т.д
  const { control, getFieldState, handleSubmit, resetField, setValue, trigger, watch } =
    useDeckForm(values)

  // Переменная fileIsDirty используется для определения того, был ли файл обложки колоды изменен
  // («грязный»). Она получается из состояния поля обложки с помощью getFieldState('cover').isDirty
  const fileIsDirty = getFieldState('cover').isDirty

  const file = watch('cover')

  // Обработчик удаления обложки колоды. Сбрасывает ошибку обложки, устанавливает downloaded в
  // null и выводит уведомление
  const deleteCoverHandler = () => {
    if (coverError) {
      setCoverError(null)
    }
    toast.warning('You deleted cover', { containerId: 'common' })
    setValue('cover', null)
    setDownloaded(null)
  }

  // Функция, выполняемая при дополнительных действиях с обложкой (например, при успешной загрузке).
  // Валидирует обложку, обрабатывает ошибки, обновляет downloaded и выводит уведомления
  const extraActionsForCover = async () => {
    const success = await trigger('cover')
    const { error } = getFieldState('cover')
    const file = watch('cover')

    if (!success && error?.message) {
      toast.error(error.message, { containerId: 'modal' })
      setCoverError(error.message)
      resetField('cover')
    }

    if (file) {
      const badCase = defaultValues?.cover ?? null
      const img = success ? URL.createObjectURL(file) : badCase

      setDownloaded(img)

      if (coverError && !error?.message) {
        setCoverError(null)
      }
    }
  }

  // Обработчик отправки данных формы. Создает объект formData, добавляет в него данные из формы
  // и вызывает функцию onSubmit
  // выбрали фото с компа и попали сюда
  const handlerSendFormDataSubmit = (data: DeckFormType) => {
    // общяя форма, в нее добавляем поля что юзер (append) заполнит и потом отправим
    // в этот объект эти поля
    const deckFormData = new FormData()

    // в deckFormData добавляем наш файл
    deckFormData.append('name', data.name)
    deckFormData.append('isPrivate', `${data.isPrivate}`)

    if (file === null) {
      deckFormData.append('cover', '')
    } else if (fileIsDirty && data.cover) {
      deckFormData.append('cover', data.cover)
    }
    // когда пользователь заполнил поля отправил форму - и сверху в родителе делается post запрос
    // на сервер с данными что юзер в форме заполнил - на сервак отправили: cover (фото), name
    // и поле isPrivate смотри документацию и 1.14.00 Валера старые карточки 4 занятие конспект
    onSendDeckFormDataSubmit(deckFormData)
    // чтобы получить новую картинку и поля надо сделать get() запрос..
    // смотрим нетворк что за запрос ушел и что нам в ответе пришло
    // когда ответ от сервака тип картинки придет blob значит др код с deckFormData пишем см.
    // Валера 4 занятия старые карты 1.20.00
  }

  return (
    // форма внутри модального окна
    <form className={s.deckForm} onSubmit={handleSubmit(handlerSendFormDataSubmit)}>
      {/* Картинка + кнопка "Change Cover" - Компонент для загрузки и предпросмотра изображения
      обложки cover */}
      <ControlledPreviewFileUploader
        control={control}
        deleteCoverHandler={deleteCoverHandler}
        errorMessage={coverError}
        extraActions={extraActionsForCover}
        name={'cover'}
        preview={downloaded}
      />
      <ControlledTextField control={control} label={'Name Deck'} name={'name'} />
      <ControlledCheckbox control={control} label={'Private Deck'} name={'isPrivate'} />
      <div className={s.controls}>
        <Button onClick={onCancel} type={'button'} variant={'secondary'}>
          Cancel
        </Button>
        <Button>Send</Button>
      </div>
    </form>
  )
})

/*
- FormData - в доке отправлЯем на сервер ни как applicationjson а как multipartform-data,
в ответе получаем applicationjson
 */
