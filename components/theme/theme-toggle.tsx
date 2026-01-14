'use client'

import { useThemeAnimation } from '@space-man/react-theme-animation'

function ThemeToggle() {
  const { theme, toggleTheme, ref } = useThemeAnimation()

  return (
    <button ref={ref} onClick={toggleTheme} className='theme-toggle-btn'>
      {theme === 'light' ? '🌙' : '🌞'}
      {/* {theme === 'light' ? '🌙' : '🌞'} Toggle {theme} Mode */}
    </button>
  )
}
export default ThemeToggle
