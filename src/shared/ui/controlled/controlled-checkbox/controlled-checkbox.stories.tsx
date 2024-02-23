import type { Meta } from '@storybook/react'

import { CSSProperties } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/shared/ui/button'
import { ControlledCheckbox } from '@/shared/ui/controlled'
import { Typography } from '@/shared/ui/typography'
import { DevTool } from '@hookform/devtools'

const meta = {
  component: ControlledCheckbox,
  title: 'shared/ui/controlled-checkbox',
} satisfies Meta<typeof ControlledCheckbox>

export default meta

type FormValues = Record<'car' | 'carPark', boolean>

export const ExampleWithForm = {
  render: () => {
    const { control, handleSubmit } = useForm<FormValues>({
      defaultValues: {
        car: false,
        carPark: false,
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
        <Typography>Form With Controlled Checkbox</Typography>
        <div style={styles}>
          <ControlledCheckbox control={control} label={'Car'} name={'car'} />
          <ControlledCheckbox control={control} label={'Car Park'} name={'carPark'} />
        </div>
        <Button fullWidth>Send</Button>
      </form>
    )
  },
}
