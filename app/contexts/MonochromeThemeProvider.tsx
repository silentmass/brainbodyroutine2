'use client'
import { createContext, useEffect, useState } from 'react'
import { setMonochromeThemeCookie } from '../lib/actions/MonochromeTheme'

export type MonochromeThemeType = 'light' | 'dark' | null

export type MonochromeThemeContextType = {
  theme: MonochromeThemeType
  setTheme: null | ((newTheme: MonochromeThemeType) => void)
}

export const MonochromeThemeContext = createContext<MonochromeThemeContextType>(
  {
    theme: null,
    setTheme: null
  }
)

export const MonochromeThemeProvider = ({
  currentTheme,
  children
}: {
  currentTheme: MonochromeThemeType
  children: React.ReactNode
}) => {
  const [theme, setTheme] = useState<MonochromeThemeType>(currentTheme)

  const handleSetTheme = (newTheme: MonochromeThemeType) => {
    setTheme(newTheme)
    setMonochromeThemeCookie(newTheme)
  }

  useEffect(() => {
    const htmlElement = document.getElementById('htmlElement')

    if (!htmlElement) return
    if (theme === 'dark') {
      htmlElement.setAttribute('data-theme', 'dark')
    } else if (theme === 'light') {
      htmlElement.setAttribute('data-theme', 'light')
    } else {
      htmlElement.removeAttribute('data-theme')
    }
  }, [theme])

  return (
    <MonochromeThemeContext.Provider
      value={{ theme: theme, setTheme: handleSetTheme }}
    >
      {children}
    </MonochromeThemeContext.Provider>
  )
}

export default MonochromeThemeProvider
