import { useEffect, useState } from 'react'

import { Moon } from '@/shared/assets/icons/sutarday-icons/MoonIcon'
import { Sun } from '@/shared/assets/icons/sutarday-icons/SunIcon'
import * as RadixToggle from '@radix-ui/react-toggle'

import s from './theme-toogle.module.scss'

export const ThemeToggle = () => {
  // Проверяем, есть ли сохраненная тема в локальном хранилище
  const savedTheme = localStorage.getItem('theme')
  // Используем значение из локального хранилища или по умолчанию
  const [isSun, setIsSun] = useState(savedTheme === 'dark')

  useEffect(() => {
    // Сохраняем текущую тему в локальном хранилище
    localStorage.setItem('theme', isSun ? 'dark' : 'light')
    // Устанавливаем класс dark-mode в body в зависимости от выбранной темы
    document.body.classList.toggle('dark-mode', isSun)
  }, [isSun])

  function handleThemeChanged(isDark: boolean) {
    // Устанавливаем состояние темы
    setIsSun(isDark)
  }

  return (
    <>
      <RadixToggle.Root
        aria-label={'Toggle italic'}
        className={s.Toggle}
        onPressedChange={handleThemeChanged}
      >
        {isSun ? <Sun /> : <Moon />}
      </RadixToggle.Root>
    </>
  )
}
