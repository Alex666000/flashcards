import { toast } from 'react-toastify'

import { flashCardsAPI } from '@/app/api/flash-cards.api'
import { RootState } from '@/app/providers/store/store'
import { updateDecksQueryData } from '@/features/decks/model/utils/updateDeckQueryData'
import { Deck, DecksResponseData, DecksSearchParams } from '@/features/decks/rtk-api/types'

const decksAPI = flashCardsAPI.injectEndpoints({
  endpoints: (builder) => ({
    createDeck: builder.mutation<Deck, FormData>({
      invalidatesTags: ['decks'],
      // onQueryStarted - это "Пессимистичный апдейт (песимисты - предпологаем что с сервера ничего
      // не придет)"" - тк дожидаемся ответа с сервера: const response = await queryFulfilled
      // Есть противоположный "Оптимистичный апдеит - в ту же секунду когда юзер ввел данные обновляем"
      // UI не дожидаясь ответа от сервака
      // Оптмимстик и пессимистик: делаются через onQueryStarted но оба чуть по разному
      async onQueryStarted(_, { dispatch, getState, queryFulfilled }) {
        const state = getState() as RootState
        const response = await queryFulfilled // запрос на сервер createDeck пошел

        // диспатчим: 1: название квери которое хотим обновить 'getDecks', 2: аргументы-ключ нашего
        // квери - у каждого запроса есь свой уникальный ключ (key видим в network), этот ключ
        // должны передать - 3: аргумент "функция которая будет обновлять нашу запись" - она берет
        // запись эндпоинта 'getDecks', находим запись с аргументами что достали из стейта
        // и обновляет ее новыми данными, к нам приходит draft - добавили в стейт новую колоду
        dispatch(
          decksAPI.util.updateQueryData('getDecks', updateDecksQueryData(state), (draft) => {
            draft.items.unshift(response.data)
          })
        )
      },
      query: (data) => ({
        body: data,
        method: 'POST',
        url: `v1/decks`,
      }),
    }),
    deleteDeck: builder.mutation<Deck, { id: string }>({
      invalidatesTags: ['decks'],
      // Оптимистичный апдейт: сначала обновляем данные а потом делаем запрос
      // должны знать какая id что обновлять и на основе id будем фильтровать результат
      async onQueryStarted({ id }, { dispatch, getState, queryFulfilled }) {
        const state = getState() as RootState

        const patchResult = dispatch(
          decksAPI.util.updateQueryData('getDecks', updateDecksQueryData(state), (draft) => {
            const index = draft?.items?.findIndex((deck) => deck.id === id)

            if (index !== -1) {
              draft?.items?.splice(index, 1)
            }
          })
        )

        // для обнуления изменении в случае неудачи
        try {
          await queryFulfilled
        } catch (e: any) {
          //в сучае ошибки отменяем оптимистичный апдеит на UI все вернется как было, обновится сначало
          // и если будет ошибка, например попробуем удалить чужую карточку то обновление проилдет карточка
          // удалится и потом снова вернется обратно тк не можем чужое удалять (рефетч сработал после ошибки)
          // 2 запроса в случае ошибки? delete get 1 запрос в случае успеха delete
          // покажем пользователю ошибку
          toast.error(e?.error?.data?.message, { containerId: 'common' })
          patchResult.undo()
        }
      },
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
    getDecks: builder.query<DecksResponseData, DecksSearchParams>({
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
