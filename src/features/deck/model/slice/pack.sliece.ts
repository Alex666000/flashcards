import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState = {
  pagination: {
    currentPage: 1,
    pageSize: 5,
  },
  searchName: '',
}

const slice = createSlice({
  initialState,
  name: 'pack',
  reducers: {
    setCurrentPage: (state, action: PayloadAction<{ newPage: number }>) => {
      state.pagination.currentPage = action.payload.newPage
    },
    setPageSize: (state, action: PayloadAction<{ newPageSize: number }>) => {
      state.pagination.pageSize = action.payload.newPageSize
    },
    setSearchName: (state, action: PayloadAction<{ newSearchName: string }>) => {
      state.searchName = action.payload.newSearchName
    },
  },
})

export const deckReducer = slice.reducer

export const deckActions = slice.actions
