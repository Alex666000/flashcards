import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit'

const initialState = {
  isQueryInProgress: false,
}

const loginSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state) => {
        state.isQueryInProgress = true
      })
      .addMatcher(isFulfilled, (state) => {
        state.isQueryInProgress = false
      })
      .addMatcher(isRejected, (state) => {
        state.isQueryInProgress = false
      })
  },
  initialState,
  name: 'loading',
  reducers: {},
})

export const loadingReducer = loginSlice.reducer

export const loadingActions = loginSlice.actions
