'use server'

import { cookies } from 'next/headers'

export async function handleDataThemeClick (prevState: any, formData: FormData) {
  if (formData.get('isDarkTheme') !== null) {
    const newData = `${
      formData.get('isDarkTheme') === 'true' ? 'true' : 'false'
    }`
    cookies().set('is_dark_theme', newData, { maxAge: 360 })

    return {
      ...prevState,
      isDarkTheme: newData
    }
  }
  return { ...prevState }
}

export async function fetchDataTheme () {
  const cookie = cookies().get('is_dark_theme')

  return cookie
}
