import { useState } from 'react'

import { Button } from '@/shared/ui/button'
import { Dialog } from '@/shared/ui/dialog/dialog'
import { Meta } from '@storybook/react'

const meta = {
  component: Dialog,
  tags: ['autodocs'],
  title: 'Components/Dialog',
} satisfies Meta<typeof Dialog>

export default meta

export const DeleteDeck = {
  render: () => {
    const [deleteIsOpen, setDeleteIsOpen] = useState(false)

    return (
      <>
        <Dialog
          buttonText={'Delete Deck'}
          description={'Do you really want to remove Deck Name? All cards will be deleted.'}
          onConfirm={() => setDeleteIsOpen(false)}
          open={deleteIsOpen}
          setOpen={setDeleteIsOpen}
          splitLines
          title={'Delete Deck'}
        />
        <Button onClick={() => setDeleteIsOpen(true)}>Delete Pack</Button>
      </>
    )
  },
}
