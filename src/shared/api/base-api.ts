import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
    // навороченный fetch свой - как аксиос, объект это как инстанс аксиоса
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.flashcards.andrii.es', // к базовому урлу будем прикреплять наши эндпоинты
        credentials: 'include', // то же самое что и withCredentionalse = true
        prepareHeaders: (headers) => {
            // чтобы сеичас не ломалась авторизация
            headers.append('x-auth-skip', 'true')
        },
    }),
    endpoints: () => ({}),
    reducerPath: 'decksApi', // имя редюсера которое будем ложить в store
    tagTypes: ['Deck'],
})

/*
слайс 1 раз пишется и больше не трогается
 */
