import { FC, useState } from 'react'

import { useDeleteCardMutation } from '@/features/cards/rtk-api/cards.api'
import { handleRequestOnServer } from '@/shared/lib/utils/handle-request-on-server'
import { Dialog } from '@/shared/ui/dialog'
import { Icon } from '@/shared/ui/icon'
import { IconButton } from '@/shared/ui/icon-button'

type Props = {
  id: string
}

export const DeleteCardControl: FC<Props> = ({ id }) => {
  const [deleteIsOpen, setDeleteIsOpen] = useState(false)

  const [deleteCard] = useDeleteCardMutation()

  const onConfirm = async () => {
    await handleRequestOnServer(async () => {
      await deleteCard({ id }).unwrap()
      setDeleteIsOpen(false)
    })
  }

  return (
    <>
      <Dialog
        buttonText={'Delete Card'}
        description={'Do you really want to remove this card?'}
        onConfirm={onConfirm}
        open={deleteIsOpen}
        setOpen={setDeleteIsOpen}
        title={'Delete Card'}
      />
      <IconButton
        icon={<Icon height={16} name={'trash-bin'} width={16} />}
        onClick={() => setDeleteIsOpen(true)}
        small
      />
    </>
  )
}
