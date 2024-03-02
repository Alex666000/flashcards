import { toast } from 'react-toastify'

import { flashCardsAPI } from '@/app/api/flash-cards.api'
import { RootState } from '@/app/providers/store/store'
import {
  DeckResponseData,
  DecksResponseData,
  DecksSearchParams,
} from '@/features/decks/api/decks.types'

import { updateDecksQueryData } from '../model/utils/updateDeckQueryData'

const decksAPI = flashCardsAPI.injectEndpoints({
  endpoints: (builder) => ({
    createDeck: builder.mutation<DeckResponseData, FormData>({
      invalidatesTags: ['decks'],
      query: (data) => ({
        body: data,
        method: 'POST',
        url: `v1/decks`,
      }),
    }),
    deleteDeck: builder.mutation<DeckResponseData, { id: string }>({
      invalidatesTags: ['decks'],
      query: ({ id }) => ({
        body: { id },
        method: 'DELETE',
        url: `v1/decks/${id}`,
      }),
    }),
    getDeck: builder.query<Omit<DeckResponseData, 'author'>, { id: string }>({
      providesTags: ['deck'],
      query: ({ id }) => ({
        method: 'GET',
        url: `v1/decks/${id}`,
      }),
    }),
    getDecks: builder.query<DecksResponseData, DecksSearchParams>({
      providesTags: ['decks'],
      query: (params) => ({
        method: 'GET',
        params: params ?? {},
        url: `v2/decks`,
      }),
    }),
    updateDeck: builder.mutation<DeckResponseData, { data: FormData; id: string }>({
      invalidatesTags: ['decks', 'deck'],
      query: ({ data, id }) => ({
        body: data,
        method: 'PATCH',
        url: `v1/decks/${id}`,
      }),
    }),
  }),
})

export const {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDeckQuery,
  useGetDecksQuery,
  useUpdateDeckMutation,
} = decksAPI
