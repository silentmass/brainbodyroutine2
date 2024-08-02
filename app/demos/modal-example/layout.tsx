import { Metadata } from 'next'
import Header from './Header'

export const metadata: Metadata = {
  title: 'Modal example'
}

export default function Layout ({
  children,
  modal
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <div className='relative flex w-full justify-center h-full'>
      <div className='relative flex w-full flex-col h-full'>
        <Header />
        {children}
      </div>
      {modal}
    </div>
  )
}
