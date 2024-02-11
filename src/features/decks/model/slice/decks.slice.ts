import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState = {
  // Фильтр поиска:
  filter: {
    searchName: '', // поисковое значение в инпуте
    sliderValue: [0, 30], // значение стайдера
    tabValue: '', // значение табов
  },
  // Пагинация:
  pagination: {
    currentPage: 1,
    pageSize: 5,
  },
}

const decksSlice = createSlice({
  initialState,
  name: 'decks',
  reducers: {
    setCurrentPage: (state, action: PayloadAction<{ newPage: number }>) => {
      state.pagination.currentPage = action.payload.newPage
    },
    setPageSize: (state, action: PayloadAction<{ newPageSize: number }>) => {
      state.pagination.pageSize = action.payload.newPageSize
    },
    setSearchName: (state, action: PayloadAction<{ newSearchName: string }>) => {
      state.filter.searchName = action.payload.newSearchName
    },
    setSliderValue: (state, action: PayloadAction<{ newSliderValue: number[] }>) => {
      state.filter.sliderValue = action.payload.newSliderValue
    },
    setTabValue: (state, action: PayloadAction<{ newTabValue: string }>) => {
      state.filter.tabValue = action.payload.newTabValue
    },
  },
})

export const decksReducer = decksSlice.reducer

export const decksActions = decksSlice.actions
