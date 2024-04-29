import { Task } from '@/app/lib/definitions'
import TaskCardsList from './card-list'

export default function TasksTable ({ tasks }: { tasks: Task[] }) {
  return (
    <div className='flex flex-col gap-y-1 w-full'>
      {tasks ? <TaskCardsList tasks={tasks} /> : <>No tasks</>}
    </div>
  )
}
