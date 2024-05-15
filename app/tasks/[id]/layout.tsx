'use server'

export default async function Layout ({
  children,
  params
}: {
  children: React.ReactNode
  params: { id: string }
}) {
  return (
    <div className='flex flex-col w-full gap-2 pb-2'>
      <div className='flex w-full gap-4 pb-4'>
        <div className='flex flex-col w-full h-fit'>{children}</div>
      </div>
    </div>
  )
}
