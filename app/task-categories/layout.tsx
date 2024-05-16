import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Task Categories'
}

export default function Layout ({ children }: { children: React.ReactNode }) {
  return <div className='flex flex-col w-full'>{children}</div>
}
