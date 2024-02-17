import {
  CardRateRequest,
  CardResponse,
  CardsParams,
  CardsResponse,
  RandomCardRequest,
} from '@/features/cards/rtk-api/types'
import { flashCardsAPI } from '@/shared/api/flash-cards.api'
import { errorNotification } from '@/shared/lib/utils/error-notification'

const cardsAPI = flashCardsAPI.injectEndpoints({
  endpoints: (builder) => ({
    createCard: builder.mutation<CardResponse, { data: FormData; deckId: string }>({
      invalidatesTags: ['cards'],
      query: ({ data, deckId }) => ({
        body: data,
        method: 'POST',
        url: `v1/decks/${deckId}/cards`,
      }),
    }),
    deleteCard: builder.mutation<void, { id: string }>({
      invalidatesTags: ['cards'],
      query: ({ id }) => ({
        body: { id },
        method: 'DELETE',
        url: `v1/cards/${id}`,
      }),
    }),
    getCards: builder.query<CardsResponse, { id: string; params: CardsParams }>({
      providesTags: ['cards'],
      query: ({ id, params }) => ({
        method: 'GET',
        params: params ?? {},
        url: `v1/decks/${id}/cards`,
      }),
    }),
    getRandomCard: builder.query<CardResponse, RandomCardRequest>({
      query: ({ id, previousCardId }) => ({
        method: 'GET',
        params: { previousCardId },
        url: `v1/decks/${id}/learn`,
      }),
    }),
    rateCard: builder.mutation<CardResponse, CardRateRequest>({
      invalidatesTags: ['cards'],
      async onQueryStarted({ packId }, { dispatch, queryFulfilled }) {
        try {
          const { data: newCard } = await queryFulfilled

          dispatch(
            cardsAPI.util.updateQueryData('getRandomCard', { id: packId }, () => {
              return newCard
            })
          )
        } catch (error) {
          errorNotification(error)
        }
      },
      query: ({ packId, ...rest }) => ({
        body: rest,
        method: 'POST',
        url: `v1/decks/${packId}/learn`,
      }),
    }),
    updateCard: builder.mutation<CardResponse, { cardId: string; data: FormData }>({
      invalidatesTags: ['cards'],
      query: ({ cardId, data }) => ({
        body: data,
        method: 'PATCH',
        url: `v1/cards/${cardId}`,
      }),
    }),
  }),
})

export const {
  useCreateCardMutation,
  useDeleteCardMutation,
  useGetCardsQuery,
  useGetRandomCardQuery,
  useRateCardMutation,
  useUpdateCardMutation,
} = cardsAPI
