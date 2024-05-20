'use client'
import { createListDescription } from '@/app/lib/actions/descriptions'
import { TaskDescriptionList } from '@/app/lib/definitions'
import { useFormState } from 'react-dom'
import { FormButton } from '@/app/ui/form-components/buttons'
import { initialState } from '@/app/_components/response-state'
import ResponseDurationMessage from '@/app/_components/response-duration'
import { RefObject } from 'react'

export default function CreateListDescriptionForm ({
  descriptionList,
  redirectTo,
  formActionFun,
  formRef
}: {
  descriptionList: TaskDescriptionList
  redirectTo: string
  formActionFun: (
    listId: string,
    prevState: any,
    formData: FormData
  ) => Promise<any>
  formRef: RefObject<HTMLFormElement>
}) {
  const createListDescriptionWithId = formActionFun.bind(
    null,
    `${descriptionList.id}`
  )
  const [state, formAction] = useFormState(
    createListDescriptionWithId,
    initialState
  )
  // const createListDescriptionWithId = createListDescription.bind(
  //   null,
  //   `${descriptionList.id}`
  // )
  // const [state, formAction] = useFormState(
  //   createListDescriptionWithId,
  //   initialState
  // )

  return (
    <form
      ref={formRef}
      name='createListDescriptionForm'
      id='createListDescriptionForm'
      action={formAction}
      className='card relative flex flex-col gap-y-4 w-full rounded-2xl p-6'
    >
      <div className='flex flex-col gap-y-4 w-full'>
        <div className='flex flex-col w-full gap-2'>
          <label className={`flex flex-col w-full`}>
            <h2 className=''>Description</h2>
          </label>
          <textarea
            name='description'
            id='description'
            className='flex w-full p-2 rounded-2xl'
          ></textarea>
        </div>

        <div className='flex w-full justify-center'>
          <FormButton className='' ariaLabel='Create description' type='submit'>
            Create
          </FormButton>
        </div>
      </div>
      {/* Form action state message floating above card. Requires relative parent. */}
      <ResponseDurationMessage state={state} />
    </form>
  )
}
