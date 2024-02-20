import { FC, memo } from 'react'

import { Deck } from '@/features/decks/api/types'
import { DeckRow } from '@/features/decks/ui/deck-row/deck-row'
import { decksTableColumns } from '@/shared/lib/constants/decksTableColumns'
import { Table } from '@/shared/ui/table'
import { TableHeader, TableHeaderProps } from '@/shared/ui/table-header'

type Props = {
  authUserId: string
  items: Deck[]
} & Pick<TableHeaderProps, 'onSort' | 'sort'>

export const DecksTable: FC<Props> = memo(({ authUserId, items, ...rest }) => {
  if (!items.length) {
    return <Table.Empty>No content with these terms...</Table.Empty>
  }

  return (
    <Table.Root>
      {/* шапка таблицы - серая с логикой сортировки - decksTableColumns -- определяет вид
      таблицы ее колонки */}
      <TableHeader columns={decksTableColumns} {...rest} />
      <Table.Body>
        {items?.map((deck) => <DeckRow authUserId={authUserId} deck={deck} key={deck?.id} />)}
      </Table.Body>
    </Table.Root>
  )
})
