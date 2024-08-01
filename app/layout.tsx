import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.scss'
import { Links } from './_components/main-top-navi-links'
import AuthProvider from './context/AuthProvider'
import TokenMonitor from './_components/token-monitor'
import CookieConsent from './_components/cookie-consent'
import DndContextProvider from './context/DndProvider'
import MonochromeThemeProvider from './context/MonochromeThemeProvider'
import { PolychromeThemeProvider } from './context/PolyChromeThemeProvider'
import { fetchPolychromeThemeSync } from './lib/actions/PolychromeThemeUtils'
import { fetchMonochromeThemeSync } from './lib/actions/MonochromeTheme'

const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Brain Body Routine App',
//   description: 'Generated by create next app'
// }

export default async function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const currentPolychromeTheme = await fetchPolychromeThemeSync()
  const currentMonochromeTheme = await fetchMonochromeThemeSync()
  return (
    <AuthProvider>
      <DndContextProvider>
        <html id='htmlElement' lang='en'>
          <body className={`flex flex-col items-center`}>
            <TokenMonitor />
            <main className='flex flex-col w-full max-w-2xl h-screen'>
              <div className='topnavi flex items-center justify-center w-full h-30 top-0 z-10'>
                <PolychromeThemeProvider currentTheme={currentPolychromeTheme}>
                  <MonochromeThemeProvider
                    currentTheme={currentMonochromeTheme}
                  >
                    <Links className='topnavi flex w-full p-3 items-center justify-around' />
                  </MonochromeThemeProvider>
                </PolychromeThemeProvider>
              </div>
              <CookieConsent />
              <div className='flex flex-col w-full max-w-2xl items-center h-full overflow-auto'>
                {children}
              </div>
            </main>
          </body>
        </html>
      </DndContextProvider>
    </AuthProvider>
  )
}
