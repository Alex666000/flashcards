/**
 * Функция, которая принимает логику - колбек, связанную с запросом и его успешным выполнением.
 * Встроена обработка ошибок и уведомление.
 * logic - Функция, содержащая логику для успешного выполнения запроса. Для блока try.
 */

import { errorToastNotification } from '@/shared/lib/utils/error-toast-notification'

export const requestHandler = async (logic: () => Promise<any>): Promise<void> => {
  try {
    await logic()
  } catch (error) {
    errorToastNotification(error)
  }
}
