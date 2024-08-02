export default function CircleVibesCard ({
  children = undefined
}: {
  children?: React.ReactNode
}) {
  return (
    <div className='flex flex-col w-full p-3 bg-accent-1 rounded-[16px] gap-3'>
      <div className='flex flex-col w-full gap-3'>{children && children}</div>
    </div>
  )
}
