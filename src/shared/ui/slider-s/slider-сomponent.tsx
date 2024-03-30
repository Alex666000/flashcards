import { TextField } from '@/shared/ui/text-field_'
import { Typography } from '@/shared/ui/typography'
import * as Slider from '@radix-ui/react-slider'

import styles from './slider-сomponent.module.scss'

type SliderPropsType = {
  defaultValue?: [number, number]
  disabled?: boolean
  label?: string
  max?: number
  min?: number
  onValueCommit?: (value: [number, number]) => void
  rangeValue?: [number, number]
  setValue: (value: [number, number]) => void
  sliderValue: number[]
}

export const SliderComponent = ({
  defaultValue,
  disabled,
  label,
  max = 100,
  min = 0,
  onValueCommit,
  rangeValue,
  setValue,
  sliderValue,
}: SliderPropsType) => {
  const onSliderChange = (value: [number, number]) => {
    setValue(value)
  }

  return (
    <form>
      <div className={`${styles.container} ${disabled ? styles.disabled : ''}`}>
        <div className={styles.label}>
          <Typography variant={'body2'}>{label}</Typography>
        </div>
        <div className={styles.main}>
          <div>
            <TextField
              className={styles.value}
              inputTextClassName={styles.input}
              onChange={() => {}}
              value={rangeValue![0]}
            />
          </div>
          <Slider.Root
            className={styles.SliderRoot}
            defaultValue={defaultValue}
            disabled={disabled}
            max={max}
            min={min}
            minStepsBetweenThumbs={1}
            onValueChange={onSliderChange}
            onValueCommit={onValueCommit}
            step={1}
            value={sliderValue}
          >
            <Slider.Track className={styles.SliderTrack}>
              <Slider.Range className={styles.SliderRange} />
            </Slider.Track>

            <Slider.Thumb aria-label={'Start'} className={styles.SliderThumb} />
            <Slider.Thumb aria-label={'End'} className={styles.SliderThumb} />
          </Slider.Root>
          <div>
            <TextField
              className={styles.value}
              inputTextClassName={styles.input}
              onChange={() => {}}
              value={rangeValue![1]}
            />
          </div>
        </div>
      </div>
    </form>
  )
}
