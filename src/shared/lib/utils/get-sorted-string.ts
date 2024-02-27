import { Sort } from '@/shared/lib'

export const getSortedString = (sortOptions: Sort | undefined) => {
  if (sortOptions) {
    return `${sortOptions.key}-${sortOptions.direction}`
  }
}
