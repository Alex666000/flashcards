import { FC, memo } from 'react'

import { Card } from '@/features/cards/rtk-api'
import { CardRow } from '@/features/cards/ui/card-row/card-row'
import { deckTableColumns } from '@/shared/lib/constants/deckTableColumns'
import { Table } from '@/shared/ui/table'
import { TableHeader, TableHeaderProps } from '@/shared/ui/table-header'

type Props = {
  cards: Card[]
  isMyDeck: boolean
} & Pick<TableHeaderProps, 'onSort' | 'sort'>

export const CardsTable: FC<Props> = memo(({ cards = [], isMyDeck: isMyDeck, ...rest }) => {
  const columns = deckTableColumns.filter((c) => (isMyDeck ? c : c.key !== 'controls'))

  if (!cards.length) {
    return <Table.Empty>No content with these terms...</Table.Empty>
  }

  return (
    <Table.Root>
      <TableHeader columns={columns} {...rest} />
      <Table.Body>
        {cards?.map((card) => <CardRow card={card} isMyDeck={isMyDeck} key={card?.id} />)}
      </Table.Body>
    </Table.Root>
  )
})
