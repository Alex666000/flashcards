import { LoginArgs, LoginResponse, SignUpArgs, UserResponse } from '@/features/auth/api/auth.types'
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
    logout: builder.mutation<void, void>({
      query: () => {
        return {
          method: 'POST',
          url: '/v1/auth/logout',
        }
      },
    }),
    me: builder.query<UserResponse, void>({
      extraOptions: {
        maxRetries: 0, //  максимальное количество попыток повторных запросов в случае возникновения ошибки
      },
      providesTags: ['me'],
      query: () => {
        return {
          method: 'GET',
          params: {}, // не передаём
          url: `v1/auth/me`,
        }
      },
    }),
    signUp: builder.mutation<UserResponse, SignUpArgs>({
      query: (body) => ({
        body,
        method: 'POST',
        url: `v1/auth/sign-up`,
      }),
    }),
  }),
})

export const { useLoginMutation, useLogoutMutation, useMeQuery, useSignUpMutation, util } = authAPI
