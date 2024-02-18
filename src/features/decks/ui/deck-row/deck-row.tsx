import { FC, memo } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Deck } from '@/features/decks/api/types'
import { DeleteControl } from '@/features/decks/ui/delete-control/delete-control'
import { EditControl } from '@/features/decks/ui/edit-control/edit-control'
import defaultCover from '@/shared/assets/images/default-image.jpg'
import { ROUTES } from '@/shared/lib/constants/route-path'
import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon'
import { IconButton } from '@/shared/ui/icon-button'
import { Table } from '@/shared/ui/table'
import { Typography } from '@/shared/ui/typography'

import s from './pack-row.module.scss'

type Props = {
  authUserId: string
  pack: Deck
}

export const PackRow: FC<Props> = memo(({ authUserId, pack }) => {
  const isMyPack = authUserId === pack.author.id

  const navigate = useNavigate()

  const onLearn = () => {
    navigate(`${pack.id}${ROUTES.learn}`)
  }

  return (
    <Table.Row className={s.root} key={pack.id}>
      <Table.Cell align={'left'} className={s.name}>
        <Button as={Link} className={s.link} to={pack.id} variant={'link'}>
          <img alt={'Pack cover'} className={s.cover} src={pack.cover ?? defaultCover} />
          <Typography as={'h3'} variant={'body2'}>
            {pack.name}
          </Typography>
        </Button>
      </Table.Cell>
      <Table.Cell className={s.count}>{pack.cardsCount}</Table.Cell>
      <Table.Cell className={s.date}>{new Date(pack.updated).toLocaleDateString()}</Table.Cell>
      <Table.Cell className={s.createdBy}>{pack.author.name}</Table.Cell>
      <Table.Cell className={s.cell}>
        <div className={s.controls}>
          {isMyPack ? (
            <>
              <EditControl
                cover={pack.cover}
                id={pack.id}
                isPrivate={pack.isPrivate}
                name={pack.name}
              />
              <IconButton
                disabled={!pack.cardsCount}
                icon={<Icon height={18} name={'play'} width={18} />}
                onClick={onLearn}
                small
              />
              <DeleteControl id={pack.id} name={pack.name} />
            </>
          ) : (
            <IconButton
              disabled={!pack.cardsCount}
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
