import type { Meta } from '@storybook/react'

import { useForm } from 'react-hook-form'

import { Button } from '@/shared/ui/button'
import { ControlledSelect } from '@/shared/ui/controlled'
import { Typography } from '@/shared/ui/typography'
import { DevTool } from '@hookform/devtools'

const meta = {
  component: ControlledSelect,
  title: 'shared/ui/controlled-select',
} satisfies Meta<typeof ControlledSelect>

export default meta

const formOptions = [
  { label: 'One', value: '1' },
  { label: 'Two', value: '2' },
  { label: 'Three', value: '3' },
  { label: 'Four', value: '4' },
  { label: 'Five', value: '5' },
]

type FormValues = Record<'number', string>

export const ExampleWithForm = {
  render: () => {
    const { control, handleSubmit } = useForm<FormValues>()

    const onSubmit = (data: FormValues) => {
      alert(JSON.stringify(data))
    }

    return (
      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '300px' }}>
        <DevTool control={control} />
        <Typography>Form With Select</Typography>
        <div style={{ margin: '30px 0' }}>
          <ControlledSelect
            control={control}
            label={'Select'}
            name={'number'}
            options={formOptions}
            placeholder={'Set number'}
          />
        </div>
        <Button fullWidth>Send</Button>
      </form>
    )
  },
}
