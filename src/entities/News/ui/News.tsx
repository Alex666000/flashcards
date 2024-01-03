import { Link } from 'react-router-dom'

import { useLazyGetDecksQuery } from '@/entities/Decks/services/decks-api'
import { Button } from '@/shared/ui/button'

export const News = () => {
    // const { data } = useGetDecksQuery({})

    // getDecks - функция которую сможем дергать
    const [getDecks, { data }] = useLazyGetDecksQuery()

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
