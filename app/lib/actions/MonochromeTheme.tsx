'use server'

import { MonochromeThemeType } from '@/app/contexts/MonochromeThemeProvider'
import { cookies } from 'next/headers'

const themeCookieAge = { maxAge: 60 * 60 * 24 * 360 }

export async function setMonochromeThemeCookie (value: MonochromeThemeType) {
  if (value !== null) {
    cookies().set(
      'is_dark_theme',
      value === 'dark' ? 'true' : 'false',
      themeCookieAge
    )
  } else {
    cookies().delete('is_dark_theme')
  }
}

export async function fetchMonochromeThemeSync (): Promise<MonochromeThemeType> {
  const cookie = cookies().get('is_dark_theme')
  if (cookie === undefined) return null
  return cookie.value === 'true' ? 'dark' : 'light'
}
