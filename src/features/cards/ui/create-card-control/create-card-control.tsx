import { FC, useState } from 'react'

import { CreateCardModal } from '@/features/cards/ui'
import { Button } from '@/shared/ui/button'

type Props = {
  deckId: string
}

export const CreateCardControl: FC<Props> = ({ deckId }) => {
  const [createIsOpen, setCreateIsOpen] = useState(false)

  return (
    <>
      <CreateCardModal deckId={deckId} open={createIsOpen} setOpen={setCreateIsOpen} />
      <Button onClick={() => setCreateIsOpen(true)}>Add New Card</Button>
    </>
  )
}
