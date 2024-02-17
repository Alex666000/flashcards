import { FC } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/shared/ui/button'
import { ControlledRadioGroup } from '@/shared/ui/controlled'
import { Option } from '@/shared/ui/radio-group'

import s from './rate-card.module.scss'

const options: Option[] = [
  { label: 'Did not know', value: '1' },
  { label: 'Forgot', value: '2' },
  { label: 'A lot of thought', value: '3' },
  { label: 'Confused', value: '4' },
  { label: 'Knew the answer', value: '5' },
]

export type RateType = { grade: string }

type Props = {
  onSubmit: (data: RateType) => void
}

export const RateCardForm: FC<Props> = ({ onSubmit }) => {
  const { control, handleSubmit } = useForm<RateType>({
    defaultValues: { grade: '1' },
  })

  return (
    <form className={s.root} onSubmit={handleSubmit(onSubmit)}>
      <ControlledRadioGroup control={control} name={'grade'} options={options} />
      <Button className={s.button} fullWidth>
        Next Question
      </Button>
    </form>
  )
}
