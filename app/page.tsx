import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Brain Body Routine App'
}

export default function Home () {
  return (
    <div className='flex w-full justify-center'>
      <h2>Brain body routine</h2>
    </div>
  )
}
