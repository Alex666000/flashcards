import { FC, memo } from 'react'

import { Card } from '@/features/cards/rtk-api'
import { CardRow } from '@/features/cards/ui/card-row/card-row'
import { packTableColumns } from '@/shared/lib/constants/packTableColumns'
import { Table } from '@/shared/ui/table'
import { TableHeader, TableHeaderProps } from '@/shared/ui/table-header'

type Props = {
  cards: Card[]
  isMyPack: boolean
} & Pick<TableHeaderProps, 'onSort' | 'sort'>

export const CardsTable: FC<Props> = memo(({ cards = [], isMyPack, ...rest }) => {
  const columns = packTableColumns.filter((c) => (isMyPack ? c : c.key !== 'controls'))

  if (!cards.length) {
    return <Table.Empty>No content with these terms...</Table.Empty>
  }

  return (
    <Table.Root>
      <TableHeader columns={columns} {...rest} />
      <Table.Body>
        {cards?.map((card) => <CardRow card={card} isMyPack={isMyPack} key={card?.id} />)}
      </Table.Body>
    </Table.Root>
  )
})
