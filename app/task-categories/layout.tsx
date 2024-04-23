import { title } from 'process'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Task Categories'
}
export default function Layout ({ children }: { children: React.ReactNode }) {
  return <div className='flex flex-col gap-y-1 w-full p-4'>{children}</div>
}
