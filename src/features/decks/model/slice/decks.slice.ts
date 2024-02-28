import { PayloadAction, createSlice } from '@reduxjs/toolkit'

// types
type InitialStateType = typeof initialState

type PaginationType = {
  currentPage: number
  pageSize: number
}
export type CardsCountType = {
  max: number | undefined
  min: number
}

type SearchParamsType = {
  authorId: string | undefined
  cardsCount: CardsCountType
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
    authorId: undefined as string | undefined,
    cardsCount: {
      max: undefined,
      min: 0,
    } as CardsCountType,
    searchName: '', // поисковое значение в инпуте
    sliderValue: [0, 65], // значения стайдера
    sortOptions: { direction: 'desc', key: 'updated' }, // сортировка
    tabValue: '', // значения табов
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
    setAuthorId: (state, action: PayloadAction<{ newUserTabValue: string | undefined }>) => {
      state.searchParams.authorId = action.payload.newUserTabValue
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
    setSortedString: (state, action: PayloadAction<{ sortOptions: Sort }>) => {
      state.searchParams.sortOptions = action.payload.sortOptions
    },
    setTabsValue: (state, action: PayloadAction<{ newUserTabValue: string }>) => {
      state.searchParams.tabValue = action.payload.newUserTabValue
    },
  },
})

export const decksReducer = decksSlice.reducer

export const decksActions = decksSlice.actions
