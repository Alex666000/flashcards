import { toast } from 'react-toastify'

import { Sort } from '@/shared/lib'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
// если с сервера что-то вернулось то это делать с РТК квери а что-то глобальное
// остальное храним в стейте Редакса

const initialState = {
  // Фильтры поиска - квери параметры:
  filter: {
    searchName: '', // поисковое значение в инпуте
    sliderValue: [0, 65], // значения стайдера
    tabValue: '',
  },
  isMaxCardsCountInit: true, // тоже самое что и pageSize
  // Пагинация:
  pagination: {
    currentPage: 1,
    pageSize: 7,
  },
  sort: { direction: 'desc', key: 'updated' } as Sort | undefined,
}

const decksSlice = createSlice({
  initialState,
  name: 'decks',
  reducers: {
    clearFilters: (state) => {
      state.filter.searchName = ''
      state.filter.sliderValue = [0, 65]
      state.filter.tabValue = ''
      state.pagination.currentPage = 1
      state.pagination.pageSize = 7
      toast.info('Filters are reset', { containerId: 'common' })
    },
    setCurrentPage: (state, action: PayloadAction<{ page: number }>) => {
      state.pagination.currentPage = action.payload.page
    },
    setPageSize: (state, action: PayloadAction<{ pageSize: number }>) => {
      state.pagination.pageSize = action.payload.pageSize
    },
    setSearchName: (state, action: PayloadAction<{ search: string }>) => {
      state.filter.searchName = action.payload.search
    },
    setSliderValue: (state, action: PayloadAction<{ sliderValue: number[] }>) => {
      state.filter.sliderValue = action.payload.sliderValue
    },
    setSortOptions: (state, action: PayloadAction<{ sort: Sort | undefined }>) => {
      state.sort = action.payload.sort
    },
    setTabValue: (state, action: PayloadAction<{ tabValue: string }>) => {
      state.filter.tabValue = action.payload.tabValue
    },
  },
})

export const decksReducer = decksSlice.reducer

export const decksActions = decksSlice.actions
