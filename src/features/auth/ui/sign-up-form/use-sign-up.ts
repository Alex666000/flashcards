import { useForm } from 'react-hook-form'

import { emailSchema, passwordSchema } from '@/shared/common/form-validate-zod-schemas/zod-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const registrationSchema = z
  .object({
    confirmPassword: passwordSchema,
    email: emailSchema,
    password: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export type SignUpFormProps = z.infer<typeof registrationSchema>

export const useSignUp = () => {
  return useForm<SignUpFormProps>({
    defaultValues: {
      confirmPassword: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(registrationSchema),
  })
}
