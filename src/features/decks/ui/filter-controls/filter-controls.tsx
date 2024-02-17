import { memo } from 'react'

import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon'
import { Slider } from '@/shared/ui/slider'
import { Tab, TabSwitcher } from '@/shared/ui/tab-switcher'
import { TextField } from '@/shared/ui/text-field_'

import s from './filter-controls.module.scss'

type Props = {
  authUserId: string
  searchName: string
  setSearchName: (newString: string) => void
  setSliderValue: (newValue: number[]) => void
  setTabValue: (newTab: string) => void
  sliderMaxValue?: number
  sliderValue: number[]
  tabValue: string
}

export const FilterControls = memo(
  ({
    authUserId,
    searchName,
    setSearchName,
    setSliderValue,
    setTabValue,
    sliderMaxValue = 10,
    sliderValue,
    tabValue,
  }: Props) => {
    const tabs: Tab[] = [
      { text: 'My cards', value: authUserId },
      { text: 'All cards', value: '' },
    ]

    const clearFilterHandler = () => {
      setSliderValue([0, sliderMaxValue])
      setSearchName('')
      setTabValue('')
    }

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
        <TabSwitcher
          label={'Show decks cards'}
          onValueChange={setTabValue}
          tabs={tabs}
          value={tabValue}
        />
        <Slider
          label={'Number of cards'}
          max={sliderMaxValue}
          min={0}
          onChange={setSliderValue}
          value={sliderValue}
        />
        <Button className={s.clearButton} onClick={clearFilterHandler} variant={'secondary'}>
          <Icon className={s.icon} name={'trash-bin'} />
          Clear Filter
        </Button>
      </div>
    )
  }
)
