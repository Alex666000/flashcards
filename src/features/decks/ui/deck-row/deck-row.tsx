import { FC, memo } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { DeleteControl, EditControl } from '@/features/decks'
import { DeckResponseData } from '@/features/decks/api/decks.types'
import defaultCover from '@/shared/assets/images/default-image.jpg'
import { ROUTES } from '@/shared/lib/constants/route-path'
import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon'
import { IconButton } from '@/shared/ui/icon-button'
import { Table } from '@/shared/ui/table'
import { Typography } from '@/shared/ui/typography'

import s from './deck-row.module.scss'

type Props = {
  authUserId: string
  deck: DeckResponseData
}

export const DeckRow: FC<Props> = memo(({ authUserId, deck }) => {
  const navigate = useNavigate()

  const isMyDeck = authUserId === deck?.author.id

  const redirectToDeckPage = () => {
    if (deck.id) {
      navigate(`/decks/${deck.id}`)
    }
  }

  const redirectToLearnPage = () => {
    if (deck.id) {
      navigate(`/decks/${deck.id}${ROUTES.learn}`)
    }
  }

  return (
    <Table.Row className={s.root} key={deck?.id}>
      <Table.Cell align={'left'} className={s.name} onClick={redirectToDeckPage}>
        <Button as={Link} className={s.link} to={deck?.id} variant={'link'}>
          <img alt={'Deck cover'} className={s.cover} src={deck?.cover ?? defaultCover} />
          <Typography as={'h3'} variant={'body2'}>
            {deck.name}
          </Typography>
        </Button>
      </Table.Cell>
      <Table.Cell className={s.count}>{deck.cardsCount}</Table.Cell>
      <Table.Cell className={s.date}>{new Date(deck?.updated).toLocaleDateString()}</Table.Cell>
      <Table.Cell className={s.createdBy}>{deck?.author?.name}</Table.Cell>
      <Table.Cell className={s.cell}>
        <div className={s.controls}>
          {isMyDeck ? (
            <>
              <EditControl
                cover={deck?.cover}
                id={deck?.id}
                isPrivate={deck?.isPrivate}
                name={deck?.name}
              />
              <IconButton
                disabled={!deck.cardsCount}
                icon={<Icon height={18} name={'play'} width={18} />}
                onClick={redirectToLearnPage}
                small
              />
              <DeleteControl id={deck?.id} name={deck?.name} />
            </>
          ) : (
            <IconButton
              disabled={!deck.cardsCount}
              icon={<Icon height={18} name={'play'} width={18} />}
              onClick={redirectToLearnPage}
              small
            />
          )}
        </div>
      </Table.Cell>
    </Table.Row>
  )
})
