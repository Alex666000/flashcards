import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useCreateDeckMutation, useGetDecksQuery } from '@/entities/Decks/api/decks-api'
import { Button } from '@/shared/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from '@/shared/ui/table'
import { Typography } from '@/shared/ui/typography'
import { nanoid } from '@reduxjs/toolkit'

export const Decks = () => {
    const [currentPage, setCurrentPage] = useState(1)

    // сделали запрос на сервер и в result лежат данные
    // data: это -- когда данные приходя они сами записываются в редакс и передаются нам в наш data объект
    // isLoading - первая загрузка когда нет данных,
    // isFetching - последующие загрузки используются при инвалидации - isFetching -- когда по тэгам обновляются данные
    const { data, error, isLoading } = useGetDecksQuery({
        currentPage: currentPage, // Параметр запроса
        itemsPerPage: 3, // Параметры запроса - 4 колоды на странице
    })

    // console.log(data)

    const [createDeck, { data: newDeckData, isLoading: isCreateLoading }] = useCreateDeckMutation()

    console.log(newDeckData)

    if (isLoading || isCreateLoading) {
        return <Typography variant={'h1'}>Loading...</Typography>
    }

    if (error) {
        const err = error as any

        return <Typography variant={'h1'}>{err.data.message}</Typography>
    }

    const onCreateDeckClick = () => {
        createDeck({ name: 'title 👌' + nanoid() })
    }

    const changeDeskPageHandler = (page: number) => {
        setCurrentPage(page)
    }

    return (
        <div>
            {/* При клике на To News - перекинет на стр. '/news' */}
            <Link to={'/news'}>To News</Link>
            <hr />
            <Button onClick={onCreateDeckClick}>Create Deck</Button>
            <hr />
            <h1 style={{ color: 'green' }}>{currentPage}</h1>
            <Button onClick={() => changeDeskPageHandler(1)}>1</Button>
            <Button onClick={() => changeDeskPageHandler(2)}>2</Button>
            <Button onClick={() => changeDeskPageHandler(3)}>3</Button>
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
        </div>
    )
}

/*
Итог: раньше мы писали в санке запрос на сервер когда ответ пришел ложили его в стейт стеит менялся измененный стеит доставали на UI и происходил перерендеринг
ТЕПЕРЬ: написали 3 строки нам сгенерировался хук и просто в компоненте его дернули - помимо data тут будет и крутилка и ошибка и тд
 */
