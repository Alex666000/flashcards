import { FC, memo } from 'react'

import { Deck } from '@/features/decks/api/types'
import { PackRow } from '@/features/decks/ui/pack-row/pack-row'
import { packsTableColumns } from '@/shared/lib/constants/packsTableColumns'
import { Table } from '@/shared/ui/table'
import { TableHeader, TableHeaderProps } from '@/shared/ui/table-header'

type Props = {
  authUserId: string
  items: Deck[]
} & Pick<TableHeaderProps, 'onSort' | 'sort'>

export const PacksTable: FC<Props> = memo(({ authUserId, items, ...rest }) => {
  if (!items.length) {
    return <Table.Empty>No content with these terms...</Table.Empty>
  }

  return (
    <Table.Root>
      <TableHeader columns={packsTableColumns} {...rest} />
      <Table.Body>
        {items.map((pack) => (
          <PackRow authUserId={authUserId} key={pack.id} pack={pack} />
        ))}
      </Table.Body>
    </Table.Root>
  )
})
