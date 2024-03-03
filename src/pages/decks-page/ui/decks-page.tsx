import { useEffect } from 'react'

import { UserAuthDataResponse } from '@/features/auth'
import { useMeQuery } from '@/features/auth/api/auth.api'
import { DecksTable, FilterControls, useDecksReduxState } from '@/features/decks'
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
  // "КВЕРИ ПАРАМЕТРЫ + ПАГИНАЦИЯ"
  // фильтры поиска - параметры поиска "инпут + таб + слайдер" и тд.
  const {
    clearSearchParamsFilter,
    // берем значения из Редакса + (подписка на обновления данных)
    currentPage,
    pageSize,
    searchName,
    setCurrentPage,
    setPageSize,
    setSearchName,
    setSliderValue,
    setSort,
    setTabValue,
    sliderValue,
    sort,
    tabValue,
  } = useDecksReduxState()

  // отсортированная строка
  const sortedString = getSortedString(sort) // const sortedString = sort ? `${sort.key}-${sort.direction}` : undefined

  // Дебаунс для полей инпута и слайдера - возвращает массив:
  const debouncedSearchName = useDebounce(searchName)
  const debouncedSliderValue = useDebounce(sliderValue)

  const { data: meData } = useMeQuery() // me() запрос

  // Запрос на сервер за колодами с такими квери параметрами которые взяли из стейта редакса:
  // квери параметры - чтобы ограничить выдачу данных с бэка
  // нам удобно хранить в числах а не обязательно все в строку конвертировать - косяк бэка
  // написали квери запрос на бэк идем смотрим нетворк что нам пришло какие данные в Preview
  const {
    // ПОЛУЧАЕМ С СЕРВЕРА:
    // currentData убрали тк из-за нее лишние перирсовки
    data: decksData,
    error,
    isFetching,
    isLoading,
  } = useGetDecksQuery({
    // ОТПРАВЛЯЕМ НА СЕРВЕР КВЕРИ ПАРАМЕТРЫ:
    authorId: tabValue, // отправляем на сервак значение выбранного на UI - Таба
    // по id юзера: свой или чужой..
    // т.к возвращаются пагинированные данные - по дефолту приходит первая стр. и на ней 5 элем
    currentPage: +currentPage,
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
  }, [currentPage, pageSize, setCurrentPage, tabValue, totalCards])

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

  // console.log('DecksPage')

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
            onClearFilter={clearSearchParamsFilter}
            onSearchNameChange={setSearchName}
            onSliderValueChange={setSliderValue}
            onTabValueChange={setTabValue}
            searchName={searchName}
            sliderMaxValue={decksData?.maxCardsCount}
            sliderValue={sliderValue}
            tabValue={tabValue}
          />
          {/* если колоды пришли с сервера - оплучаем массив объектов где каждый объект = колода
          колоды отрисуем в таблице */}
          {/* промапились по данным что пришли с сервера и отрисуем и установим в стейт */}
          {decksData?.items && (
            <DecksTable
              authUserId={(meData as UserAuthDataResponse)?.id}
              items={decksData?.items}
              onSort={setSort}
              sort={sort}
            />
          )}
          {/* Пагинация - ее значения не кешируется, данные храним в редаксе - Все вещи которые
          не на серваке храним в стеите редакса: например кликаю на 2 стр. мн надо вторую страницу
          подсветить сначала перед тем как она полетит на сервре я не могу - currentPage храним в
          глобальном стейте, либо в инпуте в серче ввожу и потом после перезагрузки тоже хочу это
          доставать, табы,слайдеров значения - делаем связку редакса и РТК (кэширование данных)
          -- если с сервера что-то вернулось то это делать с РТК квери а что-то глобальное  */}
          <Pagination
            className={s.pagination}
            currentPage={currentPage}
            onSetPageChange={setCurrentPage}
            onSetPageSizeChange={setPageSize}
            pageSize={pageSize}
            totalCount={300}
          />
        </Container>
      </Page>
    </>
  )
}

export default DecksPage

/*
- квери и ури параметры (не отправляем данные на сервер а отправляем аргументы в урле, аргументы
нужны чтобы ограничить выдачу с бэкенда данных, на их основе бэк выдает нам ответ в зависимости
от параметров с get запросм отправляем) -- не путать с телом запроса body при мутациях — квери
и ури отправляем параметры в урле при get запросе, а тело запроса body – это отправляем данные
на сервер -- например:
в post, put, patch запросе когда отправляем body (это данные которые хотим сохранить на
бэкенде — отправляем часто в виде объекта, эти данные бэк будет обрабатывать и сохранять у себя)
там все типы сохраняются, а квери и ури параметры которые идут в урле самом они всегда будут строкой
квери и ури параметры по сети по нетворку идут в качестве строк: когда отправляем на бэк
 */
