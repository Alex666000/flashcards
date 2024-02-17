import { useForm } from 'react-hook-form'

import { stringSchema } from '@/shared/lib/form-validate-zod-schemas/zod-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const createNewPasswordSchema = z.object({
  password: stringSchema,
})

export type CreateNewPasswordFormType = z.infer<typeof createNewPasswordSchema>

export const useCreateNewPassword = () => {
  return useForm<CreateNewPasswordFormType>({
    defaultValues: { password: '' },
    resolver: zodResolver(createNewPasswordSchema),
  })
}
