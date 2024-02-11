/**
 * formatTextBr - принимает строку message и разбивает ее на две части: 1 часть содержит текст
 * до первого встреченного символа пунктуации ([?.!]), 2 (оставшаяся..) часть - текст после него.
 * Если символ пунктуации не найден, возвращается исходная строка.
 * В противном случае функция возвращает React-фрагмент (<>...</>) с использованием HTML-тега <br />
 * для создания переноса строки между первой и второй частями текста
 */

export const formatTextBr = (message: string) => {
  const punctuationIndex = message.search(/[?.!]/)

  if (punctuationIndex !== -1) {
    const firstPart = message.slice(0, punctuationIndex + 1)
    const restPart = message.slice(punctuationIndex + 1).trim()

    return (
      <>
        {firstPart} <br />
        {restPart}
      </>
    )
  }

  return message
}
