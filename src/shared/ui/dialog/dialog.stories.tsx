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

export const DeletePack = {
  render: () => {
    const [deleteIsOpen, setDeleteIsOpen] = useState(false)

    return (
      <>
        <Dialog
          buttonText={'Delete Pack'}
          description={'Do you really want to remove Pack Name? All cards will be deleted.'}
          onConfirm={() => setDeleteIsOpen(false)}
          open={deleteIsOpen}
          setOpen={setDeleteIsOpen}
          splitLines
          title={'Delete Pack'}
        />
        <Button onClick={() => setDeleteIsOpen(true)}>Delete Pack</Button>
      </>
    )
  },
}
