import CreateTaskForm from '@/app/_components/task-form/DescriptionForm'
import TaskBulletTable from '@/app/_components/task-form/TaskBulletTable'
import { Modal } from '@/app/ui/modal'

export default function Page () {
  return (
    <div className='absolute flex w-full h-fit justify-center top-0 bg-bkg/90'>
      <Modal>
        <TaskBulletTable />
      </Modal>
    </div>
  )
}
