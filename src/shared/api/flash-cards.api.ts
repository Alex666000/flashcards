import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const flashCardsAPI = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.flashcards.andrii.es', // берется в доке - Базовый URL - к базовому урлу будем прикреплять наши эндпоинты
    credentials: 'include', // то же самое что и withCredentials = true в аксиосе - тк будут токены авторизационные в куках у нас в проекте..
    prepareHeaders: () => {},
  }),
  // CRUD
  endpoints: () => ({}),

  reducerPath: 'flashCardsAPI', // имя редюсера которое будем ложить в store - его имя увидим в девтулзах
  // при смене фокуса чтобы данные обновлялись запрашивались
  refetchOnFocus: true,
  // 1 -- tagTypes: ['Deck'] --> тут в baseApi резервируем тэги - объявляем в base-rtk-api, а не конкретной апишке сущности, ни в decks-rtk-api:
  tagTypes: ['me', 'decks', 'deck-form', 'cards'], // чтобы подгружать новые обновленные данные, а не в ручную обновлять страницу
})
