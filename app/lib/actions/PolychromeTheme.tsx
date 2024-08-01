'use server'

import { PolychromeThemeType } from '@/app/context/PolyChromeThemeProvider'
import { cookies } from 'next/headers'
import { getPolychromeCookieToNumbers } from './PolychromeThemeUtils'

const themeCookieAge = { maxAge: 60 * 60 * 24 * 360 }

export async function setPolyChromeThemeCookie (value: PolychromeThemeType) {
  if (value !== null) {
    const newCookie = Object.entries(value)
      .map(([key, v]) => {
        if (key === 'l') {
          const newl = Math.round(Number(v) * 100)
          return `${key.toUpperCase()}-${newl}`
        }
        const newHS = Math.round(Number(v))
        return `${key.toUpperCase()}-${newHS}`
      })
      .join('_')

    cookies().set('polychrome_theme', newCookie, themeCookieAge)
  } else {
    cookies().delete('polychrome_theme')
  }
}
