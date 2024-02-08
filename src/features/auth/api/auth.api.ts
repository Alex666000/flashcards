import { LoginArgs, LoginResponse } from '@/features/auth/api/types'
import { baseAPI } from '@/shared/api/base-a-p-i'

const authAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    // getMe: builder.query<UserResponse, void>({
    //   extraOptions: {
    //     maxRetries: 0, //  максимальное количество попыток повторных запросов в случае возникновения ошибки
    //   },
    //   providesTags: ['Me'],
    //   query: () => {
    //     return {
    //       method: 'GET',
    //       params: {}, // не передаём
    //       url: `v1/auth/me`,
    //     }
    //   },
    // }),
    login: builder.mutation<LoginResponse, LoginArgs>({
      invalidatesTags: ['Me'],
      query: (data) => ({
        body: data,
        method: 'POST',
        url: '/v1/auth/login',
      }),
    }),
  }),
})

export const { useLoginMutation, util } = authAPI
