import { useForm } from 'react-hook-form'

import { fileSchema, stringSchema } from '@/shared/lib/form-validate-zod-schemas/zod-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const deckSchema = z.object({
  cover: fileSchema,
  isPrivate: z.boolean(),
  name: stringSchema,
})

export type DeckFormType = z.infer<typeof deckSchema>

/**
 * useDeckForm позволяет легко создавать и управлять формой с заданными полями
 * и правилами валидации, используя библиотеки react-hook-form и zod.
 */

export const useDeckForm = (props: DeckFormType) => {
  return useForm<DeckFormType>({
    defaultValues: props,
    resolver: zodResolver(deckSchema),
  })
}
