import { LoginArgs, LoginResponse, UserResponse } from '@/features/auth/api/types'
import { flashCardsAPI } from '@/shared/api/flash-cards.api'

export const authAPI = flashCardsAPI.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginArgs>({
      invalidatesTags: ['me'],
      query: (data) => ({
        body: data,
        method: 'POST',
        url: '/v1/auth/login',
      }),
    }),
    // me: builder.query<UserResponse, void>({
    //   extraOptions: {
    //     maxRetries: 0, //  максимальное количество попыток повторных запросов в случае возникновения ошибки
    //   },
    //   providesTags: ['me'],
    //   query: () => {
    //     return {
    //       method: 'GET',
    //       params: {}, // не передаём
    //       url: `v1/auth/me`,
    //     }
    //   },
    // }),
  }),
})

export const { useLoginMutation, util } = authAPI
