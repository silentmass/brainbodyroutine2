import { PolychromeThemeType } from '@/app/context/PolyChromeThemeProvider'
import { cookies } from 'next/headers'

export const getPolychromeCookieToNumbers = (hslString: string) => {
  const [h, s, l] = hslString.split('_').map(entry => {
    const [k, v] = entry.split('-')
    if (k === 'L') {
      return Number(v) / 100
    }
    return Number(v)
  })
  return { h: h, s: s, l: l }
}

export async function fetchPolychromeThemeSync (): Promise<PolychromeThemeType> {
  const cookie = cookies().get('polychrome_theme')
  if (cookie === undefined) return null
  const hsl = getPolychromeCookieToNumbers(cookie.value)
  return { h: `${hsl.h}`, s: `${hsl.s}`, l: `${hsl.l}` }
}
