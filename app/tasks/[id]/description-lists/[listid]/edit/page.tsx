import { fetchUserTaskById } from '@/app/lib/data'
import { Task } from '@/app/lib/definitions'
import EditDescriptionListView from '@/app/ui/tasks/description-lists/edit-list-view'
import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Edit list descriptions'
}

export default async function Page ({
  params
}: {
  params: { id: string; listid: string }
}) {
  const taskId = params.id !== '' ? parseInt(params.id) : null
  const listId = params.listid !== '' ? parseInt(params.listid) : null

  try {
    const [task]: [Task | { message: string; errors: any }] = await Promise.all(
      [fetchUserTaskById(`${taskId}`)]
    )

    const isTask =
      task !== null && typeof task === 'object' && !('message' in task)

    if (!isTask || !task.description_lists) {
      notFound()
    }

    const descriptionList = task.description_lists.find(
      list => list.id === listId
    )

    if (!descriptionList) {
      throw new Error('No list')
    }

    return (
      <EditDescriptionListView
        descriptionList={descriptionList}
        cancelRedirect={`/tasks/${taskId}/edit`}
      />
    )
  } catch (error) {
    console.error('Fetch error', error)
    redirect('/tasks/filter')
  }
}
