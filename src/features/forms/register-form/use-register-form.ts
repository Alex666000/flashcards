import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// схема валидации для email и password для формы Логина:
export const registerSchema = z
  .object({
    confirm: z
      .string()
      .trim()
      .nonempty('Enter password')
      .min(4, 'Password must be at least 8 characters'),
    email: z.string().trim().nonempty('Enter email').email('Invalid email address'),
    password: z
      .string()
      .trim()
      .nonempty('Enter password')
      .min(4, 'Password must be at least 8 characters'),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'The passwords did not match',
    path: ['confirm'],
  })

export type RegisterFormData = z.infer<typeof registerSchema>

// обертка над useForm from 'react-hook-form'
export const useRegisterForm = () => {
  return useForm<RegisterFormData>({
    mode: 'onSubmit',
    resolver: zodResolver(registerSchema), // zod схема валидации
  })
}
