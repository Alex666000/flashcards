import { useForm } from 'react-hook-form'

import { emailSchema, stringSchema } from '@/shared/lib'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const loginSchema = z.object({
  email: emailSchema,
  password: stringSchema,
  rememberMe: z.boolean().optional(),
})

export type SignInFormProps = z.infer<typeof loginSchema>

export const useSignIn = () => {
  return useForm<SignInFormProps>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    resolver: zodResolver(loginSchema),
  })
}
