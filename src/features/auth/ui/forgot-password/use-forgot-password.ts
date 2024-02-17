import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email('Invalid Email Address!').nonempty('Enter Email!'),
})

export type ForgotPasswordFormType = z.infer<typeof forgotPasswordSchema>

export const useForgotPassword = () => {
  return useForm<ForgotPasswordFormType>({
    mode: 'onSubmit',
    resolver: zodResolver(forgotPasswordSchema),
  })
}
