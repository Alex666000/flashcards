import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// схема валидации для email и password и rememberMe для формы Регистрации:
const loginSchema = z.object({
  email: z.string().trim().nonempty('Enter email').email('Invalid email address'),
  password: z
    .string()
    .trim()
    .nonempty('Enter password')
    .min(4, 'Password must be at least 4 characters'),
  rememberMe: z.boolean().optional(),
})

export type LoginFormType = z.infer<typeof loginSchema>

export const useLoginForm = () => {
  return useForm<LoginFormType>({
    mode: 'onSubmit',
    resolver: zodResolver(loginSchema),
  })
}
