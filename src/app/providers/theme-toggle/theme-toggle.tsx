import { useEffect, useState } from 'react'

import { Moon } from '@/shared/assets/icons/sutarday-icons/MoonIcon'
import { Sun } from '@/shared/assets/icons/sutarday-icons/SunIcon'
import * as RadixToggle from '@radix-ui/react-toggle'

import s from './theme-toggle.module.scss'

export const ThemeToggle = () => {
  const savedTheme = localStorage.getItem('theme')
  const [isSun, setIsSun] = useState(savedTheme === 'dark')

  useEffect(() => {
    localStorage.setItem('theme', isSun ? 'dark' : 'light')
    document.body.classList.toggle('dark-mode', isSun)
  }, [isSun])

  function handleThemeChanged(isDark: boolean) {
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
