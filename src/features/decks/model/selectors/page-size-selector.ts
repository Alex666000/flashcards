import { RootState } from '@/app/providers'

export const pageSizeSelector = (state: RootState): number => state.decks.pagination.pageSize
