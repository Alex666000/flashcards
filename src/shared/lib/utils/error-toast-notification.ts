import { toast } from 'react-toastify'

/**
 * Функция принимает один параметр - err, который может быть любого типа.
 * Сначала она проверяет, является ли переданный объект err - объектом и содержит ли свойство data.
 * Если да, то она проверяет, есть ли в объекте err.data свойство status и является ли его тип числом
 * больше или равным 400. Если это так и в объекте err.data есть свойство message с типом строка,
 * то выводится уведомление об ошибке с сообщением из err.data.message.
 * Затем она проверяет, есть ли в объекте err.data свойство errorMessages. Если оно есть и является
 * массивом, то функция проходит по всем элементам массива и выводит уведомление об ошибке для каждого
 * элемента. Если не удалось вывести сообщение об ошибке из err.data, функция выводит общее сообщение
 * об ошибке. В конце, если объект err является экземпляром класса Error, то выводится сообщение об
 * ошибке из свойства err.message.
 *
 * Таким образом, данная функция обрабатывает различные случаи
 * возникновения ошибок и выводит соответствующие уведомления об ошибках для каждого из них.
 */
export const errorToastNotification = (err: unknown) => {
  if (
    typeof err === 'object' &&
    err !== null &&
    'data' in err &&
    typeof err.data === 'object' &&
    err.data !== null
  ) {
    if (
      'status' in err &&
      typeof err.status === 'number' &&
      err.status >= 400 &&
      'message' in err.data &&
      typeof err.data.message === 'string'
    ) {
      toast.error(err.data.message, { containerId: 'common' })
    } else if ('errorMessages' in err.data) {
      if (Array.isArray(err.data.errorMessages)) {
        if (typeof err.data.errorMessages[0] === 'string') {
          err.data.errorMessages.forEach((el) => {
            toast.error(el, { containerId: 'common' })
          })
        } else {
          const error = err as any // as ErrorResponse from 'см quiz проект..'

          error.data.errorMessages.forEach((el: any) => {
            toast.error(el.message, { containerId: 'common' })
          })
        }
      }
    } else {
      toast.error('Some error occurred', { containerId: 'common' })
    }
  }

  if (err instanceof Error) {
    toast.error(err.message, { containerId: 'common' })
  }
}
