import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit'

const initialState = {
  // храним состояние редакса для LeanerProgress: для всего проекта
  queryInProgress: false,
}

const loginSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state) => {
        state.queryInProgress = true // видим "Линеар-прогресс"
      })
      .addMatcher(isFulfilled, (state) => {
        state.queryInProgress = false
      })
      .addMatcher(isRejected, (state) => {
        state.queryInProgress = false
      })
  },
  initialState,
  name: 'loading',
  reducers: {},
})

export const loadingReducer = loginSlice.reducer

export const loadingActions = loginSlice.actions

/*
- Код в extraReducers с addMatcher() покроет все крутилки в проекте! Поэтому loading - feature
- addMatcher() - пишем всегда в extraReducers вместо addCase(), отрабатывает всегда
- addMatcher() - 1 параметр - или функция предикат, где будем писать условие возвращающее булево
значение true или false или само булево.. 2 параметр изменяет стейт, если в первом параметре
вернется true, то попаду во второй параметр функцию и смогу выполнить эту логику
addMatcher - вызываетя всегда вне зависимости от редюсера в котором он написан
- Если наш action.type заканчивается на 'pending' тогда измени в стейте статус на pending, покажи
лоадер или линеар-прогресс..
- isPending isFulfilled isRejected -- это Matching Utilities - пишем коротко но под капотом это функции
1 параметр в addMatcher()
isPending -- только для крутилок, isFulfilled -
 */
