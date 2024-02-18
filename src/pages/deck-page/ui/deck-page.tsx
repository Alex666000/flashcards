import { memo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { UserAuthDataResponse } from '@/features/auth/model/types/auth.types'
import { useMeQuery } from '@/features/auth/rtk-api/auth.api'
import { useGetCardsQuery } from '@/features/cards/rtk-api'
import { CardsTable, CreateCardControl } from '@/features/cards/ui'
import { useDeckData } from '@/features/deck/model/hooks/use-deck-data'
import { OwnerDeckDropDown } from '@/features/deck/ui/owner-deck-drop-down/owner-deck-drop-down'
import { useDeleteDeckMutation, useGetDeckInfoQuery } from '@/features/decks/api'
import { EditMyDeckModal } from '@/features/decks/ui/edit-my-deck-modal/edit-my-deck-modal'
import { ROUTES } from '@/shared/lib/constants/route-path'
import { useDebounce } from '@/shared/lib/hooks/use-debounce'
import { Sort } from '@/shared/lib/types/types'
import { getSortedString } from '@/shared/lib/utils/get-sorted-string'
import { requestHandler } from '@/shared/lib/utils/request-handler'
import { BackButton } from '@/shared/ui/back-button'
import { Button } from '@/shared/ui/button'
import { Container } from '@/shared/ui/container'
import { Loader } from '@/shared/ui/loaders-components'
import { Pagination } from '@/shared/ui/pagination'
import { TextField } from '@/shared/ui/text-field_'
import { Typography } from '@/shared/ui/typography'

import s from './deck.module.scss'

/**
 * DeckPage - функционал для просмотра информации о колоде - deck и ее карточках - cards, включая
 * управление их данными и выполнение действий, таких как редактирование и удаление
 */

const DeckPage = () => {
  // для получения данных о текущей странице, id колоды - deckId, размере страницы, параметре поиска
  const { currentPage, deckId, pageSize, searchName, setCurrentPage, setPageSize, setSearchName } =
    useDeckData()

  const debouncedSearchName = useDebounce(searchName)

  const navigate = useNavigate()

  // Запрашивает с сервера информацию об одной колоде с заданным id: deckId - отправляем на сервер
  // (deckId достали с помощью useParams() из урла в хуке useDeckData() ),
  const { data: deck, isLoading: isDeckLoading } = useGetDeckInfoQuery({ id: deckId })
  const authorDeckId = deck?.userId

  // Запрашивает информацию о текущем пользователе
  const { data: meData } = useMeQuery()
  const authUserId = (meData as UserAuthDataResponse)?.id

  // это моя колода
  const isMyDeck = authorDeckId === authUserId

  const [sort, setSort] = useState<Sort>({ direction: 'desc', key: 'updated' })
  const sortedString = getSortedString(sort)

  // Запрашивает карточки, принадлежащие данной колоде
  const { data } = useGetCardsQuery({
    id: deckId as string,
    params: {
      currentPage,
      itemsPerPage: pageSize,
      orderBy: sortedString,
      question: debouncedSearchName,
    },
  })

  const [deleteDeck] = useDeleteDeckMutation()

  const [editIsOpen, setEditIsOpen] = useState(false)

  // для удаления колоды, которая вызывается при нажатии на кнопку удаления.
  // После удаления перенаправляет пользователя на страницу со списком колод.
  const deletePackHandler = async () => {
    await requestHandler(async () => {
      await deleteDeck({ id: deckId })
      navigate(ROUTES.decks)
    })
  }

  if (isDeckLoading) {
    return <Loader />
  }

  return (
    <section className={s.deckPageBlock}>
      <Container>
        {deck && (
          // модальное окно для редактирования моей колоды - при нажатии на карандашик, когда создал
          // свою колоду - когда ранее нажимал для создания колоды: кнопку "Add new deck"
          // ТОЛЬКО ЕСЛИ ЕСТЬ СОЗДАННЫЕ - МОИ КОЛОДЫ
          <EditMyDeckModal
            cover={deck.cover}
            id={deck.id}
            isPrivate={deck.isPrivate}
            name={deck.name}
            open={editIsOpen}
            setOpen={setEditIsOpen}
          />
        )}
        {/* стрелка назад */}
        <BackButton />
        <div className={s.deckHeader}>
          <div className={s.top}>
            <Typography as={'h1'} className={s.title} variant={'large'}>
              {/* название колоды - на UX над фотографией.. */}
              {deck?.name}
              {/* если моя созданная колода то: */}
              {isMyDeck && (
                // DropDown при нажатии на "кружок с ..." появляется "карандашик" для редактирования
                // и "корзина" для удаления и кнопка "learn" карточку
                <OwnerDeckDropDown
                  onDeleteHandler={deletePackHandler}
                  // Открытие модального окна для редактирования моей колоды: При нажатии на кнопку
                  // редактирования (onEditHandler), открывается модальное окно для редактирования колоды.
                  onEditHandler={() => setEditIsOpen(true)}
                />
              )}
            </Typography>
            {deck && isMyDeck ? (
              // в моей колоде при нажатии на кнопку "Add new Card" откроется модальное окно
              // для заполнения полей создания моей новой карточки с вопросом и ответом и ее форматом
              // в виде текста или картинки содержащим вопрос
              <CreateCardControl deckId={deck.id} />
            ) : (
              !!deck?.cardsCount && (
                // нажали на крудочек с 3 точками - потом learn-card-page -- редирект на стр. learn-card-page
                // после того как побывал на learn-card-page поотвечал на вопрос ставиться счетчик сколько раз
                // отвечал и выставляется оценка=рейтинг ответа
                <Button as={Link} to={`.${ROUTES.learn}`}>
                  Learn Cards
                </Button>
              )
            )}
          </div>
          {deck?.cover && <img alt={'Cover'} className={s.cover} src={deck.cover} />}
          <TextField
            clearField={() => setSearchName('')}
            onChange={(e) => setSearchName(e.currentTarget.value)}
            placeholder={'Search by question'}
            type={'search'}
            value={searchName}
          />
        </div>
        {/* Рендеринг информации о колоде и ее карточках */}
        {data?.items && (
          <CardsTable cards={data.items} isMyDeck={isMyDeck} onSort={setSort} sort={sort} />
        )}
        {/*Позволяет переходить между страницами карточек колоды и изменять количество карточек на странице*/}
        <Pagination
          className={s.pagination}
          currentPage={currentPage}
          onSetPageChange={setCurrentPage}
          onSetPageSizeChange={setPageSize}
          pageSize={pageSize}
          totalCount={data?.pagination.totalItems}
        />
      </Container>
    </section>
  )
}

export default memo(DeckPage)
