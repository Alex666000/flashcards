import { ElementRef, forwardRef } from 'react'

import { Typography } from '@/shared/ui/typography'
import * as SliderRadix from '@radix-ui/react-slider'

import s from './slider.module.scss'

type SliderProps = {
    label?: string // Текстовая метка над ползунком
    max?: number // Максимальное значение в диапазоне
    min?: number // Минимальное значение в диапазоне
    onChange?: (value: number[]) => void // Функция обратного вызова при изменении значения ползунка
    step?: number // Шаг изменения значения ползунка
    value: number[] // Текущее значение ползунка (массив из двух чисел - минимальное и максимальное значение ползунка)
}
/**
 * Компонент Slider - компонент для выбора диапазона значений
 * SliderRadix.Table - обеспечивает основной функционал ползунка.
 * Стили включают трек, диапазон, ползунки и метки.
 * Значения max и min отображаются с помощью компонента Typography и стилизованного контейнера (minMax).
 * При изменении значения ползунка вызывается функция обратного вызова onChange.
 */

export const Slider = forwardRef<ElementRef<typeof SliderRadix.Root>, SliderProps>(
    ({ label, max, min, onChange, step = 1, value, ...restProps }, ref) => {
        return (
            <Typography as={'label'} className={s.label} variant={'body2'}>
                {label}
                <div className={s.body}>
                    <Typography as={'h3'} className={s.value} variant={'body1'}>
                        {value[0]}
                    </Typography>
                    <SliderRadix.Root
                        className={s.line}
                        max={max}
                        min={min}
                        onValueChange={onChange}
                        ref={ref}
                        step={step}
                        value={[value?.[0] ?? 0, value?.[1] ?? max ?? 0]}
                        {...restProps}
                    >
                        <SliderRadix.Track className={s.track}>
                            <SliderRadix.Range className={s.range} />
                        </SliderRadix.Track>
                        <SliderRadix.Thumb aria-label={'Volume'} className={s.thumb}>
                            <div className={s.dot}></div>
                        </SliderRadix.Thumb>
                        <SliderRadix.Thumb aria-label={'Volume'} className={s.thumb}>
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
        )
    }
)
