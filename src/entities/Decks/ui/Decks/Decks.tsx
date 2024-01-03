import { Link } from 'react-router-dom'

import { useCreateDeckMutation, useGetDecksQuery } from '@/entities/Decks/services/decks-api'
import { Button } from '@/shared/ui/button'
import { Table, TableBody, TableCell, TableHeadCell, TableRow } from '@/shared/ui/table'
import { nanoid } from '@reduxjs/toolkit'

export const Decks = () => {
    // сделали запрос на сервер и в result лежат данные
    const { data, error, isLoading } = useGetDecksQuery({ itemsPerPage: 3, name: 'w' })
    // console.log(data)

    const [createDeck, { isLoading: isCreateLoading }] = useCreateDeckMutation()

    if (isLoading || isCreateLoading) {
        return <h1>Loading...</h1>
    }

    if (error) {
        const err = error as any

        return <h1>{err.data.message}</h1>
    }

    const onCreateDeckClick = () => {
        createDeck({ name: 'title 👌' + nanoid() })
    }

    return (
        <div>
            <Link to={'/news'}>To News</Link>
            <hr />
            <Button onClick={onCreateDeckClick}>Create Deck</Button>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableHeadCell>Name</TableHeadCell>
                        <TableHeadCell>Cards</TableHeadCell>
                        <TableHeadCell>Last Updated</TableHeadCell>
                        <TableHeadCell>Created by</TableHeadCell>
                    </TableRow>
                    {data?.items.map((deck) => {
                        return (
                            <TableRow key={deck.id}>
                                <TableCell>{deck.name}</TableCell>
                                <TableCell>{deck.cardsCount}</TableCell>
                                <TableCell>{deck.updated}</TableCell>
                                <TableCell>{deck.author.name}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )
}

/*
Итог: раньше мы писали в санке запрос на сервер когда ответ пришел ложили его в стейт стеит менялся измененный стеит доставали на UI и происходил перерендеринг
ТЕПЕРЬ: написали 3 строки нам сгенерировался хук и просто в компоненте его дернули - помимо data тут будет и крутилка и ошибка и тд
 */
