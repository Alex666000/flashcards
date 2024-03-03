import { memo } from 'react'

import { appStatusSelector } from '@/app/model/selectors/app-status-selector'
import { useAppSelector } from '@/shared/lib'
import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon'
import { Slider } from '@/shared/ui/slider'
import { Tab, TabSwitcher } from '@/shared/ui/tab-switcher'
import { TextField } from '@/shared/ui/text-field_'

import s from './filter-controls.module.scss'

type Props = {
  authUserId: string // Идентификатор текущего пользователя.
  onClearFilter?: () => void
  onSearchNameChange: (newString: string) => void // для обновления значения строки поиска.
  onSliderValueChange: (value: number[]) => void // для установки нового значения слайдера
  onTabValueChange: (newTab: string) => void // для выбора вкладки (фильтрация по моим карточкам или всем)
  searchName: string // Строка поиска для фильтрации по названию
  sliderMaxValue?: number
  sliderValue: number[] // Текущее значение слайдера
  tabValue: string // Текущее выбранное значение вкладки
}

export const FilterControls = memo(
  ({
    authUserId,
    onClearFilter,
    onSearchNameChange,
    onSliderValueChange,
    onTabValueChange,
    searchName,
    sliderMaxValue = 65,
    sliderValue = [],
    tabValue,
  }: Props) => {
    // чтобы выбирать Табами надо взять id из me() запроса, а именно authUserId = data.id
    // "My" помечаем с моим id
    const options: Tab[] = [
      { title: 'My cards', value: authUserId },
      { title: 'All cards', value: '' },
    ]

    // для дизейбла кнопки (убрать для РТК не надо..)
    const appStatus = useAppSelector(appStatusSelector)

    // позволяет очистить текстовое поле "ИНПУТА"
    const clearTextField = () => {
      onSearchNameChange('')
    }

    return (
      <div className={s.filter}>
        <TextField
          className={s.textField}
          clearField={clearTextField}
          // вызвали колбек onSearchNameChange что нам передали
          onChange={(e) => onSearchNameChange(e.currentTarget.value)}
          type={'search'}
          value={searchName}
        />
        {/* позволяет выбрать между двумя вкладками: "My cards" (карточки пользователя) */}
        {/* и "All cards" (все карточки). Определяет, какие карточки будут отображены */}
        <TabSwitcher
          // так дизейблить с РТК не обязательно с глобал стеита: можно isLoading прокинуть
          // сверху смотри конспект Валера 3 занятие: "дизейблить блокировать кнопку"
          disabled={appStatus === 'loading'}
          label={'Show decks cards'}
          onChange={onTabValueChange}
          tabsValues={options}
          value={tabValue}
        />
        {/* предоставляет пользователю возможность выбора числа карточек, которые будут отображены */}
        <div className={s.range}>
          <Slider
            label={'Number of cards'}
            max={sliderMaxValue}
            min={0}
            onChange={onSliderValueChange}
            value={sliderValue}
          />
        </div>
        <Button
          className={s.clearButton}
          // дизейбл кнопки
          disabled={appStatus === 'loading'}
          onClick={onClearFilter}
          variant={'secondary'}
        >
          <Icon className={s.icon} name={'trash-bin'} />
          Clear Filter
        </Button>
      </div>
    )
  }
)
