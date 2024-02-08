import { useMemo } from 'react'

const DOTS = '...'

type UsePaginationArgs = {
  currentPage: number
  pageSize: number
  // количество "соседних" страниц, которые отображаются в пагинации вокруг текущей страницы
  siblingCount?: number
  totalCount: number // Общее количество элементов
}

/**
 * usePagination - используется для генерации массива,
 * представляющего диапазон страниц для отображения в пагинации
 */
export const usePagination = ({
  currentPage,
  pageSize,
  siblingCount = 1,
  totalCount,
}: UsePaginationArgs) => {
  return useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize) // Если общее количество страниц

    const totalPageNumbers = siblingCount + 5

    // case 1 - Если общее количество страниц (totalPageCount) меньше или равно сумме siblingCount + 5,
    // возвращается массив, представляющий все страницы от 1 до totalPageCount.
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount)
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount)

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

    const firstPageIndex = 1
    const lastPageIndex = totalPageCount

    // case 2 - Если общее количество страниц больше, но все страницы вместе с siblingCount и 5
    // не умещаются в массив, то возвращается массив, представляющий первые leftItemCount страниц,
    // затем DOTS и последнюю страницу.
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount
      const leftRange = range(1, leftItemCount)

      return [...leftRange, DOTS, totalPageCount]
    }

    // case 3 - Если первая страница и не все страницы вместе с siblingCount и 5 не умещаются
    // в массив, то возвращается массив, представляющий первую страницу, DOTS и последние
    // rightItemCount страниц
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount
      const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount)

      return [firstPageIndex, DOTS, ...rightRange]
    }

    // case 4 - В противном случае возвращается массив, представляющий первую страницу, DOTS,
    // средний диапазон страниц между leftSiblingIndex и rightSiblingIndex, DOTS и последнюю страницу.
    else {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex)

      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
    }
  }, [totalCount, pageSize, siblingCount, currentPage])
}

function range(start: number, end: number) {
  const length = end - start + 1

  return Array.from({ length }, (_, idx) => idx + start)
}
