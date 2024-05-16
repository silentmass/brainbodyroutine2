'use server'

export default async function Layout ({
  children,
  params
}: {
  children: React.ReactNode
  params: { id: string }
}) {
  return <div className='flex flex-col w-full h-fit p-6'>{children}</div>
}
