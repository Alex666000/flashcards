import { FC, useState } from 'react'
import { toast } from 'react-toastify'

import { Card } from '@/features/cards'
import { CardFormType, useCardForm, usePreviewErrorData } from '@/features/forms'
import { Button } from '@/shared/ui/button'
import { Container } from '@/shared/ui/container'
import { ControlledPreviewFileUploader, ControlledTextField } from '@/shared/ui/controlled'
import { Select } from '@/shared/ui/select'

import s from './card.module.scss'

const options = [
  { label: 'Text', value: 'text' },
  { label: 'Picture', value: 'picture' },
]

export type CardPropsDV = Pick<Card, 'answer' | 'answerImg' | 'question' | 'questionImg'>

type Props = {
  // начальные значения карточки, которые будут использоваться для заполнения формы.
  // Если компонент используется для редактирования существующей карточки, эти значения будут
  // загружены из базы данных
  defaultValues?: CardPropsDV
  // вызывается при отмене создания или редактирования карточки. Обычно она закрывает модальное окно
  // или перенаправляет пользователя на другую страницу
  onCancel: () => void
  // вызывается при отправке формы. В нее передаются данные, введенные пользователем в форму.
  // Обычно она отправляет эти данные на сервер для сохранения или обновления карточки
  onSubmit: (data: any) => void
}

/**
 * CardForm представляет форму для создания или редактирования моей карточки
 * CardForm использует хуки и функции для управления формой, валидации данных, загрузки изображений
 * и отправки данных на сервер. Он предоставляет удобный и наглядный интерфейс для создания
 * и редактирования карточек, обеспечивая при этом гибкость и возможность обработки различных
 * сценариев использования
 */

export const CardForm: FC<Props> = ({ defaultValues, onCancel, onSubmit }) => {
  // для предварительного просмотра загруженных изображений и отображения ошибок
  const { errorData, isAnyPictureExist, previewData } = usePreviewErrorData(defaultValues)

  // формат вопроса: в виде картинки или текста
  const [format, setFormat] = useState(isAnyPictureExist ? 'picture' : 'text')
  const withPicture = format === 'picture'

  const values = {
    answer: defaultValues?.answer || '',
    question: defaultValues?.question || '',
  }

  const { control, getFieldState, handleSubmit, resetField, setValue, trigger, watch } =
    useCardForm(values)

  const questionFile = watch('questionImg')
  const answerFile = watch('answerImg')

  const questionImgIsDirty = getFieldState('questionImg').isDirty
  const answerImgIsDirty = getFieldState('answerImg').isDirty

  const extraActions = (name: 'answerImg' | 'questionImg') => async () => {
    const success = await trigger(name)
    const { error } = getFieldState(name)
    const file = watch(name)

    if (!success && error?.message) {
      toast.error(error.message, { containerId: 'common' })
      errorData[name].set(error.message)
      resetField(name)
    }

    if (file) {
      const badCase = defaultValues?.[name] ?? null
      const img = success ? URL.createObjectURL(file) : badCase

      previewData[name].set(img)

      if (errorData[name].text && !error?.message) {
        errorData[name].set(null)
      }
    }
  }

  const deleteCoverHandler = (name: 'answerImg' | 'questionImg') => () => {
    if (errorData[name].text) {
      errorData[name].set(null)
    }
    toast.warning('You deleted cover', { containerId: 'common' })
    setValue(name, null)
    previewData[name].set(null)
  }

  //  вызывается при отправке формы. Она формирует объект FormData с данными формы, включая текстовые
  //  поля и загруженные изображения, и передает эти данные функции onSubmit для дальнейшей
  //  обработки на сервере
  const sendHandler = (data: CardFormType) => {
    const form = new FormData()

    form.append('question', data.question)
    form.append('answer', data.answer)

    if (withPicture) {
      if (questionFile === null) {
        form.append('questionImg', '')
      } else if (questionImgIsDirty && data.questionImg) {
        form.append('questionImg', data.questionImg)
      }

      if (answerFile === null) {
        form.append('answerImg', '')
      } else if (answerImgIsDirty && data.answerImg) {
        form.append('answerImg', data.answerImg)
      }
    }
    // вызывается при отправке формы. В нее передаются данные, введенные пользователем в форму.
    // Обычно она отправляет эти данные на сервер для сохранения или обновления карточки
    onSubmit(form)
  }

  return (
    <form className={s.cardFormBlock} onSubmit={handleSubmit(sendHandler)}>
      <Container className={s.selectContainer}>
        <Select
          className={s.select}
          label={'Choose A Question Format'}
          onValueChange={setFormat}
          options={options}
          value={format}
        />
        <ControlledTextField
          className={s.userInput}
          control={control}
          label={'Question'}
          name={'question'}
        />
        {/* Если в селекте выбрали картинку открывается Модалка с заполнением формы вопроса и ответа*/}
        {withPicture && (
          <ControlledPreviewFileUploader
            control={control}
            deleteCoverHandler={deleteCoverHandler('questionImg')}
            errorMessage={errorData.questionImg.text}
            extraActions={extraActions('questionImg')}
            name={'questionImg'}
            preview={previewData.questionImg.picture}
          />
        )}
        <ControlledTextField control={control} label={'Answer'} name={'answer'} />
        {withPicture && (
          <ControlledPreviewFileUploader
            control={control}
            deleteCoverHandler={deleteCoverHandler('answerImg')}
            errorMessage={errorData.answerImg.text}
            extraActions={extraActions('answerImg')}
            name={'answerImg'}
            preview={previewData.answerImg.picture}
          />
        )}
        <div className={s.controls}>
          <Button onClick={onCancel} type={'button'} variant={'secondary'}>
            Cancel
          </Button>
          <Button>{defaultValues ? 'Save Changes' : 'Add New Card'}</Button>
        </div>
      </Container>
    </form>
  )
}
