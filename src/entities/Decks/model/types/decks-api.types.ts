export type GetDecksResponse = {
    items: GetDecksResponseItems[]
    maxCardsCount: number
    pagination: GetDecksResponsePagination
}
export interface GetDeckById {
    cardsCount: number
    cover?: any
    created: string
    id: string
    isBlocked?: any
    isDeleted?: any
    isPrivate: boolean
    name: string
    shots: number
    updated: string
    userId: string
}

export type GetDecksResponsePagination = {
    currentPage: number
    itemsPerPage: number
    totalItems: number
    totalPages: number
}
export interface CreateDeckResponse {
    author: CreateDeckAuthor
    cardsCount: number
    cover?: any
    created: string
    id: string
    isBlocked?: boolean
    isDeleted?: boolean
    isPrivate: boolean
    name: string
    shots: number
    updated: string
    userId: string
}
export interface CreateDeckAuthor {
    id: string
    name: string
}

export type GetDecksResponseItemsAuthor = {
    id: string
    name: string
}

export type GetDecksResponseItems = {
    author: GetDecksResponseItemsAuthor
    cardsCount: number
    cover?: null | string
    created: string
    id: string
    isBlocked?: boolean | null
    isDeleted?: boolean | null
    isPrivate: boolean
    name: string
    shots: number
    updated: string
    userId: string
}

// types for parameters
export type GetDecksArgs = {
    authorId: string
    currentPage: number
    itemsPerPage: number
    maxCardsCount: number
    minCardsCount: number
    name: string
    orderBy: string
}

export type CreateDeckArgs = {
    cover?: string
    isPrivate?: null | string
    name: null | string
}
