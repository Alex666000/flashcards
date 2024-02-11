import { memo } from 'react'

import { Deck } from '@/features/decks/api/types'
import { decksTableColumns } from '@/shared/lib/constants/decksTableColumns'
import { Table } from '@/shared/ui/table'
import { TableHeader, TableHeaderProps } from '@/shared/ui/table-header'

import { DeckRow } from './deck-row/deck-row'

type Props = {
  authUserId: string
  items: Deck[]
} & Pick<TableHeaderProps, 'onSort' | 'sort'>

export const CardsTable = memo(({ authUserId, items, ...rest }: Props) => {
  if (!items.length) {
    return <Table.Empty>No content with these terms...</Table.Empty>
  }

  return (
    <Table.Root>
      <TableHeader columns={decksTableColumns} {...rest} />
      <Table.Body>
        {items.map((pack) => (
          <DeckRow authUserId={authUserId} key={pack.id} pack={pack} />
        ))}
      </Table.Body>
    </Table.Root>
  )
})
