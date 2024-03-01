import { FC } from 'react'

import { Select } from '../../select'

type Props = {
  onPageSizeChange: (newPageSize: number) => void
  pageSize: number | undefined // Размер страницы
}
/**
 * PageSizeSelect - для выбора размера страницы (количества элементов на странице).
 */
export const PageSizeSelect: FC<Props> = ({ onPageSizeChange, pageSize }) => {
  const options = [
    { label: '5', value: '5' },
    { label: '7', value: '7' },
    { label: '10', value: '10' },
    { label: '15', value: '15' },
  ]

  const onValueChange = (value: string) => {
    onPageSizeChange(+value)
  }

  return <Select onValueChange={onValueChange} options={options} small value={`${pageSize}`} />
}
