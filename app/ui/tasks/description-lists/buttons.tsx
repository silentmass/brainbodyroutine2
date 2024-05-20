'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { initialState } from '@/app/_components/response-state'
import {
  TaskDescriptionList,
  TaskDescriptionListBase
} from '@/app/lib/definitions'
import { DeleteButton } from '@/app/ui/form-components/buttons'

export const DeleteTaskDescriptionList = ({
  list,
  formActionFun
}: {
  list: TaskDescriptionList | TaskDescriptionListBase
  formActionFun: (
    id: string,
    prevState: any,
    formData: FormData
  ) => Promise<any>
}) => {
  if ('id' in list) {
    const { pending } = useFormStatus()
    const deleteTaskDescriptionListWithId = formActionFun.bind(
      null,
      `${list.id}`
    )
    const [state, formAction] = useFormState(
      deleteTaskDescriptionListWithId,
      initialState
    )
    return (
      <form
        name='deleteTaskDescriptionListForm'
        id='deleteTaskDescriptionListForm'
        action={formAction}
      >
        <DeleteButton ariaDisabled={pending} classNameIcon='' />
      </form>
    )
  } else {
    return (
      <form
        name='deleteTaskDescriptionListForm'
        id='deleteTaskDescriptionListForm'
      >
        <DeleteButton ariaDisabled={true} classNameIcon=''></DeleteButton>
      </form>
    )
  }
}
