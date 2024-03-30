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

const DeckPage = () => {
  const navigate = useNavigate()
  const { currentPage, deckId, pageSize, searchName, setCurrentPage, setPageSize, setSearchName } =
    useDeckLocalStateData()

  const debouncedSearchName = useDebounce(searchName)

  const [sort, setSort] = useState<Sort>({ direction: 'desc', key: 'updated' })
  const sortedString = sort ? `${sort.key}-${sort.direction}` : undefined

  const { data: userData, isFetching, isLoading } = useMeQuery()
  const currentAuthUserId = (userData as UserAuthDataResponse)?.id

  const {
    data: deckData,
    isFetching: isDeckInfoFetching,
    isLoading: isDeckInfoLoading,
  } = useGetDeckQuery({ id: deckId ?? '' })

  const authorDeckId = deckData?.userId

  const isMyDeck = authorDeckId === currentAuthUserId

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
    {
      selectFromResult: ({ data }) => {
        return { cards: data?.items, cardsTotalCount: data?.pagination.totalItems }
      },
    }
  )

  const [deleteDeck, { isLoading: isDeletedLoading }] = useDeleteDeckMutation()

  const [editIsOpen, setEditIsOpen] = useState(false)

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
        <div className={s.deckHeader}>
          <BackButton />
          <div className={s.top}>
            <Typography as={'h1'} className={s.title} variant={'large'}>
              {deckData?.name}
              {isMyDeck && (
                <OwnerDeckDropDown
                  onDeleteHandler={deleteDeckHandler}
                  onEditHandler={() => setEditIsOpen(true)}
                />
              )}
            </Typography>
            {deckData && isMyDeck ? (
              <CreateCardControl deckId={deckData.id} />
            ) : (
              !!deckData?.cardsCount && (
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
