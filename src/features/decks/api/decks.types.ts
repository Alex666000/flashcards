export type Author = {
  id: string
  name: string
}

export type DeckResponseData = {
  author: Author
  cardsCount: number
  cover: null | string
  created: string
  id: string
  isBlocked?: boolean | null
  isDeleted?: boolean | null
  isPrivate: boolean
  name: string
  rating: number
  shots: number
  updated: string
  userId: string
}

export type PaginationData = {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}

export type DecksResponseData = {
  items: DeckResponseData[]
  maxCardsCount: number
  pagination: PaginationData
}

export type DecksSearchParams = {
  authorId?: string
  currentPage?: number
  itemsPerPage?: number
  maxCardsCount?: number
  minCardsCount?: number
  name?: string
  orderBy?: string
} | void

export type ErrorMessage = {
  field: string
  message: string
}

export type ErrorResponseData = {
  errorMessages: ErrorMessage[]
}

export type ErrorResponse = {
  data: ErrorResponseData
}
