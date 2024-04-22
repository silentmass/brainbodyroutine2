import { fetchTaskCategoryById, fetchTasks } from '@/app/lib/data'
import { Task } from '@/app/lib/definitions'

export default async function Page ({
  params
}: {
  params: { categoryid: string }
}) {
  const categoryID = params.categoryid
  const category = await fetchTaskCategoryById(categoryID)
  const tasks = (await fetchTasks()).filter(
    (task: Task) => task.task_category_id === parseInt(categoryID)
  )

  return (
    <div>
      Filter tasks by category {category.title}. Found {tasks.length} tasks.
    </div>
  )
}
