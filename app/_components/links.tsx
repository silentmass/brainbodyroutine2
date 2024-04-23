'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'

export function Links ({ className }: { className: string }) {
  const pathname = usePathname()

  return (
    <div className={`${className}`}>
      <nav>
        <ul className='topnavi flex gap-5'>
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
              href={'/tasks'}
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
              Settings
            </Link>
          </li>
        </ul>
      </nav>
      <div className='flex w-full bg-gray-50 h-[2px]'></div>
    </div>
  )
}
