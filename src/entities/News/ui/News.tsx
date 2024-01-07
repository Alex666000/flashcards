import { Link } from 'react-router-dom'

import { useLazyGetDecksQuery } from '@/entities/Decks/api/decks-api'
import { Button } from '@/shared/ui/button'

export const News = () => {
    // const { data } = useGetDecksQuery({}) -- запрашиваем данные такие же как и в компоненте Decks

    // 1 параметр: getDecks - функция которую сможем дергать
    const [getDecks, { data }] = useLazyGetDecksQuery() // если хотим по клику на кнопку получать данные

    const onGetDataClick = () => {
        getDecks()
    }

    return (
        <div>
            <Link to={'/'}>To Decks</Link>
            {data?.items.map((deck) => <p key={deck.id}>{deck.name}</p>)}
            <Button onClick={onGetDataClick}>Get data</Button>
        </div>
    )
}
