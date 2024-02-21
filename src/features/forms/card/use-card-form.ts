import { useForm } from 'react-hook-form'

import { fileSchema, stringSchema } from '@/shared/lib'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const cardScheme = z.object({
  answer: stringSchema,
  answerImg: fileSchema,
  question: stringSchema,
  questionImg: fileSchema,
})

export type CardFormType = z.infer<typeof cardScheme>

export const useCardForm = (props: CardFormType) => {
  return useForm<CardFormType>({
    defaultValues: props,
    resolver: zodResolver(cardScheme),
  })
}
