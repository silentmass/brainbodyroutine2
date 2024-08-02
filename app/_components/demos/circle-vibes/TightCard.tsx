export default function TightCard ({
  children = undefined
}: {
  children?: React.ReactNode
}) {
  return (
    <div className='relative flex flex-col w-full bg-accent-2 rounded-[16px] p-2 gap-2'>
      {children && children}
    </div>
  )
}
