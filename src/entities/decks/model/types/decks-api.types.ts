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

// types передаваемых квери параметров (https://api.flashcards.andrii.es/v1/decks?orderBy=name-desc&currentPage=2)
// Квери параметры: ?orderBy=name-desc&currentPage=2 -- после знака ? пара ключ=значение&ключ=значение и тд.
export type GetDecksArgs = {
    authorId: string // переключаться между моими карточками и всеми
    currentPage: number // текущая страница - тк возвращаются пагинированные запросы - по дефолту приходит 1 стр.на ней 10 элементов на странице
    itemsPerPage: number
    maxCardsCount: number //  например хотим найти все колоды у которых больше 5 карточек, например от 5-10 то передаем: minCardsCount = 5, maxCardsCount=10
    minCardsCount: number //  например хотим найти все колоды у которых меньше 5 карточек
    name: string // поиск среди колод нужную
    orderBy: string // порядок сортировки
}

export type CreateDeckArgs = {
    cover?: string
    isPrivate?: null | string
    name: null | string
}

export type GetDeckByIdArgs = {
    id: string
}
