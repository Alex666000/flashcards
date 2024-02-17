import { useForm } from 'react-hook-form'

import { stringSchema } from '@/shared/lib/form-validate-zod-schemas/zod-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const editProfileSchema = z.object({
  name: stringSchema,
})

export type EditProfileFormProps = z.infer<typeof editProfileSchema>

export const useEditProfile = (initialValues: EditProfileFormProps = { name: '' }) => {
  return useForm<EditProfileFormProps>({
    defaultValues: initialValues,
    resolver: zodResolver(editProfileSchema),
  })
}
