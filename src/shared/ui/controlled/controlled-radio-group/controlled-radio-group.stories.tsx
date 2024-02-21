import { CSSProperties } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/shared/ui/button'
import { ControlledRadioGroup } from '@/shared/ui/controlled'
import { Typography } from '@/shared/ui/typography'
import { DevTool } from '@hookform/devtools'
import { Meta } from '@storybook/react'

const meta = {
  component: ControlledRadioGroup,
  title: 'Components/Controlled/Radio Group',
} satisfies Meta<typeof ControlledRadioGroup>

export default meta

const formOptions = {
  color: [
    { label: 'Red', value: 'red' },
    { label: 'Black', value: 'black' },
    { label: 'White', value: 'white' },
  ],
  number: [
    { label: 'One', value: '1' },
    { label: 'Two', value: '2' },
    { label: 'Three', value: '3' },
    { label: 'Four', value: '4' },
    { label: 'Five', value: '5' },
  ],
}

type FormValues = Record<'color' | 'number', string>

export const ExampleWithForm = {
  render: () => {
    const { control, handleSubmit } = useForm<FormValues>({
      defaultValues: {
        color: 'red',
        number: '1',
      },
    })

    const onSubmit = (data: FormValues) => {
      alert(JSON.stringify(data))
    }

    const styles: CSSProperties = {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '30px 0',
    }

    return (
      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '300px' }}>
        <DevTool control={control} />
        <Typography>Form With Controlled Radio Group</Typography>
        <div style={styles}>
          <div>
            <Typography variant={'body2'}>Number:</Typography>
            <ControlledRadioGroup control={control} name={'number'} options={formOptions.number} />
          </div>
          <div>
            <Typography variant={'body2'}>Color:</Typography>
            <ControlledRadioGroup control={control} name={'color'} options={formOptions.color} />
          </div>
        </div>
        <Button fullWidth>Send</Button>
      </form>
    )
  },
}
