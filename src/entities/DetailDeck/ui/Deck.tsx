import { useParams } from 'react-router-dom'

import { useGetDeckByIdQuery } from '@/entities/Decks/api/decks-api'
import { Typography } from '@/shared/ui/typography'

// Одна колода:
export const Deck = () => {
    const { deckId } = useParams() // Достали из урла

    // запрос за одной колодой
    const { data, error, isLoading } = useGetDeckByIdQuery(deckId ?? '') // тут пишем параметры только для GET запросов

    // console.log(data)

    if (isLoading) {
        return <Typography variant={'h1'}>Loading...</Typography>
    }

    if (error) {
        const err = error as any

        return <Typography variant={'h1'}>{err.data.message}</Typography>
    }

    /* Не стали отрисовывать детальную колоду конкретную - сделали заглушку: JSON.stringify */
    return <div>{JSON.stringify(data)}</div>
}

/*
Итог: раньше мы писали в санке запрос на сервер - когда ответ пришел ложили его в стейт - стеит
менялся - измененный стеит доставали на UI - и происходил перерендеринг
ТЕПЕРЬ: написали 3 строки - нам сгенерировался хук и просто в компоненте его дернули -
помимо data тут будет и крутилка и ошибка и тд.
 */
