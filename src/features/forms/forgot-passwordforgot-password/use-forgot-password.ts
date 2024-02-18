import { useForm } from 'react-hook-form'

import { emailSchema } from '@/shared/lib/form-validate-zod-schemas/zod-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

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
