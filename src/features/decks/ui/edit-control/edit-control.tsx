import { useState } from 'react'

import {
  EditDeckModalProps,
  EditMyDeckModal,
} from '@/features/decks/ui/edit-my-deck-modal/edit-my-deck-modal'
import { Icon } from '@/shared/ui/icon'
import { IconButton } from '@/shared/ui/icon-button'

type Props = Omit<EditDeckModalProps, 'open' | 'setOpen'>

// При клике на "карандашик" - откроется модалка с формой заполнения
export const EditControl = ({ cover, id, isPrivate, name }: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <EditMyDeckModal
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
