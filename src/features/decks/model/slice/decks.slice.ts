import { PayloadAction, createSlice } from '@reduxjs/toolkit'

// types
export type CardsCountType = {
  maxCardsCount: number | undefined
  minCardsCount: number
}

export type Sort = {
  // сортировка - храним тут чтобы при переходе м/у страницами не сбрасывались значения
  direction: 'asc' | 'desc'
  key: string
} | null

// initialState
const initialState = {
  // Пагинация:
  pagination: {
    currentPage: 1,
    pageSize: 10,
  },
  // Фильтры поиска - квери параметры:
  searchParams: {
    authorId: '' as string | undefined,
    cardsCount: {
      maxCardsCount: undefined,
      minCardsCount: 0,
    } as CardsCountType,
    currentPage: 1,
    itemsPerPage: 0,
    searchName: ' ', // поисковое значение в инпуте ++++
    sliderValue: [0, 100] as number[], // значения стайдера ++++
    sort: { direction: 'desc', key: 'updated' } as Sort,
    tabValue: 'all', // значения табов ++++
  },
}

// slice
const decksSlice = createSlice({
  initialState,
  name: 'decks',
  reducers: {
    // Подъредюсеры - или AC:
    clearFilterParams: (state) => {
      state.searchParams.searchName = ''
      state.searchParams.tabValue = 'all'
      state.searchParams.authorId = undefined
      state.searchParams.sort = null
    },
    resetOnDefaultCurrentPage: (state) => {
      state.pagination.currentPage = 1
    },
    setAuthorId: (state, action: PayloadAction<{ authorId: string | undefined }>) => {
      state.searchParams.authorId = action.payload.authorId
    },
    setCardsCount: (state, action: PayloadAction<{ cardsCount: CardsCountType }>) => {
      state.searchParams.cardsCount = action.payload.cardsCount
    },
    setCurrentPage: (state, action: PayloadAction<{ newPage: number }>) => {
      state.pagination.currentPage = action.payload.newPage
    },
    setPageSize: (state, action: PayloadAction<{ newPageSize: number }>) => {
      state.pagination.pageSize = action.payload.newPageSize
    },
    setSearchName: (state, action: PayloadAction<{ newSearchName: string }>) => {
      state.searchParams.searchName = action.payload.newSearchName
    },
    setSliderValue: (state, action: PayloadAction<{ newSliderValue: number[] }>) => {
      state.searchParams.sliderValue = action.payload.newSliderValue
    },
    setSort: (state, action: PayloadAction<{ sort: Sort }>) => {
      state.searchParams.sort = action.payload.sort
    },
    setTabValue: (state, action: PayloadAction<{ newTabValue: string }>) => {
      state.searchParams.tabValue = action.payload.newTabValue
    },
  },
})

export const decksReducer = decksSlice.reducer

export const decksActions = decksSlice.actions
