import { useParams } from 'react-router-dom'

import { useGetDeckByIdQuery } from '@/entities/Decks/services/decks-api'

// Одна колода
export const Deck = () => {
    const { deckId } = useParams()

    // запрос за одной колодой
    const { data, error, isLoading } = useGetDeckByIdQuery(deckId ?? '')

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (error) {
        const err = error as any

        return <h1>{err.data.message}</h1>
    }

    return <div>{JSON.stringify(data)}</div>
}

/*
Итог: раньше мы писали в санке запрос на сервер когда ответ пришел ложили его в стейт стеит менялся измененный стеит доставали на UI и происходил перерендеринг
ТЕПЕРЬ: написали 3 строки нам сгенерировался хук и просто в компоненте его дернули - помимо data тут будет и крутилка и ошибка и тд
 */
