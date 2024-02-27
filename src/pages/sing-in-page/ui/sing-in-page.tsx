import { memo } from 'react'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { LoginBodyArgs } from '@/features/auth'
import { useLoginMutation, useMeQuery } from '@/features/auth/rtk-api/auth.api'
import { LoginForm } from '@/features/forms'
import { ROUTES, handleRequestOnServer } from '@/shared/lib'
import { Page } from '@/shared/ui/page'

// авторизация - логинизация
const SingInPage = () => {
  const { data: meAuthData } = useMeQuery()
  // в мутациях 1 параметр функция которую вызываем и засовываем данные в нее
  // тут вызываем даем данные но на основании их не отрисовываем ничего а просто логинемся
  // и редиректимся на страницу всех колод
  const [login] = useLoginMutation()

  const handleLoginFormDataSubmit = async (data: LoginBodyArgs) => {
    await handleRequestOnServer(async () => {
      await login(data).unwrap()
      toast.success('You are successfully authorized', { containerId: 'common' })
    })
  }

  if (meAuthData && !('success' in meAuthData)) {
    return <Navigate to={ROUTES.decks} />
  }

  return (
    <Page>
      <LoginForm onLoginFormDataSubmit={handleLoginFormDataSubmit} />
    </Page>
  )
}

export default memo(SingInPage)

/*
- Нейминг - пример: когда на событие то так иначе обычно через глагол: createDeck()
----------------------------------------------------------------------------------
Нейминг: - 2.08.00 — неиминг название функций обработчиков например: onInputChange или когда колбек то onTodolist Added
- если метод вызывается на event-e то on_target_onClick: if => onEvent => name on_target_Event: например: onBookCardClick (т.е нажали по
- карточкам книг...указываем по чём кликнули). Еще пример onKey_target_Down
- когда метод передаем пропсами из родителя в дочку всегда начинается с handle а заканчивается событием к примеру в дочке вызываем этот
  колбек на событие onBlur - значит в родителе называем "обработать установку книг", в родителе в названии пропса удаляем handle и итог
  такой: onSetBookBlur={handleSetBookBlur}. Методы которые создаются не на события называют стандартно с глагола6 createDeck() например
 */
