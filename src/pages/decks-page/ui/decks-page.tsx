import { memo, useEffect } from 'react'

import { UserAuthDataResponse } from '@/features/auth'
import { useMeQuery } from '@/features/auth/api/auth.api'
import {
  DecksTable,
  FilterControls,
  useDecksReduxStateFilterParams,
  useDecksReduxStatePagination,
} from '@/features/decks'
import { ControlForNewDeckHeader } from '@/pages/decks-page/ui/control-for-new-deck-header/control-for-new-deck-header'
import { getSortedString, useDebounce } from '@/shared/lib'
import { Container } from '@/shared/ui/container'
import { LeanerProgress } from '@/shared/ui/loaders-components/loaders'
import { Page } from '@/shared/ui/page'
import { Pagination } from '@/shared/ui/pagination'
import { Typography } from '@/shared/ui/typography'

import s from './decks.module.scss'

import { useGetDecksQuery } from '../../../features/decks/api'

const DecksPage = () => {
  // Состояния поисковых параметров (фильтров) и "ПАГИНАЦИИ":
  // храним в локальном стейте-редакса состояния пагинации
  const { currentPage, pageSize, setCurrentPage, setPageSize } = useDecksReduxStatePagination()

  // "КВЕРИ ПАРАМЕТРЫ" - фильтры поиска - параметры поиска "инпут + таб + слайдер" и тд.
  const {
    // берем значения из Редакса + (подписка на обновления данных)
    handleSetSearchNameChange,
    handleSetSliderValueChange,
    handleSetTabValueChange,
    onSetSortChange,
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

  const { data: meData } = useMeQuery() // me() запрос

  // Запрос на сервер за колодами с такими поисковыми параметрами которые взяли из стейта редакса:
  const {
    currentData: decksData,
    error,
    isFetching,
    isLoading,
  } = useGetDecksQuery({
    authorId: tabValue, // отправляем на сервак значение выбранного на UI - Таба
    // по id юзера: свой или чужой..
    // т.к возвращаются пагинированные данные - по дефолту приходит первая стр. и на ней 5 элем
    currentPage: currentPage,
    // Параметры запроса - столько-то decks на странице отобразить
    itemsPerPage: pageSize,
    // если хотим найти все колоды у которых больше 5 карточек, например от 5-10
    // то передаем: minCardsCount = 5, maxCardsCount=10
    maxCardsCount: debouncedSliderValue[1],
    minCardsCount: debouncedSliderValue[0], // например хотим найти все колоды у которых < 5 cards
    name: debouncedSearchName,
    orderBy: sortedString,
  })

  const totalCards = decksData?.maxCardsCount // общее кол-во карточек

  //  Если текущая стр (currentPage) больше, чем количество страниц, необходимых
  //  для отображения всех карточек  то устанавливается значение текущей страницы в 1.
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

  // обработка ошибок
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
            authUserId={(meData as UserAuthDataResponse)?.id}
            onSetSearchNameChange={handleSetSearchNameChange}
            onSetSliderValueChange={handleSetSliderValueChange}
            onSetTabValueChange={handleSetTabValueChange}
            searchName={searchName}
            sliderMaxValue={decksData?.maxCardsCount}
            sliderValue={sliderValue}
            tabValue={tabValue}
          />
          {/* если колоды пришли с сервера - оплучаем массив объектов где каждый объект = колода
          колоды отрисуем в таблице */}
          {decksData?.items && (
            <DecksTable
              authUserId={(meData as UserAuthDataResponse)?.id}
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
