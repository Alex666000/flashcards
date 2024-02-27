import { memo } from 'react'

import { ControlForNewDeck } from '@/features/decks'
import { Typography } from '@/shared/ui/typography'

import s from './decks-page-header.module.scss'

export const DecksPageHeader = memo(({}) => {
  return (
    <div className={s.top}>
      <Typography as={'h1'} variant={'large'}>
        Decks list
      </Typography>
      {/* создаем новую одну колоду по нажатию на кнопку: "Add new Deck"
      внутри есть FormData и input c type='file'*/}
      <ControlForNewDeck />
    </div>
  )
})
