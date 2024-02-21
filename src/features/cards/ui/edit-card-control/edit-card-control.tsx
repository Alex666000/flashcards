import { FC, useState } from 'react'

import {
  EditCardModal,
  EditCardModalProps,
} from '@/features/cards/ui/edit-card-modal/edit-card-modal'
import { Icon } from '@/shared/ui/icon'
import { IconButton } from '@/shared/ui/icon-button'

type Props = Omit<EditCardModalProps, 'open' | 'setOpen'>

export const EditCardControl: FC<Props> = (props) => {
  const [editIsOpen, setEditIsOpen] = useState(false)

  return (
    <>
      <EditCardModal open={editIsOpen} setOpen={setEditIsOpen} {...props} />
      <IconButton
        icon={<Icon height={16} name={'edit'} width={16} />}
        onClick={() => setEditIsOpen(true)}
        small
      />
    </>
  )
}
