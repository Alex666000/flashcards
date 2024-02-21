import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReAuth } from './flash-cards-with-reauth'

export const flashCardsAPI = createApi({
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
  reducerPath: 'flashCardsAPI',
  tagTypes: ['decks', 'me', 'cards', 'deck'],
})
