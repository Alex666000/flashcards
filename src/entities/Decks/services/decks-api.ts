import {
    CreateDeckArgs,
    GetDecksArgs,
    GetDecksResponse,
} from '@/entities/Decks/model/types/decks-api.types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const decksApi = createApi({
    // навороченный fetch свой - как аксиос, объект это как инстанс аксиоса
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.flashcards.andrii.es', // к базовому урлу будем прикреплять наши эндпоинты
        credentials: 'include', // то же самое что и withCredentionalse = true
        prepareHeaders: (headers) => {
            // чтобы сеичас не ломалась авторизация
            headers.append('x-auth-skip', 'true')
        },
    }),
    // пишем эндпоинты = запросы
    endpoints: (builder) => {
        return {
            createDeck: builder.mutation<any, CreateDeckArgs>({
                query: (arg) => {
                    return {
                        body: arg,
                        method: 'POST',
                        url: `v1/decks`,
                    }
                },
            }),
            getDeckById: builder.query<any, string>({
                query: (id) => `v1/decks/${id}`,
            }),
            // либо квери запросы либо мутации: принимает возвращаемое значение сервером или аргумент
            getDecks: builder.query<GetDecksResponse, Partial<GetDecksArgs> | void>({
                query: (arg) => {
                    return {
                        method: 'GET',
                        params: arg ?? {}, // если null или undefined то выведет {}
                        url: `v1/decks`,
                    }
                },
            }),
        }
    },
    reducerPath: 'decksApi', // имя редюсера которое будем ложить в store
})

// Делаем запрос за данными: формируется хук
export const {
    useCreateDeckMutation,
    useGetDeckByIdQuery,
    useGetDecksQuery,
    useLazyGetDecksQuery,
} = decksApi

/*
слайс 1 раз пишется и больше не трогается
 */
