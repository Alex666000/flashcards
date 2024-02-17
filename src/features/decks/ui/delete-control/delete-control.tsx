import { FC, useState } from 'react'

import { useDeleteDeckMutation } from '@/features/decks/api'
import { requestHandler } from '@/shared/lib/utils/request-handler'
import { Dialog } from '@/shared/ui/dialog'
import { Icon } from '@/shared/ui/icon'
import { IconButton } from '@/shared/ui/icon-button'

type Props = {
  id: string
  name: string
}

export const DeleteControl: FC<Props> = ({ id, name }) => {
  const [open, setOpen] = useState(false)

  const [deleteDeck] = useDeleteDeckMutation()

  const onConfirm = async () => {
    await requestHandler(async () => {
      await deleteDeck({ id }).unwrap()
      setOpen(false)
    })
  }

  return (
    <>
      <Dialog
        buttonText={'Delete Deck'}
        description={`Do you really want to remove ${name}? All cards will be deleted.`}
        onConfirm={onConfirm}
        open={open}
        setOpen={setOpen}
        splitLines
        title={'Delete Deck'}
      />
      <IconButton
        icon={<Icon height={18} name={'trash-bin'} width={18} />}
        onClick={() => setOpen(true)}
        small
      />
    </>
  )
}
