import TaskEditor from './_components/TaskEditor'
import descriptionsData from './_assets/descriptionLists.json'
import { DEFAULT_TEXTURES } from '../_components/model-palette/definitions'
import DndContextProvider from '../context/DndProvider'

export default function Page () {
  const { task_lists } = descriptionsData
  return (
    <div className='page'>
      <TaskEditor
        lists={task_lists}
        textures={[...DEFAULT_TEXTURES, { name: 'custom', src: null }]}
      />
    </div>
  )
}
