import { memo } from 'react'
import { toast } from 'react-toastify'

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
  onSetSearchNameChange: (newString: string) => void // для обновления значения строки поиска.
  onSetSliderValueChange: (newValue: number[]) => void // для установки нового значения слайдера
  onSetTabValueChange: (newTab: string) => void // для выбора вкладки (фильтрация по моим карточкам или всем)
  searchName: string // Строка поиска для фильтрации по названию
  sliderMaxValue?: number
  sliderValue: number[] // Текущее значение слайдера
  tabValue: string // Текущее выбранное значение вкладки
}

export const FilterControls = memo(
  ({
    authUserId,
    onSetSearchNameChange,
    onSetSliderValueChange,
    onSetTabValueChange,
    searchName,
    sliderMaxValue = 65,
    sliderValue,
    tabValue,
  }: Props) => {
    // чтобы выбирать Табами надо взять id из me() запроса, а именно authUserId = data.id
    // My помечаем с моим id
    const options: Tab[] = [
      { title: 'My cards', value: authUserId },
      { title: 'All cards', value: '' },
    ]

    // для дизейбла кнопки
    const appStatus = useAppSelector(appStatusSelector)

    // позволяет пользователю очистить все фильтры одним нажатием. При клике на эту кнопку
    // вызывается функция onClearFiltersClick, которая обновляет все значения фильтров
    const onClearFiltersClick = () => {
      onSetSliderValueChange([0, sliderMaxValue])
      onSetSearchNameChange('')
      onSetTabValueChange('')
      toast.info('Filters are reset', { containerId: 'common' })
    }

    // позволяет очистить текстовое поле
    const clearTextField = () => {
      onSetSearchNameChange('')
    }

    /* Дебаг jsx консолькой */
    // console.log(sliderValue)
    // console.log(sliderMaxValue)

    return (
      <div className={s.filter}>
        <TextField
          className={s.textField}
          clearField={clearTextField}
          // вызвали колбек что нам передали
          onChange={(e) => onSetSearchNameChange(e.currentTarget.value)}
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
          onChange={onSetTabValueChange}
          tabsValues={options}
          value={tabValue}
        />
        {/* предоставляет пользователю возможность выбора числа карточек, которые будут отображены */}
        <Slider
          // так дизейблить с РТК не обязательно с глобал стеита: можно isLoading прокинуть
          // сверху смотри конспект Валера 3 занятие: "дизейблить блокировать кнопку"
          disabled={appStatus === 'loading'}
          label={'Number of cards'}
          max={sliderMaxValue}
          min={0}
          onChange={onSetSliderValueChange}
          value={sliderValue}
        />
        <Button
          className={s.clearButton}
          // дизейбл кнопки
          disabled={appStatus === 'loading'}
          onClick={onClearFiltersClick}
          variant={'secondary'}
        >
          <Icon className={s.icon} name={'trash-bin'} />
          Clear Filter
        </Button>
      </div>
    )
  }
)
