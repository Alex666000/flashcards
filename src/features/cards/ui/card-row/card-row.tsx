import { FC, memo } from 'react'

import { DeleteCardControl, EditCardControl } from '@/features/cards/ui'
import { Rating } from '@/shared/ui/rating'
import { Table } from '@/shared/ui/table'
import { Typography } from '@/shared/ui/typography'

import s from './card-row.module.scss'

import defaultImage from '../../../../shared/assets/images/default-image.jpg'
import { Card } from '../../rtk-api'

type Props = {
  card: Card
  isMyPack: boolean
}

export const CardRow: FC<Props> = memo(({ card, isMyPack }) => {
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
      {isMyPack && (
        <Table.Cell className={s.controls}>
          <div className={s.buttons}>
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
