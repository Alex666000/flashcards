import { toast } from 'react-toastify'

import { createAction, createSlice } from '@reduxjs/toolkit'

export type StatusType = 'failed' | 'idle' | 'loading' | 'succeeded'

type AppInitialStateType = {
  orderBy: string
  question: string
  status: StatusType
}

const initialState: AppInitialStateType = {
  orderBy: '',
  question: '',
  status: 'idle',
}

export const addQuestionAC = createAction<string>('app/addQuestion')
export const addOrderByAC = createAction<string>('app/addOrderByAC')

export const appSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(addQuestionAC, (state, action) => {
        state.question = action.payload
      })
      .addCase(addOrderByAC, (state, action) => {
        state.orderBy = action.payload
      })
      .addMatcher(
        (action) => {
          return action.type.endsWith('/pending')
        },
        (state) => {
          state.status = 'loading'
        }
      )
      .addMatcher(
        (action) =>
          action.type.endsWith('executeMutation/rejected') ||
          action.type.endsWith('flashCardsAPI/executeQuery/rejected'),
        (state, action: any) => {
          if (action.type.endsWith('executeMutation/rejected')) {
            if (action.payload?.data) {
              if (action.payload?.data?.message) {
                toast.error(action?.payload?.data?.message, { containerId: 'common' })
                state.status = 'failed'

                return
              }
              toast.error(
                action.payload?.data?.errorMessages[0].message ||
                  action.payload.data?.errorMessages[0] ||
                  action.payload.data?.message,
                { containerId: 'common' }
              )
              state.status = 'failed'
            } else {
              toast.error(`🦕${action.payload.error}`, { containerId: 'common' })
              state.status = 'failed'

              return
            }
          } else if (action?.type.endsWith('flashCardsAPI/executeQuery/rejected')) {
            if (action?.payload?.data) {
              if (action?.payload?.data?.statusCode === 401) {
                state.status = 'failed'

                return
              }
              if (action?.payload?.data?.path?.endsWith('me?')) {
                state.status = 'failed'

                return
              }
              if (action?.payload?.data?.message) {
                toast.error(action?.payload?.data?.message, { containerId: 'common' })
                state.status = 'failed'

                return
              }
            } else {
              toast.error(`🦕${action?.payload?.error}`, { containerId: 'common' })
              state.status = 'failed'

              return
            }
          }
        }
      )
      .addMatcher(
        (action) => {
          return action.type.endsWith('/fulfilled')
        },
        (state) => {
          state.status = 'succeeded'
        }
      )
  },
  initialState,
  name: 'app',
  reducers: {},
})

export const { actions: appActions, reducer: appReducer } = appSlice

/*
- Селектор достает из инишл стейта значение - особенно при его изменении на новое чтобы в UI
отрисовать актуальные данные: стейт - подстейт (редюсер) - инишлстейт - свойство + его значение
 */
