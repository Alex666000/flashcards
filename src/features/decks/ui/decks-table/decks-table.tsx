import { FC, memo } from 'react'

import { DeckRow } from '@/features/decks'
import { DeckResponseData } from '@/features/decks/api/decks.types'
import { Sort, decksTableColumnsForSort } from '@/shared/lib'
import { Table } from '@/shared/ui/table'
import { TableHeader, TableHeaderProps } from '@/shared/ui/table-header'

type Props = {
  authUserId: string
  items: DeckResponseData[]
} & Pick<TableHeaderProps, 'onSort' | 'sort'> // сортировка - попадет в ...rest - если пропсы не доставать

export const DecksTable: FC<Props> = memo(({ authUserId, items, onSort, sort, ...rest }) => {
  if (!items.length) {
    return <Table.Empty>No content with these terms...</Table.Empty>
  }

  return (
    <Table.Root>
      {/* шапка таблицы - серая с логикой сортировки - decksTableColumns -- определяет вид
      таблицы ее колонки */}
      <TableHeader columns={decksTableColumnsForSort} onSort={onSort} sort={sort} {...rest} />
      {/* Table.Body - состоит из многих строк - в каждой строке колода */}
      <Table.Body>
        {items?.map((deck) => <DeckRow authUserId={authUserId} deck={deck} key={deck?.id} />)}
      </Table.Body>
    </Table.Root>
  )
})

/*
- Таблица состоит из шапки (состоит из 1 строки с иконкой "стрелочки") с названием колонок где
есть логика сортировки и строк DeckRow - строки состоят из многих ячеек с контентом
 */
