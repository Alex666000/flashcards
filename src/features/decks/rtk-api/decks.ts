import { Deck, DecksParams, DecksResponse } from '@/features/decks/rtk-api/types'
import { flashCardsAPI } from '@/shared/api/flash-cards.api'

const decksAPI = flashCardsAPI.injectEndpoints({
  endpoints: (builder) => ({
    createDeck: builder.mutation<Deck, FormData>({
      invalidatesTags: ['decks'],
      query: (data) => ({
        body: data,
        method: 'POST',
        url: `v1/decks`,
      }),
    }),
    deleteDeck: builder.mutation<Deck, { id: string }>({
      invalidatesTags: ['decks'],
      query: ({ id }) => ({
        body: { id },
        method: 'DELETE',
        url: `v1/decks/${id}`,
      }),
    }),
    getDeck: builder.query<Omit<Deck, 'author'>, { id: string }>({
      providesTags: ['deck'],
      query: ({ id }) => ({
        method: 'GET',
        url: `v1/decks/${id}`,
      }),
    }),
    getDecks: builder.query<DecksResponse, DecksParams>({
      providesTags: ['decks'],
      query: (params) => ({
        method: 'GET',
        params: params ?? {},
        url: `v2/decks`,
      }),
    }),
    updateDeck: builder.mutation<Deck, { data: FormData; id: string }>({
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
