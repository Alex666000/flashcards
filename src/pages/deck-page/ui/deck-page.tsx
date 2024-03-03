import { memo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { UserAuthDataResponse } from '@/features/auth'
import { useMeQuery } from '@/features/auth/api/auth.api'
import { CardsTable, CreateCardControl } from '@/features/cards'
import { useGetCardsQuery } from '@/features/cards/api/cards.api'
import { OwnerDeckDropDown, useDeckLocalStateData } from '@/features/deck'
import { EditMyDeckModal } from '@/features/decks'
import { ROUTES, Sort, handleRequestOnServer, useDebounce } from '@/shared/lib'
import { BackButton } from '@/shared/ui/back-button'
import { Button } from '@/shared/ui/button'
import { Container } from '@/shared/ui/container'
import { LeanerProgress } from '@/shared/ui/loaders-components/loaders'
import { Pagination } from '@/shared/ui/pagination'
import { TextField } from '@/shared/ui/text-field_'
import { Typography } from '@/shared/ui/typography'

import s from './deck.module.scss'

import { useDeleteDeckMutation, useGetDeckQuery } from '../../../features/decks/api'

/**
 * DeckPage - для просмотра информации о колоде - deck и ее карточках - cards, включая
 * управление их данными и выполнение действий, таких как редактирование и удаление
 */

const DeckPage = () => {
  const navigate = useNavigate()

  // для получения данных о текущей странице, id колоды - deckId, размере страницы, параметре поиска
  const { currentPage, deckId, pageSize, searchName, setCurrentPage, setPageSize, setSearchName } =
    useDeckLocalStateData()

  const debouncedSearchName = useDebounce(searchName)

  // Сортировка
  const [sort, setSort] = useState<Sort>({ direction: 'desc', key: 'updated' })
  const sortedString = sort ? `${sort.key}-${sort.direction}` : undefined

  // Запрашиваем с сервера информацию о текущем пользователе
  const { data: userData, isFetching, isLoading } = useMeQuery()
  const currentAuthUserId = (userData as UserAuthDataResponse)?.id

  // Запрашиваем с сервера информацию об одной колоде с заданным id: deckId - отправляем на сервер
  // (deckId достали с помощью useParams() из урла в хуке useDeckData() ),
  const {
    data: deckData,
    isFetching: isDeckInfoFetching,
    isLoading: isDeckInfoLoading,
  } = useGetDeckQuery({ id: deckId ?? '' })

  // id автора колоды
  const authorDeckId = deckData?.userId

  // это моя колода
  const isMyDeck = authorDeckId === currentAuthUserId

  // Запрашиваем карточки, принадлежащие данной колоде
  // cards - тк заменил в selectFromResult - см ниже
  const { cards, cardsTotalCount } = useGetCardsQuery(
    {
      id: deckId as string,
      params: {
        currentPage,
        itemsPerPage: pageSize,
        orderBy: sortedString ? sortedString : undefined,
        question: debouncedSearchName ? debouncedSearchName : undefined,
      },
    },
    // вернет объект с данными
    {
      // получаем данные с сервера и модифицируем как угодно:
      selectFromResult: ({ data }) => {
        return { cards: data?.items, cardsTotalCount: data?.pagination.totalItems }
      },
    }
  )

  const [deleteDeck, { isLoading: isDeletedLoading }] = useDeleteDeckMutation()

  const [editIsOpen, setEditIsOpen] = useState(false)

  // для удаления колоды, которая вызывается при нажатии на кнопку удаления.
  // После удаления перенаправляет пользователя на страницу со списком колод.
  const deleteDeckHandler = async () => {
    await handleRequestOnServer(async () => {
      await deleteDeck({ id: deckId })
      navigate(ROUTES.decks)
    })
  }

  if (isLoading || isFetching || isDeletedLoading || isDeckInfoLoading || isDeckInfoFetching) {
    return <LeanerProgress />
  }

  return (
    <section className={s.deckPageBlock}>
      <Container>
        {/* Модальное окно (c формой) для редактирования моей колоды */}
        {deckData && (
          <EditMyDeckModal
            cover={deckData.cover}
            id={deckData.id}
            isPrivate={deckData.isPrivate}
            name={deckData.name}
            open={editIsOpen}
            setOpen={setEditIsOpen}
          />
        )}
        {/* Все публичные колоды */}
        {/* стрелка назад */}
        <div className={s.deckHeader}>
          <BackButton />
          <div className={s.top}>
            <Typography as={'h1'} className={s.title} variant={'large'}>
              {/* название колоды - на UX над фотографией.. */}
              {deckData?.name}
              {/* если моя созданная колода то: */}
              {isMyDeck && (
                // DropDown при нажатии на "кружок с ..." появляется "карандашик" для редактирования
                // и "корзина" для удаления и кнопка "learn" карточку
                <OwnerDeckDropDown
                  onDeleteHandler={deleteDeckHandler}
                  // Открытие модального окна для редактирования моей колоды: При нажатии на кнопку
                  // редактирования (onEditHandler), открывается модальное окно для редактирования колоды.
                  onEditHandler={() => setEditIsOpen(true)}
                />
              )}
            </Typography>
            {deckData && isMyDeck ? (
              // в моей колоде при нажатии на кнопку "Add new Card" откроется модальное окно
              // для заполнения полей создания моей новой карточки с вопросом и ответом и ее форматом
              // в виде текста или картинки содержащим вопрос
              <CreateCardControl deckId={deckData.id} />
            ) : (
              !!deckData?.cardsCount && (
                // нажали на крудочек с 3 точками - потом learn-card-page -- редирект на стр. learn-card-page
                // после того как побывал на learn-card-page поотвечал на вопрос ставиться счетчик сколько раз
                // отвечал и выставляется оценка=рейтинг ответа
                <Button as={Link} to={`.${ROUTES.learn}`}>
                  Learn Cards
                </Button>
              )
            )}
          </div>
          {deckData?.cover && <img alt={'Cover'} className={s.cover} src={deckData.cover} />}
          <TextField
            clearField={() => setSearchName('')}
            onChange={(e) => setSearchName(e.currentTarget.value)}
            placeholder={'Search by question'}
            type={'search'}
            value={searchName}
          />
        </div>
        {/* Рендеринг информации о колоде и ее карточках */}
        {cards && (
          <div className={s.deckTable}>
            <CardsTable cards={cards} isMyDeck={isMyDeck} onSort={setSort} sort={sort} />
            <Pagination
              className={s.pagination}
              currentPage={currentPage}
              onSetPageChange={setCurrentPage}
              onSetPageSizeChange={setPageSize}
              pageSize={pageSize}
              totalCount={cardsTotalCount}
            />
          </div>
        )}
      </Container>
    </section>
  )
}

export default memo(DeckPage)
