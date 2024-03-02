export const decksTableColumnsForSort = [
  {
    // key - ключ для сортировки отображается в адресной строке
    // http://localhost:5173/decks?sort=asc_created&max=48&min=16
    key: 'name',
    title: 'Name',
  },
  {
    key: 'cardsCount',
    title: 'Cards',
  },
  {
    key: 'updated',
    title: 'Last Updated',
  },
  {
    key: 'created',
    title: 'Created By',
  },
  {
    key: 'controls',
    sortable: false,
    title: '',
  },
]
