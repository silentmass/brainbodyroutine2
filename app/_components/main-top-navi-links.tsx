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

export function Links ({
  isDarkTheme,
  formAction,
  className
}: {
  isDarkTheme: boolean
  formAction: (payload: FormData) => void
  className: string
}) {
  const pathname = usePathname()
  const { update: updateSession, data: session, status } = useSession()

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
        <li>
          <form action={formAction}>
            <input
              type='hidden'
              id='isDarkTheme'
              name='isDarkTheme'
              value={`${isDarkTheme}` === 'true' ? 'false' : 'true'}
            />
            <button type='submit' className='h-full flex'>
              {`${isDarkTheme}` === 'true' ? (
                <SunIcon className='icon-topnavi w-5' />
              ) : (
                <MoonIcon className='icon-topnavi w-5' />
              )}
            </button>
          </form>
        </li>
        <li>
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
