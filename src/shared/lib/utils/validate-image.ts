import { validateFile } from '@/shared/common/utils/validate-file'

export const validateImage = (file: File) => {
  const maxSizeInBytes = 1024 * 1024
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']

  return validateFile(file, maxSizeInBytes, allowedTypes)
}
