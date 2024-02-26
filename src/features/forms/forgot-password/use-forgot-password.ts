import { useForm } from 'react-hook-form'

import { emailSchema } from '@/shared/lib'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// схема валидации
const forgotPasswordSchema = z.object({
  email: emailSchema,
})

export type ForgotPasswordFormType = z.infer<typeof forgotPasswordSchema>

export const useForgotPassword = () => {
  return useForm<ForgotPasswordFormType>({
    defaultValues: { email: '' },
    resolver: zodResolver(forgotPasswordSchema),
  })
}
