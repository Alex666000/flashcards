import { useState } from 'react'

import { CardPropsDV } from '@/features/forms'

export const usePreviewErrorData = (defaultValues?: CardPropsDV) => {
  const isAnyPictureExist = defaultValues?.questionImg || defaultValues?.answerImg

  const [questionImgUpd, setQuestionImgUpd] = useState(defaultValues?.questionImg || null)
  const [answerImgUpd, setAnswerImgUpd] = useState(defaultValues?.answerImg || null)

  const [answerImgError, setAnswerImgError] = useState<null | string>(null)
  const [questionImgError, setQuestionImgError] = useState<null | string>(null)

  const errorData = {
    answerImg: { set: setAnswerImgError, text: answerImgError },
    questionImg: { set: setQuestionImgError, text: questionImgError },
  }

  const previewData = {
    answerImg: { picture: answerImgUpd, set: setAnswerImgUpd },
    questionImg: { picture: questionImgUpd, set: setQuestionImgUpd },
  }

  return { errorData, isAnyPictureExist, previewData }
}
