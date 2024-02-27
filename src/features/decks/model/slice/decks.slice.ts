import { PayloadAction, createSlice } from '@reduxjs/toolkit'

// types
type InitialStateType = typeof initialState

export type CardsCountType = {
  maxCardsCount: number | undefined
  minCardsCount: number
}

type PaginationType = {
  currentPage: number
  pageSize: number
}

type SearchParamsType = {
  authorId: string | undefined
  cardsCount: CardsCountType
  currentPage: number
  itemsPerPage: number
  searchName: string
  sliderValue: number[]
  sortOptions: Sort
  tabValue: string
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
    pageSize: 7,
  } as PaginationType,
  // Фильтры поиска - квери параметры:
  searchParams: {
    authorId: '',
    cardsCount: {
      maxCardsCount: undefined,
      minCardsCount: 0,
    } as CardsCountType,
    itemsPerPage: 0,
    searchName: '', // поисковое значение в инпуте ++++
    sliderValue: [0, 100], // значения стайдера ++++
    sortOptions: { direction: 'desc', key: 'updated' },
    tabValue: '', // значения табов ++++
  } as SearchParamsType,
}

// slice
const decksSlice = createSlice({
  initialState,
  name: 'decks',
  reducers: {
    // Подъредюсеры - или AC:
    clearFilterParams: (state) => {
      state.searchParams.searchName = ''
      state.searchParams.tabValue = ''
      state.searchParams.authorId = undefined
      state.searchParams.sortOptions = null
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
    setSort: (state, action: PayloadAction<{ sortOptions: Sort }>) => {
      state.searchParams.sortOptions = action.payload.sortOptions
    },
    setTabsValue: (state, action: PayloadAction<{ newUserTabValue: string }>) => {
      state.searchParams.tabValue = action.payload.newUserTabValue
    },
  },
})

export const decksReducer = decksSlice.reducer

export const decksActions = decksSlice.actions
