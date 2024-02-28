import { ChangeEvent } from 'react'
import { toast } from 'react-toastify'

import {
  useLogoutMutation,
  useMeQuery,
  useUpdateProfileMutation,
} from '@/features/auth/api/auth.api'
import { EditProfileFormProps } from '@/features/forms/edit-profile/use-edit-profile'
import { errorNotification } from '@/shared/lib/utils/error-notification'
import { validateImage } from '@/shared/lib/utils/validate-image'
import { ProfileInfoProps } from '@/widgets/profile-info/ui/profile-info'

export const useProfile = () => {
  const { data } = useMeQuery()
  const user = data as ProfileInfoProps

  const [updateProfile] = useUpdateProfileMutation()

  const [logout] = useLogoutMutation()

  const updateAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files && e.target.files.length) {
        const file = e.target.files[0]

        if (validateImage(file)) {
          const formData = new FormData()

          formData.append('avatar', file)
          await updateProfile(formData).unwrap()

          toast.success('Your avatar successfully changed', { containerId: 'common' })
        }
      }
    } catch (error) {
      errorNotification(error)
    }
  }

  const onUpdate = async (data: EditProfileFormProps) => {
    const form = new FormData()

    Object.keys(data).forEach((key) => {
      form.append(key, data[key as keyof EditProfileFormProps])
    })

    return updateProfile(form).unwrap()
  }

  return { logout, onUpdate, updateAvatar, user }
}
