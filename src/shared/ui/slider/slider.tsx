import { ElementRef, forwardRef } from 'react'

import { Typography } from '@/shared/ui/typography'
import * as SliderRadix from '@radix-ui/react-slider'

import s from './slider.module.scss'

type SliderProps = {
  disabled?: boolean
  label?: string
  max?: number
  min?: number
  onChange?: (value: number[]) => void
  onValueCommit?: (value: [number, number]) => void
  step?: number
  value: number[]
}

export const Slider = forwardRef<ElementRef<typeof SliderRadix.Root>, SliderProps>(
  ({ disabled, label, max, min, onChange, onValueCommit, step = 1, value, ...restProps }, ref) => {
    return (
      <form>
        <div className={`${s.container} ${disabled ? s.disabled : ''}`}>
          {/* <div className={clsx(s.container, disabled && s.disabled)}> */}
          <Typography as={'label'} className={s.label} variant={'body2'}>
            {label}
            <div className={s.body}>
              <Typography as={'h3'} className={s.value} variant={'body1'}>
                {value[0]}
              </Typography>
              <SliderRadix.Root
                className={s.line}
                disabled={disabled}
                max={max}
                min={min}
                onValueChange={onChange}
                onValueCommit={onValueCommit}
                ref={ref}
                step={step}
                value={[value?.[0] ?? 0, value?.[1] ?? max ?? 0]}
                {...restProps}
              >
                <SliderRadix.Track className={s.track}>
                  <SliderRadix.Range className={s.range} />
                </SliderRadix.Track>
                <SliderRadix.Thumb aria-label={'Start'} className={s.thumb}>
                  <div className={s.dot}></div>
                </SliderRadix.Thumb>
                <SliderRadix.Thumb aria-label={'End'} className={s.thumb}>
                  <div className={s.dot}></div>
                </SliderRadix.Thumb>
              </SliderRadix.Root>
              <div className={s.minMax}>
                <Typography as={'h3'} className={s.value} variant={'body1'}>
                  {value[1]}
                </Typography>
              </div>
            </div>
          </Typography>
        </div>
      </form>
    )
  }
)
