import { useState } from 'react'

import {
  EditDeckModal,
  EditDeckModalProps,
} from '@/features/decks/ui/edit-deck-modal/edit-deck-modal'
import { Icon } from '@/shared/ui/icon'
import { IconButton } from '@/shared/ui/icon-button'

type Props = Omit<EditDeckModalProps, 'open' | 'setOpen'>

export const EditControl = ({ cover, id, isPrivate, name }: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <EditDeckModal
        cover={cover}
        id={id}
        isPrivate={isPrivate}
        name={name}
        open={open}
        setOpen={setOpen}
      />
      <IconButton
        icon={<Icon height={18} name={'edit'} width={18} />}
        onClick={() => setOpen(true)}
        small
      />
    </>
  )
}
