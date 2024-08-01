import CircleVibesCard from './CircleVibesCard'

export default function CreateTaskDescriptionListCard ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <CircleVibesCard>
      <div className='flex w-full gap-3 items-center'>{children}</div>
    </CircleVibesCard>
  )
}
