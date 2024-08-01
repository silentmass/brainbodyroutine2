'use client'
import clsx from 'clsx'
import { useCallback, useEffect, useState } from 'react'
import ColorPicker, { getHslHex, hslToHex } from './ColorPicker'
import { PolychromeThemeType } from '@/app/context/PolyChromeThemeProvider'

export const ColorPickerButton = ({
  currentHex = null,
  onChange = null
}: {
  currentHex?: string | null
  onChange?: null | ((newTheme: PolychromeThemeType) => void)
}) => {
  const [colorHex, setColorHex] = useState<string | null>(currentHex)
  const [showPalette, setShowPalette] = useState(false)

  const handleOpenPalette = () => {
    setShowPalette(previousState => !previousState)
  }

  const handleColorChange = (newColor: PolychromeThemeType) => {
    if (!newColor) return

    const newHex = hslToHex(
      Number(newColor.h),
      Number(newColor.s),
      Number(newColor.l) * 100
    )

    setColorHex(newHex)

    if (!onChange) return

    onChange(newColor)
  }

  // useEffect(() => {
  //   setColorHex(getHslHex())
  // }, [])

  return (
    <div
      className={`flex flex-col items-center rounded-cool p-2 transition ease-in-out delay-100 duration-200 ${clsx(
        {
          'bg-transparent': !showPalette,
          'bg-content/10': showPalette
        }
      )}`}
    >
      <button
        className='flex w-5 h-5  rounded-cool outline outline-1 outline-offset-1 outline-accent-5 hover:outline-accent-6 active:outline-accent-7 active:outline-offset-2 transition ease-in-out delay-150 hover:scale-110 duration-300'
        style={{ backgroundColor: colorHex ? colorHex : 'transparent' }}
        onClick={(ev: React.FormEvent<HTMLButtonElement>) => {
          ev.preventDefault()
          handleOpenPalette()
        }}
      />
      <div
        style={{ visibility: showPalette ? 'visible' : 'hidden' }}
        className={`transition-all ease-in-out ${clsx({
          'h-0 w-[200px]': !showPalette,
          'mt-5': showPalette
        })}`}
      >
        {colorHex && (
          <ColorPicker
            defaultHexColor={colorHex}
            onChange={handleColorChange}
          />
        )}
      </div>
    </div>
  )
}

export default ColorPickerButton
