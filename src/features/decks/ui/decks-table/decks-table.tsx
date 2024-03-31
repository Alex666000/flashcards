import { FC, memo } from 'react'

import { DeckRow } from '@/features/decks'
import { DeckResponseData } from '@/features/decks/api/decks.types'
import { decksTableColumnsForSort } from '@/shared/lib'
import { Table } from '@/shared/ui/table'
import { TableHeader, TableHeaderProps } from '@/shared/ui/table-header'

type Props = {
  authUserId: string
  items: DeckResponseData[]
} & Pick<TableHeaderProps, 'onSort' | 'sort'>

export const DecksTable: FC<Props> = memo(({ authUserId, items, onSort, sort, ...rest }) => {
  if (!items.length) {
    return <Table.Empty>No content with these terms...</Table.Empty>
  }

  return (
    <Table.Root>
      <TableHeader columns={decksTableColumnsForSort} onSort={onSort} sort={sort} {...rest} />
      <Table.Body>
        {items?.map((deck) => <DeckRow authUserId={authUserId} deck={deck} key={deck?.id} />)}
      </Table.Body>
    </Table.Root>
  )
})
