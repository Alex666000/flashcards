import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useCreateDeckMutation, useGetDecksQuery } from '@/entities/decks/api/decks-api'
import { Button } from '@/shared/ui/button'
import { Body, Cell, Head, HeadCell, Row, Table } from '@/shared/ui/table'
import { TextField, TextField_1 } from '@/shared/ui/text-field_'
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
            <Link to={'/news'}>To News</Link>
            <hr />
            <Typography variant={'body2'}>Card name</Typography>
            <Typography style={{ color: 'green' }} variant={'h2'}>
                Current page: {data?.pagination?.currentPage}
            </Typography>
            <TextField type={'password'} />
            <Table>
                <Head>
                    <Row>
                        <HeadCell>Name</HeadCell>
                        <HeadCell>Cards</HeadCell>
                        <HeadCell>Last Updated</HeadCell>
                        <HeadCell>Created by</HeadCell>
                    </Row>
                </Head>
                <Body>
                    {data?.items.map((deck) => {
                        return (
                            <Row key={deck.id}>
                                <Cell>{deck?.name}</Cell>
                                <Cell>{deck?.cardsCount}</Cell>
                                <Cell>{new Date(deck?.updated).toLocaleDateString()}</Cell>
                                <Cell>{deck?.author?.name}</Cell>
                            </Row>
                        )
                    })}
                </Body>
            </Table>
            {createArray(1, data?.pagination?.totalPages ?? 0).map((i) => {
                return (
                    <Button key={i} onClick={() => setCurrentPage(i)}>
                        {i}
                    </Button>
                )
            })}
        </div>
    )
}

// Функция для пагинации
const createArray = (startNumber: number, length: number) => {
    return Array.from({ length }, (_, index) => startNumber + index)
}

/*
Итог: раньше мы писали в санке запрос на сервер когда ответ пришел ложили его в стейт стеит менялся измененный стеит доставали на UI и происходил перерендеринг
ТЕПЕРЬ: написали 3 строки нам сгенерировался хук и просто в компоненте его дернули - помимо data тут будет и крутилка и ошибка и тд
 */
