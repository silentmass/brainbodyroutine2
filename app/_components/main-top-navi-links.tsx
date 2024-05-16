'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'
import { LogOutForm } from '@/app/ui/login/logout-form'
import { useSession } from 'next-auth/react'
import { CreateButton } from '../ui/form-components/buttons'
import {
  Cog6ToothIcon,
  ArrowRightEndOnRectangleIcon,
  MoonIcon,
  SunIcon,
  UserIcon
} from '@heroicons/react/24/outline'
import { useEffect } from 'react'

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
    <div className={`${className}`}>
      <nav>
        <ul className='topnavi flex gap-5 items-center'>
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
            {status === 'unauthenticated' ? (
              <Link
                className={`link ${clsx({
                  active: pathname && /^\/login/.test(pathname),
                  '': pathname !== '/login'
                })}`}
                href={'/login'}
              >
                <ArrowRightEndOnRectangleIcon className='icon-topnavi w-5' />
              </Link>
            ) : status === 'authenticated' ? (
              <LogOutForm />
            ) : (
              <>{status}</>
            )}
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
              <UserIcon className='icon-topnavi w-5' />
            </Link>
          </li>
        </ul>
      </nav>
      <div className='flex w-full bg-accent-1 h-[1px]'></div>
    </div>
  )
}
