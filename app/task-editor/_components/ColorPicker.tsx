'use client'
import { PolychromeThemeType } from '@/app/context/PolyChromeThemeProvider'
import React, { useEffect, useState } from 'react'
import { HexColorPicker } from 'react-colorful'

export function getPrimaryHsl () {
  return {
    h: Number(
      window
        .getComputedStyle(document.documentElement)
        .getPropertyValue('--primary-h')
    ),
    s: Number(
      window
        .getComputedStyle(document.documentElement)
        .getPropertyValue('--primary-s')
        .replace('%', '')
    ),
    l: Number(
      window
        .getComputedStyle(document.documentElement)
        .getPropertyValue('--primary-l')
        .replace('%', '')
    )
  }
}

export function hslToHex (h: number, s: number, l: number) {
  // Convert HSL to RGB
  s /= 100
  l /= 100

  let c = (1 - Math.abs(2 * l - 1)) * s
  let x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  let m = l - c / 2
  let r = 0,
    g = 0,
    b = 0

  if (0 <= h && h < 60) {
    r = c
    g = x
    b = 0
  } else if (60 <= h && h < 120) {
    r = x
    g = c
    b = 0
  } else if (120 <= h && h < 180) {
    r = 0
    g = c
    b = x
  } else if (180 <= h && h < 240) {
    r = 0
    g = x
    b = c
  } else if (240 <= h && h < 300) {
    r = x
    g = 0
    b = c
  } else if (300 <= h && h < 360) {
    r = c
    g = 0
    b = x
  }

  r = Math.round((r + m) * 255)
  g = Math.round((g + m) * 255)
  b = Math.round((b + m) * 255)

  // Convert RGB to HEX
  let rgbToHex = (r: number, g: number, b: number) => {
    let hex = (n: number) => {
      let hex = n.toString(16)
      return hex.length === 1 ? '0' + hex : hex
    }
    return `#${hex(r)}${hex(g)}${hex(b)}`
  }

  return rgbToHex(r, g, b)
}

export function getHslHex () {
  const hsl = getPrimaryHsl()
  return hslToHex(hsl.h, hsl.s, hsl.l)
}

// Example usage

const ColorPicker = ({
  defaultHexColor = '#000000',
  onChange = null
}: {
  defaultHexColor: string
  onChange?: null | ((newColor: PolychromeThemeType) => void)
}) => {
  const [color, setColor] = useState(defaultHexColor)

  useEffect(() => {
    const hsl = hexToHSL(defaultHexColor)
    document.documentElement.style.setProperty('--primary-h', `${hsl.h}`)
    document.documentElement.style.setProperty('--primary-s', `${hsl.s}%`)
    document.documentElement.style.setProperty('--primary-s', `${hsl.l}%`)
  }, [])

  const handleSetPolychromeTheme = (newTheme: PolychromeThemeType) => {
    if (onChange) {
      return onChange(newTheme)
    } else {
      return null
    }
  }

  const handleChange = (color: string) => {
    setColor(color)
    const hsl = hexToHSL(color)
    const { h, s, l } = hsl
    document.documentElement.style.setProperty('--primary-h', `${hsl.h}`)
    document.documentElement.style.setProperty('--primary-s', `${hsl.s}%`)
    handleSetPolychromeTheme({ h: `${h}`, s: `${s}`, l: `${l}` })
  }

  function hexToHSL (hex: string) {
    let r = 0,
      g = 0,
      b = 0
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16)
      g = parseInt(hex[2] + hex[2], 16)
      b = parseInt(hex[3] + hex[3], 16)
    } else if (hex.length === 7) {
      r = parseInt(hex[1] + hex[2], 16)
      g = parseInt(hex[3] + hex[4], 16)
      b = parseInt(hex[5] + hex[6], 16)
    }
    r /= 255
    g /= 255
    b /= 255
    let max = Math.max(r, g, b),
      min = Math.min(r, g, b)
    let h = 0,
      s = 0,
      l = (max + min) / 2
    if (max !== min) {
      let d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }
      h /= 6
    }
    s = s * 100
    h = h * 360
    return { h, s, l }
  }

  return (
    <div className='resposive react-colorful'>
      <HexColorPicker color={color} onChange={handleChange} />

      <div className='value flex flex-col' style={{ borderLeftColor: color }}>
        <p>{color}</p>
        <p>
          {Object.entries(hexToHSL(color))
            .map(
              ([key, value], idx) =>
                `${key.toUpperCase()}: ${
                  idx < 2
                    ? Math.round(Math.round(100 * value) / 100)
                    : Math.round(100 * value)
                }${idx === 0 ? '' : '%'}`
            )
            .join(' ')}
        </p>
      </div>

      <div className='buttons'>
        <button
          onClick={() => handleChange('#6f8ccf')}
          className='w-5 h-5'
          style={{ backgroundColor: '#6f8ccf' }}
        />
        <button
          onClick={() => handleChange('#000000')}
          className='w-5 h-5'
          style={{ backgroundColor: '#000000' }}
        />
        <button
          onClick={() => handleChange('#c6ad23')}
          className='w-5 h-5'
          style={{ backgroundColor: '#c6ad23' }}
        />
        <button
          onClick={() => handleChange('#556b2f')}
          className='w-5 h-5'
          style={{ backgroundColor: '#556b2f' }}
        />
        <button
          onClick={() => handleChange('#207bd7')}
          className='w-5 h-5'
          style={{ backgroundColor: '#207bd7' }}
        />
      </div>
    </div>
  )
}

export default ColorPicker
