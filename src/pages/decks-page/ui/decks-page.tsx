import { memo, useEffect, useState } from 'react'

import { UserAuthDataResponse } from '@/features/auth/model/types/auth.types'
import { useMeQuery } from '@/features/auth/rtk-api/auth.api'
import { useGetDecksQuery } from '@/features/decks/api'
import { useDecksLocalStateFilter } from '@/features/decks/lib/hooks/use-decks-local-state-filter'
import { useDecksLocalStatePagination } from '@/features/decks/lib/hooks/use-decks-local-state-pagination'
import { CreateControlForNewDeck } from '@/features/decks/ui/create-control/create-control-for-new-deck'
import { DecksTable } from '@/features/decks/ui/decks-table/decks-table'
import { FilterControls } from '@/features/decks/ui/filter-controls/filter-controls'
import { useDebounce } from '@/shared/lib/hooks/use-debounce'
import { Sort } from '@/shared/lib/types/types'
import { getSortedString } from '@/shared/lib/utils/get-sorted-string'
import { Container } from '@/shared/ui/container'
import { Pagination } from '@/shared/ui/pagination'
import { Typography } from '@/shared/ui/typography'

import s from './decks.module.scss'

/**
 * Компонент - страница всех колод: decks - предоставляет полную функциональность для просмотра
 * списка колод - для применения фильтров к данным и навигации (пагинации) по страницам.
 */

const DecksPage = () => {
  // Состояния поисковых параметров (фильтров) и пагинации: храним в локальном сетите редакса
  const { currentPage, pageSize, setCurrentPage, setPageSize } = useDecksLocalStatePagination() // пагинация
  const { searchName, setSearchName, setSliderValue, setTabValue, sliderValue, tabValue } =
    useDecksLocalStateFilter() // фильтры поиска - параметры поиска

  // Сортировка:
  const [sort, setSort] = useState<Sort>({ direction: 'desc', key: 'updated' })
  const sortedString = sort ? `${sort.key}-${sort.direction}` : undefined // отсортированная строка

  // Дебаунс для полей инпута и слайдера - возвращает массив:
  const debouncedSearchName = useDebounce(searchName)
  const debouncedSliderValue = useDebounce(sliderValue)

  const { data: userData } = useMeQuery() // me() запрос

  // console.log({ data })
  const authUserId = (userData as UserAuthDataResponse).id

  // Запрос на сервер за колодами с такими поисковыми параметрами которые взяли из локального стейта редакса:
  const decks = useGetDecksQuery({
    // authorId берет значение у userId
    authorId: tabValue, // отправляем на сервак значение выбранного на UI - Таба
    // по id юзера: свой или чужой..
    // т.к возвращаются пагинированные данные - по дефолту приходит первая стр. и на ней 5 элем.
    currentPage: currentPage,
    // Параметры запроса - столько-то decks-колод на странице отобразить - по дефолту в редюсере 5 указал
    itemsPerPage: pageSize,
    // если хотим найти все колоды у которых больше 5 карточек, например от 5-10
    // то передаем: minCardsCount = 5, maxCardsCount=10
    maxCardsCount: debouncedSliderValue[1],
    minCardsCount: debouncedSliderValue[0], //  например хотим найти все колоды у которых меньше 5 карточек
    name: debouncedSearchName,
    orderBy: sortedString,
  })

  const totalCards = decks?.data?.maxCardsCount // общее кол-во карточек

  /**
   *  Если текущая стр (currentPage) больше, чем количество страниц, необходимых для отображения
   *  всех карточек (рассчитываемое как общее количество карточек (totalCards) деленное на количество
   *  карточек на странице (pageSize)), или изменена вкладка (tabValue), то устанавливается значение
   *  текущей страницы в 1.
   *  Это условие гарантирует, что при изменении параметров фильтрации, поиска или размера страницы,
   *  а также при выборе новой вкладки, текущая страница будет установлена в 1, чтобы пользователь
   *  всегда начинал просмотр колод с первой страницы.
   */
  useEffect(() => {
    if ((totalCards && totalCards / pageSize < currentPage) || tabValue) {
      setCurrentPage(1)
    }
  }, [
    currentPage,
    debouncedSearchName,
    debouncedSliderValue,
    pageSize,
    setCurrentPage,
    tabValue,
    totalCards,
  ])

  return (
    <section className={s.decksPageBlock}>
      <Container className={s.header}>
        <div className={s.top}>
          <Typography as={'h1'} variant={'large'}>
            Decks list
          </Typography>
          {/* создаем новую одну колоду по нажатию на кнопку: "Add new Deck" внутри FormData и
          input c type='file'*/}
          <CreateControlForNewDeck />
        </div>
        {/* инпут + табы + слайдер + кнопка очистки всех фильтров = фильтровые контроли */}
        <FilterControls
          // берет значения из локального редакса (см.конспект 3 с Валера - и с сервера)
          authUserId={authUserId}
          searchName={searchName}
          setSearchName={setSearchName}
          setSliderValue={setSliderValue}
          setTabValue={setTabValue}
          sliderMaxValue={decks?.data?.maxCardsCount}
          sliderValue={sliderValue}
          tabValue={tabValue}
        />
        {/* если колоды пришли с сервера */}
        {decks?.data?.items && (
          <DecksTable
            authUserId={authUserId}
            items={decks.data.items}
            onSort={setSort}
            sort={sort}
          />
        )}
        {/* Пагинация */}
        <Pagination
          className={s.pagination}
          currentPage={currentPage}
          onSetPageChange={setCurrentPage}
          onSetPageSizeChange={setPageSize}
          pageSize={pageSize}
          totalCount={decks?.data?.pagination?.totalItems}
        />
      </Container>
    </section>
  )
}

export default memo(DecksPage)
