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
  searchName: string // Строка поиска для фильтрации по названию
  setSearchName: (newString: string) => void // для обновления значения строки поиска.
  setSliderValue: (newValue: number[]) => void // для установки нового значения слайдера
  setTabValue: (newTab: string) => void // для выбора вкладки (фильтрация по моим карточкам или всем)
  sliderMaxValue?: number
  sliderValue: number[] //  Текущее значение слайдера
  tabValue: string // Текущее выбранное значение вкладки
}

export const FilterControls = memo(
  ({
    authUserId,
    searchName,
    setSearchName,
    setSliderValue,
    setTabValue,
    sliderMaxValue = 100,
    sliderValue,
    tabValue,
  }: Props) => {
    const tabs: Tab[] = [
      { text: 'My cards', value: authUserId },
      { text: 'All cards', value: '' },
    ]

    // для дизейбла кнопки
    const appStatus = useAppSelector(appStatusSelector)

    // позволяет пользователю очистить все фильтры одним нажатием. При клике на эту кнопку
    // вызывается функция clearFilterHandler, которая обновляет все значения фильтров
    const clearFilterHandler = () => {
      setSliderValue([0, sliderMaxValue])
      setSearchName('')
      setTabValue('')
    }

    // позволяет очистить текстовое поле
    const onClearTextField = () => {
      setSearchName('')
    }

    return (
      <div className={s.filter}>
        <TextField
          className={s.textField}
          clearField={onClearTextField}
          onChange={(e) => setSearchName(e.currentTarget.value)}
          type={'search'}
          value={searchName}
        />
        {/* позволяет выбрать между двумя вкладками: "My cards" (карточки пользователя) */}
        {/* и "All cards" (все карточки). Определяет, какие карточки будут отображены */}
        <TabSwitcher
          disabled={appStatus === 'loading'}
          label={'Show decks cards'}
          onValueChange={setTabValue}
          tabs={tabs}
          value={tabValue}
        />
        {/* предоставляет пользователю возможность выбора числа карточек, которые будут отображены */}
        <Slider
          disabled={appStatus === 'loading'}
          label={'Number of cards'}
          max={sliderMaxValue}
          min={0}
          onChange={setSliderValue}
          value={sliderValue}
        />
        <Button
          className={s.clearButton}
          // дизейбл кнопки
          disabled={appStatus === 'loading'}
          onClick={clearFilterHandler}
          variant={'secondary'}
        >
          <Icon className={s.icon} name={'trash-bin'} />
          Clear Filter
        </Button>
      </div>
    )
  }
)
