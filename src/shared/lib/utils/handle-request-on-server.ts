import { errorToastNotification } from '@/shared/lib/utils/error-toast-notification'

export const handleRequestOnServer = async (logic: () => Promise<any>): Promise<void> => {
  try {
    await logic()
  } catch (error) {
    errorToastNotification(error)
  }
}
