import { memo, useEffect } from 'react'

import { UserAuthDataResponse } from '@/features/auth'
import { useMeQuery } from '@/features/auth/rtk-api/auth.api'
import {
  DecksTable,
  FilterControls,
  useDecksReduxStateFilterParams,
  useDecksReduxStatePagination,
} from '@/features/decks'
import { useGetDecksQuery } from '@/features/decks/rtk-api'
import { ControlForNewDeckHeader } from '@/pages/decks-page/ui/control-for-new-deck-header/control-for-new-deck-header'
import { getSortedString, useDebounce } from '@/shared/lib'
import { Container } from '@/shared/ui/container'
import { LeanerProgress } from '@/shared/ui/loaders-components/loaders'
import { Page } from '@/shared/ui/page'
import { Pagination } from '@/shared/ui/pagination'
import { Typography } from '@/shared/ui/typography'

import s from './decks.module.scss'

/**
 * Компонент - страница всех колод: decks - предоставляет полную функциональность для просмотра
 * списка колод - для применения фильтров к данным и навигации (пагинации) по страницам.
 */

const DecksPage = () => {
  // Состояния поисковых параметров (фильтров) и "ПАГИНАЦИИ":
  // храним в локальном стейте-редакса состояния пагинации
  const { currentPage, pageSize, setCurrentPage, setPageSize } = useDecksReduxStatePagination()

  // "КВЕРИ ПАРАМЕТРЫ" - фильтры поиска - параметры поиска "инпут + таб + слайдер" и тд.
  const {
    onSetSearchNameChange,
    onSetSliderValueChange,
    onSetSortChange,
    onSetTabValueChange,
    searchName,
    sliderValue,
    sortOptions,
    tabValue,
  } = useDecksReduxStateFilterParams()

  // отсортированная строка
  const sortedString = getSortedString(sortOptions)

  // Дебаунс для полей инпута и слайдера - возвращает массив:

  const debouncedSearchName = useDebounce(searchName)
  const debouncedSliderValue = useDebounce(sliderValue)

  console.log(debouncedSearchName)
  const { data: userData } = useMeQuery() // me() запрос
  const authUserId = (userData as UserAuthDataResponse).id

  // Запрос на сервер за колодами с такими поисковыми параметрами которые взяли из стейта редакса:
  const {
    // currentData теперь вместо data - тк сделали "пессимистик апдейт" с помощью onQueryStarted
    // в квери запросе: createDeck в апишке decks.api
    currentData: decksData,
    error,
    isFetching,
    isLoading,
  } = useGetDecksQuery({
    // authorId берет значение у userId
    authorId: String(tabValue), // отправляем на сервак значение выбранного на UI - Таба
    // по id юзера: свой или чужой..
    // т.к возвращаются пагинированные данные - по дефолту приходит первая стр. и на ней 5 элем
    currentPage: currentPage,
    // Параметры запроса - столько-то decks-колод на странице отобразить
    itemsPerPage: pageSize,
    // если хотим найти все колоды у которых больше 5 карточек, например от 5-10
    // то передаем: minCardsCount = 5, maxCardsCount=10
    maxCardsCount: debouncedSliderValue[1],
    minCardsCount: debouncedSliderValue[0], // например хотим найти все колоды у которых < 5 cards
    name: debouncedSearchName,
    orderBy: sortedString,
  })

  const totalCards = decksData?.maxCardsCount // общее кол-во карточек

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

  // обработка ошибок:
  if (error) {
    const err = error as any

    return (
      <Typography as={'h2'} variant={'error'}>
        {err.data.error}
      </Typography>
    )
  }

  const loadingStatus = isLoading || isFetching

  return (
    <>
      {loadingStatus && <LeanerProgress />}
      <Page className={s.decksPageBlock}>
        <Container className={s.header}>
          {/* для создания новой "МОЕЙ" колоды*/}
          <ControlForNewDeckHeader />
          {/* инпут + табы + слайдер + кнопка очистки всех фильтров */}
          <FilterControls
            // берет значения из локального редакса (см.конспект 3 с Валера - и с сервера)
            authUserId={authUserId}
            searchName={searchName}
            setSearchName={onSetSearchNameChange}
            setSliderValue={onSetSliderValueChange}
            setTabValue={onSetTabValueChange}
            sliderMaxValue={decksData?.maxCardsCount}
            sliderValue={sliderValue}
            tabValue={tabValue}
          />
          {/* если колоды пришли с сервера */}
          {decksData?.items && (
            <DecksTable
              authUserId={authUserId}
              items={decksData?.items}
              onSort={onSetSortChange}
              sort={sortOptions}
            />
          )}
          {/* Пагинация */}
          <Pagination
            className={s.pagination}
            currentPage={currentPage}
            onSetPageChange={setCurrentPage}
            onSetPageSizeChange={setPageSize}
            pageSize={pageSize}
            totalCount={decksData?.pagination?.totalItems || 10}
          />
        </Container>
      </Page>
    </>
  )
}

export default memo(DecksPage)
