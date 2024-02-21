// в импорте именно react писать !!!!!
import {
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://api.flashcards.andrii.es',
  credentials: 'include',
})

// блокировка запросов
const mutex = new Mutex()

export const baseQueryWithReAuth: BaseQueryFn<
  FetchArgs | string,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      // для запроса рефреш токена
      const refreshResult = await baseQuery(
        {
          method: 'POST',
          url: `v1/auth/refresh-token`,
        },
        api,
        extraOptions
      )

      if (refreshResult?.meta?.response?.status === 204) {
        result = await baseQuery(args, api, extraOptions)
      }
      release()
    } else {
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}
