import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { CheckboxProps } from '../../checkbox/checkbox'
import { Checkbox } from '../../checkbox_'

/**
 * ControlledCheckbox: (обёртка над Checkbox) - сокращает код в компоненте, не надо много кода писать
 * в Checkbox; ControlledCheckbox — обертка над Checkbox,что используем на UI + так как useController
 * из react-hook-form поместили отдельно от родителя, лишний "ререндер" не произоидет + если бы в
 * компоненте LoginForm имели бы useController – рендерилась бы вся формa и каждый чекбокс тоже
 * ререндерился бы при изменении всего лишь одного чекбокса — ТАК ДЕЛАТЬ ВСЕГДА ВО ВСЕХ ПРОЕКТАХ
 * выносить отдельно чекбоксы и инпуты с валидацией...
 * ------------------------------------------------------------------------------------------------
 * 3.06.00 — Для всех элементов делаем "контролед-обёртку" для всех элементов с помощью которых
 * выводим данные формы: кнопка не элемент с помощью которого выводим данные формы
 * ---------------------------------------------------- --------------------------------------------
 * Должны быть:
 * ControlledTextField,  ControlledCheckbox,  ControlledRadio,  ControlledSelect - при этом onBlur
 прокинуть там где он есть..
 */

// FieldValues -тип из react-hook-form
export type Props<T extends FieldValues> = Omit<
  UseControllerProps<T>,
  'defaultValue' | 'disabled' | 'rules'
> &
  Omit<CheckboxProps, 'checked' | 'id' | 'onChange'>

export const ControlledCheckbox = <T extends FieldValues>({
  control,
  disabled,
  name,
  shouldUnregister,
  ...rest
}: Props<T>) => {
  const {
    field: { onChange, value },
  } = useController({
    control,
    name,
    shouldUnregister,
  })

  return <Checkbox checked={value} disabled={disabled} id={name} onChange={onChange} {...rest} />
}

/*
- Omit - убираем дублирующиеся пропсы: чтобы они не дуюлировались в UseControllerProps и CheckboxProps
а были один раз например чтобы disabled дважды не встретился
- 'defaultValue' | 'disabled' | 'rules' -- rules итак не надо, а остальные пропсы также есть в
дефолтном чекбоксе чтобы не повторялись убираем
 */
