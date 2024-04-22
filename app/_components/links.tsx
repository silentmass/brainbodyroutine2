'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'

export function Links ({ className }: { className: string }) {
  const pathname = usePathname()

  return (
    <div className={`${className}`}>
      <nav>
        <ul className='topnavi flex'>
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
        </ul>
      </nav>
      <div className='flex w-full bg-gray-50 h-[2px]'></div>
    </div>
  )
}
