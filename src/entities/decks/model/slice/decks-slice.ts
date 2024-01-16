import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export const decksSlice = createSlice({
    initialState: {
        currentPage: 1,
        currentTab: 'all' as Tab,
        itemsPerPage: 10,
        maxCards: undefined as number | undefined,
        minCards: 0,
        setSearchByName: '',
    },
    name: 'decks',
    reducers: {
        resetCurrentPage: (state) => {
            state.currentPage = 1
        },
        resetFilters: (state) => {
            state.setSearchByName = ''
            state.currentTab = 'all'
            state.minCards = 0
            state.maxCards = undefined
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },
        setCurrentTab: (state, action: PayloadAction<Tab>) => {
            state.currentTab = action.payload
        },
        setItemsPerPage: (state, action: PayloadAction<number>) => {
            state.itemsPerPage = action.payload
        },
        setMaxCards: (state, action: PayloadAction<number>) => {
            state.maxCards = action.payload
        },
        setMinCards: (state, action: PayloadAction<number>) => {
            state.minCards = action.payload
        },
        setSearchByName: (state, action: PayloadAction<string>) => {
            state.setSearchByName = action.payload
        },
    },
})

export type Tab = 'all' | 'my'
