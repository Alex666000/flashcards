import { CSSProperties, useState } from 'react'

import { Button } from '@/shared/ui/button'
import { Meta } from '@storybook/react'

import { TextField } from '../text-field_'
import { ModalWindow } from './'

const meta = {
  component: ModalWindow,
  tags: ['autodocs'],
  title: 'shared/ui/modal-window',
} satisfies Meta<typeof ModalWindow>

export default meta

export const ExampleWithForm = {
  render() {
    const [open, setOpen] = useState(false)

    const container: CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      rowGap: '12px',
    }

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open</Button>
        <ModalWindow open={open} setOpen={setOpen} title={'Dialog title'}>
          <div style={container}>
            <TextField label={'Title'} />
            <TextField label={'Key words'} />
            <Button style={{ alignSelf: 'flex-end', marginTop: '12px' }}>Send</Button>
          </div>
        </ModalWindow>
      </>
    )
  },
}
