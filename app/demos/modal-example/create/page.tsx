import TaskBulletTable from '@/app/_components/task-form/TaskBulletTable'

export default function Page () {
  return (
    <div className='absolute flex-col-w-full h-fit justify-center left-0 top-0 bg-bkg/90 '>
      <div className='flex-col-w-full bg-accent-2/30 rounded-lg backdrop-blur-sm mt-5 mb-5 h-fit'>
        <div className='flex-col-w-full p-6'>
          <TaskBulletTable />
        </div>
      </div>
    </div>
  )
}
