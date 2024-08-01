'use client'
import { createContext, useEffect, useState } from 'react'
import { setPolyChromeThemeCookie } from '../lib/actions/PolychromeTheme'
import { fetchPolychromeThemeSync } from '../lib/actions/PolychromeThemeUtils'

export type PolychromeThemeType = {
  h: string
  s: string
  l: string
} | null

export type PolychromeThemeContexType = {
  theme: PolychromeThemeType
  setTheme: null | ((newTheme: PolychromeThemeType) => void)
}

export const PolychromeThemeContext = createContext<PolychromeThemeContexType>({
  theme: null,
  setTheme: null
})

export const PolychromeThemeProvider = ({
  currentTheme,
  children
}: {
  currentTheme: PolychromeThemeType
  children: React.ReactNode
}) => {
  const [theme, setTheme] = useState<PolychromeThemeType>(currentTheme)

  const handleSetTheme = (newTheme: PolychromeThemeType) => {
    setTheme(newTheme)
    setPolyChromeThemeCookie(newTheme)
  }

  useEffect(() => {
    if (!theme) return
    // Only set H and S
    // L is used for the colorpicker HEX conversion
    document.documentElement.style.setProperty('--primary-h', `${theme.h}`)
    document.documentElement.style.setProperty('--primary-s', `${theme.s}%`)
    document.documentElement.style.setProperty('--primary-l', `${theme.l}%`)
  }, [theme])

  return (
    <PolychromeThemeContext.Provider
      value={{ theme: theme, setTheme: handleSetTheme }}
    >
      {children}
    </PolychromeThemeContext.Provider>
  )
}
