'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'
import { useSession } from 'next-auth/react'
import {
  Cog6ToothIcon,
  MoonIcon,
  SunIcon,
  UserIcon
} from '@heroicons/react/24/outline'
import { FormEvent, useContext, useMemo } from 'react'
import {
  MonochromeThemeContext,
  MonochromeThemeType
} from '../contexts/MonochromeThemeProvider'
import ColorPickerButton from '../task-editor/_components/ColorPickerButton'
import {
  PolychromeThemeContext,
  PolychromeThemeType
} from '../contexts/PolyChromeThemeProvider'
import { hslToHex } from '../task-editor/_components/ColorPicker'

function switchMonochromeTheme (
  theme: MonochromeThemeType
): MonochromeThemeType {
  if (theme === null) {
    return 'dark'
  } else if (theme === 'light') {
    return 'dark'
  } else if (theme === 'dark') {
    return 'light'
  } else {
    return 'dark'
  }
}

export function Links ({ className = '' }: { className?: string }) {
  const pathname = usePathname()
  const { update: updateSession, data: session, status } = useSession()
  const { theme: monochromeTheme, setTheme: setMonochromeTheme } = useContext(
    MonochromeThemeContext
  )
  const { theme: polychromeTheme, setTheme: setPolychromeTheme } = useContext(
    PolychromeThemeContext
  )

  const handleSetMonochromeTheme = (newTheme: MonochromeThemeType) => {
    if (setMonochromeTheme) {
      return setMonochromeTheme(newTheme)
    } else {
      return null
    }
  }

  const handleSetPolychromeTheme = (newTheme: PolychromeThemeType) => {
    if (setPolychromeTheme) {
      return setPolychromeTheme(newTheme)
    } else {
      return null
    }
  }

  const currentHex = useMemo(
    () =>
      polychromeTheme
        ? hslToHex(
            Number(polychromeTheme.h),
            Number(polychromeTheme.s),
            Number(polychromeTheme.l) * 100
          )
        : '#000000',
    [polychromeTheme]
  )

  return (
    <nav className='flex flex-col w-full justify-center items-center'>
      <ul className={`${className}`}>
        <li>
          <Link
            className={`link ${clsx({
              active: pathname === '/',
              '': pathname !== '/'
            })}`}
            href='/'
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className={`link ${clsx({
              active: pathname && /^\/tasks$|^\/tasks\//.test(pathname),
              '': pathname !== '/tasks'
            })}`}
            href={'/tasks/filter'}
          >
            Tasks
          </Link>
        </li>
        <li>
          <Link
            className={`link ${clsx({
              active:
                pathname &&
                /^\/task-categories$|^\/task-categories\//.test(pathname),
              '': pathname !== '/task-categories'
            })}`}
            href={'/task-categories'}
          >
            <Cog6ToothIcon className='icon-topnavi w-5' />
          </Link>
        </li>
        <li className='z-10'>
          <button
            type='button'
            className='h-full flex'
            onClick={(ev: FormEvent<HTMLButtonElement>) => {
              ev.preventDefault()
              handleSetMonochromeTheme(switchMonochromeTheme(monochromeTheme))
            }}
          >
            {monochromeTheme === 'dark' ? (
              <SunIcon className='icon-topnavi w-5' />
            ) : (
              <MoonIcon className='icon-topnavi w-5' />
            )}
          </button>
        </li>
        <li>
          <div className='relative flex bg-rose-400/0 min-w-7 min-h-7 justify-center'>
            <div className='absolute flex bg-blue-400/0 justify-center left-1/2 -translate-x-1/2 -top-[4px]'>
              <ColorPickerButton
                currentHex={currentHex}
                onChange={handleSetPolychromeTheme}
              />
            </div>
          </div>
        </li>
        <li className='z-10'>
          <Link
            className={`link ${clsx({
              active: pathname && /^\/login/.test(pathname),
              '': pathname !== '/login'
            })}`}
            href={'/login'}
          >
            {session ? (
              session.full_name !== '' ? (
                session.full_name
                  ?.split(' ')
                  .map(words => words[0])
                  .join('')
              ) : (
                'Log out'
              )
            ) : (
              <UserIcon className='icon-topnavi w-5' />
            )}
          </Link>
        </li>
      </ul>
      <div className='flex w-full bg-accent-2 h-[1px]'></div>
    </nav>
  )
}
