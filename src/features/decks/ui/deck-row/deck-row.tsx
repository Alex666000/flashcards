import { FC, memo } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Deck } from '@/features/decks/api/types'
import { DeleteControl } from '@/features/decks/ui/delete-control/delete-control'
import { EditControl } from '@/features/decks/ui/edit-control/edit-control'
import { ROUTES } from '@/shared/lib/constants/route-path'
import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon'
import { IconButton } from '@/shared/ui/icon-button'
import { Table } from '@/shared/ui/table'
import { Typography } from '@/shared/ui/typography'

import s from './pack-row.module.scss'

import defaultCover from '../../../../shared/assets/images/default-image.jpg'

type Props = {
  authUserId: string //  Идентификатор текущего пользователя
  deck: Deck // Объект с информацией о колоде карточек
}

/**
 * DeckRow - отображает информацию о колоде: deck, карточек в виде строки в таблице:
 */
export const DeckRow: FC<Props> = memo(({ authUserId, deck }) => {
  const isMyDeck = authUserId === deck.author.id

  const navigate = useNavigate()

  const onLearn = () => {
    // перенаправляет пользователя на страницу изучения колоды
    navigate(`${deck.id}${ROUTES.learn}`)
  }

  return (
    <Table.Row className={s.root} key={deck.id}>
      <Table.Cell align={'left'} className={s.name}>
        {/* ссылка в строке с картинкой и самой ссылкой именем колоды */}
        <Button as={Link} className={s.link} to={deck.id} variant={'link'}>
          <img alt={'Deck cover'} className={s.cover} src={deck.cover ?? defaultCover} />
          <Typography as={'h3'} variant={'body2'}>
            {deck.name}
          </Typography>
        </Button>
      </Table.Cell>
      <Table.Cell className={s.count}>{deck.cardsCount}</Table.Cell>
      <Table.Cell className={s.date}>{new Date(deck.updated).toLocaleDateString()}</Table.Cell>
      <Table.Cell className={s.createdBy}>{deck.author.name}</Table.Cell>
      <Table.Cell className={s.cell}>
        <div className={s.controls}>
          {/* Если моя колода */}
          {isMyDeck ? (
            <>
              {/* "карандашик" - позволяющая изменить параметры колоды */}
              <EditControl
                cover={deck.cover}
                id={deck.id}
                isPrivate={deck.isPrivate}
                name={deck.name}
              />
              {/* позволяет перейти к изучению колоды */}
              <IconButton
                disabled={!deck.cardsCount}
                icon={<Icon height={18} name={'play'} width={18} />}
                onClick={onLearn}
                small
              />
              {/* позволяющая удалить колоду */}
              <DeleteControl id={deck.id} name={deck.name} />
            </>
          ) : (
            <IconButton
              disabled={!deck.cardsCount}
              icon={<Icon height={18} name={'play'} width={18} />}
              onClick={onLearn}
              small
            />
          )}
        </div>
      </Table.Cell>
    </Table.Row>
  )
})
