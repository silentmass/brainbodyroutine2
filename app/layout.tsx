'use client'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Links } from './_components/main-top-navi-links'
import AuthProvider from './context/AuthProvider'
import { useEffect, useState } from 'react'
import { cookies } from 'next/headers'
import { useFormState } from 'react-dom'
import { fetchDataTheme, handleDataThemeClick } from './lib/actions/data-theme'

const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Brain Body Routine App',
//   description: 'Generated by create next app'
// }

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const [state, formAction] = useFormState(handleDataThemeClick, {
    isDarkTheme: false
  })
  const [isDarkTheme, setIsDarkTheme] = useState(state.isDarkTheme)

  useEffect(() => {
    if (state.isDarkTheme !== null) {
      setIsDarkTheme(`${state.isDarkTheme}` === 'true' ? true : false)
    }
  }, [state])

  useEffect(() => {
    async function fetchTheme () {
      const cookie = await fetchDataTheme()
      if (cookie !== undefined) {
        setIsDarkTheme(`${cookie.value}` === 'true' ? true : false)
      }
    }
    fetchTheme()
  }, [])

  return (
    <html lang='en' data-theme={`${isDarkTheme}` === 'true' ? 'dark' : 'light'}>
      <AuthProvider>
        <body className={`flex flex-col items-center`}>
          <main className='flex flex-col w-full max-w-2xl h-screen '>
            <div className='topnavi flex items-center justify-center w-full h-30 sticky top-0 z-30'>
              <div className='flex w-full'>
                <Links
                  className='topnavi h-full flex flex-col w-full gap-5 pt-3 pb-3 pl-8 pr-8 justify-center items-center'
                  isDarkTheme={isDarkTheme}
                  formAction={formAction}
                />
              </div>
            </div>
            <div className='flex flex-col w-full max-w-2xl items-center h-full overflow-auto'>
              {children}
            </div>
          </main>
        </body>
      </AuthProvider>
    </html>
  )
}
