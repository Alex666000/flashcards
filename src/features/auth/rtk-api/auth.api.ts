import {
  LoginBodyArgs,
  LoginDataResponse,
  RecoverPasswordBodyArgs,
  SignUpArgs,
  UpdateProfileFormData,
  UserAuthDataResponse,
} from '@/features/auth/api/auth.types'
import { flashCardsAPI } from '@/shared/api/flash-cards.api'

export const authAPI = flashCardsAPI.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginDataResponse, LoginBodyArgs>({
      invalidatesTags: ['me'],
      query: (bodyData) => ({
        body: bodyData,
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
    me: builder.query<UserAuthDataResponse, void>({
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
    // Востановление пароля - когда его забыл:
    recoverPassword: builder.mutation<void, RecoverPasswordBodyArgs>({
      query: (body) => ({
        body,
        method: 'POST',
        url: 'v1/auth/recover-password',
      }),
    }),
    signUp: builder.mutation<UserAuthDataResponse, SignUpArgs>({
      query: (body) => ({
        body,
        method: 'POST',
        url: `v1/auth/sign-up`,
      }),
    }),
    updateProfile: builder.mutation<UserAuthDataResponse, UpdateProfileFormData>({
      invalidatesTags: ['me'],
      query: (body) => ({
        body,
        method: 'PATCH',
        url: `v1/auth/me`,
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
  useRecoverPasswordMutation,
  useSignUpMutation,
  useUpdateProfileMutation,
  util,
} = authAPI