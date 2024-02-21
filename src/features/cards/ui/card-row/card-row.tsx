import { FC, memo } from 'react'

import { Card } from '@/features/cards'
import { DeleteCardControl } from '@/features/cards/ui/delete-card-control/delete-card-control'
import { EditCardControl } from '@/features/cards/ui/edit-card-control/edit-card-control'
import { Rating } from '@/shared/ui/rating'
import { Table } from '@/shared/ui/table'
import { Typography } from '@/shared/ui/typography'

import s from './card-row.module.scss'

import defaultImage from '../../../../shared/assets/images/default-image.jpg'

type Props = {
  card: Card // Объект с информацией о карточке
  isMyDeck: boolean
}

export const CardRow: FC<Props> = memo(({ card, isMyDeck }) => {
  return (
    <Table.Row className={s.root} key={card.id}>
      <Table.Cell className={s.question}>
        <img alt={'Question'} className={s.cover} src={card.questionImg ?? defaultImage} />
        <Typography as={'h3'} variant={'body2'}>
          {card.question}
        </Typography>
      </Table.Cell>
      <Table.Cell className={s.answer}>
        <img alt={'Answer'} className={s.cover} src={card.answerImg ?? defaultImage} />
        <Typography as={'h3'} variant={'body2'}>
          {card.answer}
        </Typography>
      </Table.Cell>
      <Table.Cell className={s.date}>{new Date(card.updated).toLocaleDateString()}</Table.Cell>
      <Table.Cell className={s.grade}>
        <Rating selectedStars={card.grade} />
      </Table.Cell>
      {isMyDeck && (
        <Table.Cell className={s.controls}>
          <div className={s.buttons}>
            {/*позволяющая изменить параметры карточки*/}
            <EditCardControl
              answer={card.answer}
              answerImg={card.answerImg}
              cardId={card.id}
              question={card.question}
              questionImg={card.questionImg}
            />
            <DeleteCardControl id={card.id} />
          </div>
        </Table.Cell>
      )}
    </Table.Row>
  )
})
