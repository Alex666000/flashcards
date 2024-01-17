import { useState } from 'react'

import { useCreateDeckMutation, useGetDecksQuery } from '@/entities/decks/api/decks-api'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from '@/shared/ui/table'
import { Typography } from '@/shared/ui/typography'

export const Decks = () => {
    const [value, setValue] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [cardName, setCardName] = useState('')
    const { data, error, isLoading } = useGetDecksQuery({
        currentPage: currentPage,
        itemsPerPage: 3,
    })

    // console.log(data)

    const [createDeck, { data: newDeckData, isLoading: isCreateDeckLoading }] =
        useCreateDeckMutation()

    console.log(newDeckData)

    if (isLoading || isCreateDeckLoading) {
        return <Typography variant={'h1'}>Loading...</Typography>
    }

    if (error) {
        const err = error as any

        return <Typography variant={'h1'}>{err.data.message}</Typography>
    }

    // const clearFieldInput = () => {
    //     setValue('')
    // }

    return (
        <div>
            {/*<Link to={'/news'}>To News</Link>*/}
            {/*<hr />*/}
            {/*<Typography variant={'body2'}>Card name</Typography>*/}
            {/*<Typography style={{ color: 'green' }} variant={'h2'}>*/}
            {/*    Current page: {data?.pagination?.currentPage}*/}
            {/*</Typography>*/}
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeadCell>Name</TableHeadCell>
                        <TableHeadCell>Cards</TableHeadCell>
                        <TableHeadCell>Last Updated</TableHeadCell>
                        <TableHeadCell>Created by</TableHeadCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.items.map((deck) => {
                        return (
                            <TableRow key={deck.id}>
                                <TableCell>{deck?.name}</TableCell>
                                <TableCell>{deck?.cardsCount}</TableCell>
                                <TableCell>
                                    {new Date(deck?.updated).toLocaleDateString()}
                                </TableCell>
                                <TableCell>{deck?.author?.name}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
            {/*{createArray(1, data?.pagination?.totalPages ?? 0).map((i) => {*/}
            {/*    return (*/}
            {/*        <Button key={i} onClick={() => setCurrentPage(i)}>*/}
            {/*            {i}*/}
            {/*        </Button>*/}
            {/*    )*/}
            {/*})}*/}
        </div>
    )
}

const createArray = (startNumber: number, length: number) => {
    return Array.from({ length }, (_, index) => startNumber + index)
}

/*
Итог: раньше мы писали в санке запрос на сервер когда ответ пришел ложили его в стейт стеит менялся измененный стеит доставали на UI и происходил перерендеринг
ТЕПЕРЬ: написали 3 строки нам сгенерировался хук и просто в компоненте его дернули - помимо data тут будет и крутилка и ошибка и тд
 */
