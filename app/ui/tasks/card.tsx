'use client'
import { Task, TaskBase } from '@/app/lib/definitions'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { FormEvent, useRef } from 'react'
import { initialState } from '@/app/_components/response-state'
import { useFormState } from 'react-dom'
import clsx from 'clsx'
import Card from '../Card'
import CardBottomRow from '@/app/_components/demos/circle-vibes/CardBottomRow'
import CardTopRow from '@/app/_components/demos/circle-vibes/CardTopRow'
import CardTopRowCheckButtonContainer from '@/app/_components/demos/circle-vibes/CardTopRowCheckButtonContainer'
import CardTopRowEditButtonContainer from '@/app/_components/demos/circle-vibes/CardTopRowEditButtonContainer'
import CardTopRowOpenButtonContainer from '@/app/_components/demos/circle-vibes/CardTopRowOpenButtonContainer'
import EditButtonsContainer from '@/app/_components/demos/circle-vibes/EditButtonsContainer'
import LargeCheckButton from '@/app/_components/demos/circle-vibes/LargeCheckButton'
import LargeOpenButton from '@/app/_components/demos/circle-vibes/LargeOpenButton'
import BasicButton from '@/app/_components/demos/circle-vibes/BasicButton'
import BasicTextButton from '@/app/_components/demos/circle-vibes/BasicTextButton'
import { FormWrapper } from './edit-form'

const TaskCard = ({
  task,
  showOpenTaskLink = true,
  showEditTaskButtons = true,
  handleViewModeClick,
  formActionDeleteTaskFun,
  formActionUpdateTaskFun,
  formActionDuplicateTaskFun,
  isTokenValid = false
}: {
  task: Task | TaskBase
  showOpenTaskLink?: boolean
  showEditTaskButtons?: boolean
  handleViewModeClick: (event: FormEvent<HTMLButtonElement>) => void
  formActionDeleteTaskFun: (
    id: string,
    prevState: any,
    formData: FormData
  ) => Promise<any>
  formActionUpdateTaskFun: (prevState: any, formData: FormData) => Promise<any>
  formActionDuplicateTaskFun: (
    prevState: any,
    formData: FormData
  ) => Promise<any>
  isTokenValid?: boolean
}) => {
  const formRef = useRef<HTMLFormElement | null>(null)
  const deleteFormRef = useRef<HTMLFormElement | null>(null)
  const isOptimistic = !('id' in task) || task.id === undefined

  const [stateDuplicateTask, formActionDuplicateTask] = useFormState(
    formActionDuplicateTaskFun,
    initialState
  )

  const deleteTaskWithId = formActionDeleteTaskFun.bind(
    null,
    isOptimistic ? '' : `${task.id}`
  )

  const [deleteState, formActionDelete] = useFormState(
    deleteTaskWithId,
    initialState
  )

  const handleCheckButtonClick = (ev: React.FormEvent<HTMLButtonElement>) => {
    ev.preventDefault()
    if (!formRef.current) return
    formRef.current.requestSubmit()
  }
  const handleCheckButtonClickDelete = (
    ev: React.FormEvent<HTMLButtonElement>
  ) => {
    ev.preventDefault()
    if (!deleteFormRef.current) return
    deleteFormRef.current.requestSubmit()
  }

  return (
    <Card>
      <CardTopRow>
        <CardTopRowOpenButtonContainer>
          <LargeOpenButton
            type={undefined}
            ariaLabel={'View task'}
            onClick={isOptimistic ? () => null : handleViewModeClick}
            isDisabled={isOptimistic}
            defaultValue={isOptimistic ? '' : task.id}
            isVisible={showOpenTaskLink}
          />
        </CardTopRowOpenButtonContainer>
        {task.user_id !== null && (
          <CardTopRowCheckButtonContainer>
            <FormWrapper
              formRef={formRef}
              name='editTaskForm'
              id='editTaskForm'
              formActionFun={formActionUpdateTaskFun}
              initialState={initialState}
            >
              {/* Task marked */}
              <input
                type='hidden'
                name='taskIsActive'
                id='taskIsActive'
                value={`${!task.is_active}`}
              />
              <LargeCheckButton
                id='isActiveButton'
                name='isActiveButton'
                checked={!task.is_active}
                aria-label={task.is_active ? 'Check task' : 'Uncheck task'}
                isDisabled={isOptimistic}
                onClick={handleCheckButtonClick}
              />
              {/* Task title */}
              <input
                type='hidden'
                name='taskTitle'
                id='taskTitle'
                defaultValue={task.title}
              />
              {/* Task category */}
              <input
                type='hidden'
                name='taskCategoryId'
                id='taskCategoryId'
                defaultValue={task.task_category_id}
              />
              <input
                type='hidden'
                name='sortOrder'
                id='sortOrder'
                defaultValue={`${task.sort_order}`}
              />
            </FormWrapper>
          </CardTopRowCheckButtonContainer>
        )}
        {task.user_id !== null && showEditTaskButtons && (
          <CardTopRowEditButtonContainer>
            <EditButtonsContainer>
              <BasicButton
                href={isOptimistic ? '' : `/tasks/${task.id}/edit`}
                ariaLabel={'Edit task'}
                isDisabled={isOptimistic}
                isVisible={task.user_id !== null && showOpenTaskLink}
              >
                <PencilIcon
                  className={`icon w-5 ${clsx({
                    'pending-icon': isOptimistic
                  })}`}
                />
              </BasicButton>
              <form ref={deleteFormRef} action={formActionDelete}>
                <BasicButton
                  ariaLabel='Delete task'
                  type='delete'
                  onClick={handleCheckButtonClickDelete}
                >
                  <TrashIcon className='icon w-5 h-5' />
                </BasicButton>
              </form>
            </EditButtonsContainer>
          </CardTopRowEditButtonContainer>
        )}
        {/* 
        Duplicate task button
        */}
        {task.user_id === null && (
          <div className='absolute flex top-0 right-0'>
            <FormWrapper
              name='duplicateTaskForm'
              id='duplicateTaskForm'
              formActionFun={formActionDuplicateTaskFun}
              initialState={initialState}
            >
              {/* Task marked */}
              <input
                type='hidden'
                name='taskIsActive'
                id='taskIsActive'
                value={`${task.is_active}`}
              />
              {/* Task title */}
              <input
                type='hidden'
                name='taskTitle'
                id='taskTitle'
                defaultValue={task.title}
              />
              {/* Task category */}
              <input
                type='hidden'
                name='taskCategoryId'
                id='taskCategoryId'
                defaultValue={task.task_category_id}
              />
              <input
                type='hidden'
                name='sortOrder'
                id='sortOrder'
                defaultValue={`${task.sort_order}`}
              />
              <BasicTextButton
                ariaLabel='Duplicate task'
                type='submit'
                isDisabled={!isTokenValid}
              >
                Duplicate
              </BasicTextButton>
            </FormWrapper>
          </div>
        )}
      </CardTopRow>
      <CardBottomRow isPaddingRight={true}>
        <p>{task.title}</p>
      </CardBottomRow>
      {/* Other controls */}
    </Card>
  )
}

export default TaskCard
