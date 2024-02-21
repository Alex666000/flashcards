export type Author = {
  id: string
  name: string
}

export type Deck = {
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

export type Pagination = {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}

export type DecksResponse = {
  items: Deck[]
  maxCardsCount: number
  pagination: Pagination
}

export type DecksParams = {
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
