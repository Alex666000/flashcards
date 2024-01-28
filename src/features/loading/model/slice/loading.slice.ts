import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit'

const initialState = {
    // храним состояние редакса для LeanerProgress
    queryInProgress: false,
}

const slice = createSlice({
    extraReducers: (builder) => {
        builder
            .addMatcher(isPending, (state) => {
                state.queryInProgress = true
            })
            .addMatcher(isRejected, (state) => {
                state.queryInProgress = false
            })
            .addMatcher(isFulfilled, (state) => {
                state.queryInProgress = false
            })
    },
    initialState,
    name: 'loading',
    reducers: {},
})

export const loadingReducer = slice.reducer

export const loadingActions = slice.actions
