import { Pagination } from '@/features/decks/api/types'

export type Card = {
  answer: string
  answerImg: null | string
  answerVideo: null | string
  created: string
  deckId: string
  grade: number
  id: string
  question: string
  questionImg: null | string
  questionVideo: null | string
  shots: number
  updated: string
  userId: string
}

export type CardsResponse = {
  items: Card[]
  pagination: Pagination
}

export type CardsParams = {
  answer?: string
  currentPage?: number
  itemsPerPage?: number
  orderBy?: string
  question?: string
} | void

export type CardResponse = Omit<Card, 'userId'>

export type RandomCardRequest = {
  id: string
  previousCardId?: string
}

export type CardRateRequest = {
  cardId: string
  grade: number
  packId: string
}
