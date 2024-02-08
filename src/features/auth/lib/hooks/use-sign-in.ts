import { useForm } from 'react-hook-form'

import { emailSchema, passwordSchema } from '@/shared/common/form-validate-zod-schemas/zod-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Определение схемы валидации для полей формы: Zod
const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  rememberMe: z.boolean().optional(),
})

export type SignInFormProps = z.infer<typeof loginSchema>

/**
 * useSignIn, использует хук useForm() из react-hook-form для управления состоянием формы.
 * Он предоставляет значения по умолчанию для полей формы и использует Zod resolver (zodResolver)
 для валидации на основе схемы loginSchema.
 * Пользовательский хук useSignIn можно использовать в компоненте React для управления состоянием
 и валидацией формы входа в систему.
 */
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
